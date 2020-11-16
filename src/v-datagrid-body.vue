<template>
  <div class="v-datagrid-body">
    <div class="v-datagrid-body-wrapper">
      <div class="v-datagrid-body-table">
        <div class="v-datagrid-body-colgroup">
          <div class="v-datagrid-body-col" v-for="column in propColumns" :key="column.uuid" :style="column.width ? { width: `${column.width}` } : ''"></div>
        </div>

        <v-datagrid-row v-for="item in items" :key="item.uuid" :propItem="item" :propColumns="propColumns" :config="config" @edit-row="edit" @delete-row="remove" @cancel-row="cancel" @store-row="store"> </v-datagrid-row>
      </div>
    </div>
  </div>
</template>

<script>
import VDatagridRow from "./v-datagrid-row";
export default {
  components: { VDatagridRow },
  name: "v-datagrid-body",
  props: ["propItems", "propColumns", "config"],
  data: function() {
    return {
      items: []
    };
  },
  created: function() {
    this.items = this.propItems;
  },
  methods: {
    store({ uuid, item }) {
      this.$emit("store-row", { uuid, item });
    },
    cancel(uuid) {
      this.$emit("cancel-row", uuid);
    },
    edit(uuid) {
      this.$emit("edit-row", uuid);
    },
    remove(uuid) {
      this.$emit("remove-row", uuid);
    }
  },
  watch: {
    propItems: function() {
      this.items = this.propItems;
    }
  }
};
</script>

<style>
.v-datagrid-body {
  display: flex;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  overflow: hidden;
}

.v-datagrid-body-wrapper {
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  overflow: auto;
  overflow-x: auto;
  overflow-y: scroll;
}

.v-datagrid-body-table {
  display: table;
  table-layout: fixed;
  margin: 0;
  width: 100%;
  max-width: none;
  border-width: 0;
  border-color: inherit;
  border-collapse: separate;
  border-spacing: 0;
  empty-cells: show;
  outline: 0;
}
.v-datagrid-body-colgroup {
  display: table-column-group;
}
.v-datagrid-body-col {
  display: table-column;
}
</style>
