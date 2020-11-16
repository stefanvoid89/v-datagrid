<template>
  <div>
    <div class="v-datagrid">
      <v-datagrid-header :propColumns="columns" @sort-by="setSortBy" @remove-filter="removeFilter" @show-modal="showModalFilter" :icons="icons" :config="config" @add-row="addRow"> </v-datagrid-header>
      <v-datagrid-body :propColumns="columns" :propItems="items" :config="config" @edit-row="editRow" @delete-row="deleteRow" @cancel-row="cancelRow" @store-row="storeRow"></v-datagrid-body>
    </div>
    <v-modal v-if="showModal" @close="closeFilterModal" :column="filterColumn" @filter-data="filterItems" :operations="operations"></v-modal>
  </div>
</template>

<script>
import globalMixin from "./globalMixin";
import VDatagridHeader from "./v-datagrid-header";
import VDatagridBody from "./v-datagrid-body";
import VModal from "./v-modal";
import { nanoid } from "nanoid";
export default {
  components: { VDatagridHeader, VDatagridBody, VModal },
  name: "v-datagrid",
  mixins: [globalMixin],
  props: {
    propItems: {
      type: Array,
      default: function() {
        return [];
      }
    },
    propColumns: {
      type: Array,
      default: function() {
        return [];
      }
    },
    propConfig: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },

  watch: {
    propItems: function() {
      this.items = this.parseItems(this.propItems);
    },
    propColumns: function() {
      this.columns = this.parseColumns(this.propColumns);
    },
    filterColumns: function() {
      this.items = this.filterBy2(this.filterColumns, this.items).sortBy(this.sortBy);
    },
    sortBy: function() {
      this.items = this.filterBy2(this.filterColumns, this.items).sortBy(this.sortBy);
    }
  },

  created: function() {
    this.config = { ...this.config, ...this.propConfig };
    this.columns = this.parseColumns(this.propColumns);
    this.items = this.parseItems(this.propItems);
    this.parseDatesInItems();
  },

  data() {
    return {
      items: [],
      columns: [],
      config: {
        editable: false,
        delitable: false,
        appendable: false
      },

      sortBy: { column: null, order: 0 },
      sortDirections: [0, 1, -1], // 1 for asc, -1 for desc, 0 for
      defaultColumnConfig: {
        orderable: false,
        filterable: false,
        order: null,
        editable: true
      },
      utilsColumn: {
        width: "10rem",
        header: false,
        items: {}
      },
      showModal: false,
      filterColumn: null,
      filterColumns: []
    };
  },

  methods: {
    addRow() {
      let item = {};
      this.columns.forEach((column) => {
        let value = "";
        if (column.type == "number") value = 0;
        if (column.type == "date") value = new Date();
        item[column.name] = value;
      });

      item = { ...{ uuid: nanoid(), visible: true }, ...item, ...this.defaultColumnConfig, edit: true };

      this.items.unshift(item);
    },
    editRow(uuid) {
      let itemIndex = this.items.map((c) => c.uuid).indexOf(uuid);

      this.$set(this.items[itemIndex], "edit", true);
    },
    deleteRow() {},
    cancelRow(uuid) {
      let itemIndex = this.items.map((c) => c.uuid).indexOf(uuid);
      this.$delete(this.items[itemIndex], "edit");
    },
    storeRow({ uuid, item }) {
      // console.log(uuid, item.last_name, item.first_name);
      let itemIndex = this.items.map((c) => c.uuid).indexOf(uuid);
      // console.log(itemIndex);

      this.$set(this.items, itemIndex, item);
      {
        uuid, item;
      }
    },
    closeFilterModal() {
      this.filterColumn = {};
      this.showModal = false;
    },
    removeFilter() {
      this.filterColumns = [];
      this.columns.forEach((col, index) => this.$delete(this.columns[index], "filtered"));
    },

    filterBy(filterColumns, items) {
      if (!filterColumns.length) return items;
      else {
        let self = this;
        return items.filter((item) => {
          return filterColumns.every((filterColumn) => {
            let itemValue = item[filterColumn.name];
            let filterValue = filterColumn.filterValue;
            let type = filterColumn.type;
            if (type == "date") {
              itemValue = Date.parse(itemValue);
            } else if (type !== "number") {
              itemValue = itemValue.trim().toLowerCase();
              filterValue = filterValue.trim().toLowerCase();
            }
            return self.compare(itemValue, filterColumn.operation, filterColumn.filterValue);
          });
        });
      }
    },

    filterBy2(filterColumns, items) {
      // if (!filterColumns.length) return items;
      // else {
      let self = this;
      return items.map((item) => {
        item.visible = filterColumns.every((filterColumn) => {
          let itemValue = item[filterColumn.name];
          let filterValue = filterColumn.filterValue;
          let type = filterColumn.type;
          if (type == "date") {
            itemValue = Date.parse(itemValue);
          } else if (type !== "number") {
            itemValue = itemValue.trim().toLowerCase();
            filterValue = filterValue.trim().toLowerCase();
          }
          return self.compare(itemValue, filterColumn.operation, filterColumn.filterValue);
        });
        return item;
      });
      // }
    },

    filterItems({ column, filterValue, operation }) {
      let columnIndex = this.columns.map((c) => c.name).indexOf(column.name);
      let filterColumnIndex = this.filterColumns.map((c) => c.name).indexOf(column.name);
      this.$delete(this.columns[columnIndex], "filtered");
      this.$delete(this.filterColumns, filterColumnIndex);
      if (filterValue) {
        this.filterColumns.push({ name: column.name, type: column.type, filterValue, operation });
        this.$set(this.columns[columnIndex], "filtered", { filterValue, operation });
      }

      this.closeFilterModal();
    },
    showModalFilter(column) {
      let filterColumn = this.filterColumns.find((c) => c.name === column.name);
      if (!filterColumn) filterColumn = { filterValue: "", name: column.name, operation: "", type: column.type || "string" };
      this.filterColumn = filterColumn;
      this.showModal = true;
    },
    parseColumns(columns) {
      columns = columns.map((column) => ({ ...{ label: column.name }, ...{ uuid: nanoid() }, ...this.defaultColumnConfig, ...column }));
      return columns;
    },
    parseItems(items) {
      items = items.map((item) => ({ ...{ uuid: nanoid(), visible: true }, ...item, ...this.defaultColumnConfig }));
      return items;
    },
    parseDatesInItems() {
      this.columns.filter((col) => col.type == "date").forEach((col) => this.items.forEach((item, index) => (this.items[index][col.name] = new Date(this.items[index][col.name]))));
      // this.columns.forEach((col) => console.log(col.type));
      //  let c = this.columns.filter((col) => col.type == "date");
      // console.log(c);
    },
    setSortBy(column) {
      let { column: currentColumnName, order: currentOrder } = this.sortBy;
      let currentColumnIndex = this.columns.map((c) => c.name).indexOf(currentColumnName);

      if (currentColumnName && currentColumnName !== column.name) {
        this.$set(this.columns[currentColumnIndex], "order", 0);
        currentOrder = 0;
      }

      let currentDirectionIndex = this.sortDirections.indexOf(currentOrder);
      let nextDirectionIndex = (currentDirectionIndex + 1) % this.sortDirections.length;
      let sortOrder = this.sortDirections[nextDirectionIndex];

      let columnIndex = this.columns.map((c) => c.name).indexOf(column.name);

      let sortColumn = column.name;

      this.$set(this.columns[columnIndex], "order", sortOrder);
      this.sortBy = { column: sortColumn, order: sortOrder };
    }
  }
};
</script>

<style scoped>
.v-datagrid {
  display: flex;
  flex-direction: column;
  border-color: rgba(0, 0, 0, 0.08);
  border-width: 1px;
  border-style: solid;
  color: #656565;
  background-color: #ffffff;
  height: 440px;
}
</style>
