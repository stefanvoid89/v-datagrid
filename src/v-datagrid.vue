<template>
  <div>
    <div class="v-datagrid">
      <v-datagrid-header :propColumns="columns" @sort-by="setSortBy" @show-modal="showModalFilter" :icons="icons"> </v-datagrid-header>
      <v-datagrid-body :propColumns="columns" :propItems="computedItems"></v-datagrid-body>
    </div>
    <v-modal v-if="showModal" @close="showModal = false" :column="filterColumn" @filter-data="filterItems"></v-modal>
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
    }
  },

  watch: {
    propItems: function() {
      this.items = this.parseItems(this.propItems);
    },
    propColumns: function() {
      this.columns = this.parseColumns(this.propColumns);
    }
  },

  created: function() {},

  data() {
    return {
      items: this.parseItems(this.propItems),
      columns: this.parseColumns(this.propColumns),
      sortBy: { column: null, order: 0 },
      sortDirections: [0, 1, -1], // 1 for asc, -1 for desc, 0 for
      defaultColumnConfig: {
        orderable: false,
        filterable: false,
        order: null
      },
      showModal: false,
      filterColumn: null,
      filterColumns: []
    };
  },
  computed: {
    computedItems: function() {
      return this.items.filterBy(this.filterColumns).sortBy(this.sortBy);
    }
  },

  methods: {
    filterItems({ column, filterValue, operation }) {
      // console.log(column, filterValue, operation);
      this.filterColumns.push({ uuid: column.uuid, filterValue, operation });
      this.showModal = false;
    },
    showModalFilter(column) {
      this.filterColumn = column;
      this.showModal = true;
    },
    parseColumns(columns) {
      return columns.map((column) => ({ ...{ label: column.name }, ...{ uuid: nanoid() }, ...this.defaultColumnConfig, ...column }));
    },
    parseItems(items) {
      return items.map((item) => ({ ...{ uuid: nanoid() }, ...item }));
    },
    setSortBy(column) {
      let { column: currentColumnName, order: currentOrder } = this.sortBy;
      let currentColumnIndex = this.columns.map((c) => c.name).indexOf(currentColumnName);

      // console.log(currentColumnIndex);

      // console.log(currentColumnName, column.name);

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
