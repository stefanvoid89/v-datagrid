<template>
  <div class="v-datagrid-row">
    <div class="v-datagrid-cell" v-for="column in propColumns" :key="column.uuid">{{ item[column.name] }}</div>
  </div>
</template>

<script>
export default {
  props: ["propItem", "propColumns"],

  data: function() {
    return {
      item: {}
    };
  },
  created: function() {
    this.item = this.propItem;
  },
  watch: {
    propItem: function() {
      this.item = this.propItem;
    }
  },
  methods: {
    cellProp(column) {
      return { type: column.type ?? "string", value: this.item[column.name] };
    }
  }
};
</script>

<style scoped>
.v-datagrid-row {
  display: table-row;
}
.v-datagrid-cell {
  display: table-cell;
  word-wrap: break-word;
}
</style>
