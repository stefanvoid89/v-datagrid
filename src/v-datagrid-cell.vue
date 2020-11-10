<template>
  <div class="v-datagrid-cell">{{ propCell.value }}</div>
</template>

<script>
export default {
  props: ["propCell"]
};
</script>

<style scoped>
.v-datagrid-cell {
  display: table-cell;
  overflow: hidden;
}
</style>
