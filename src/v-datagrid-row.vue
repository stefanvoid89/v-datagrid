<template>
  <div class="v-datagrid-row">
    <div class="v-datagrid-cell" v-for="column in propColumns" :key="column.uuid">
      <div v-if="item.edit && column.editable">
        <component v-bind:is="inputComponent(column.type)" v-model="editItem[column.name]"> </component>
      </div>
      <div v-else>
        {{ showValue(item[column.name], column.type) }}
      </div>
    </div>

    <div v-if="hasUtils" class="v-datagrid-cell">
      <div v-if="!item.edit" style="display: flex;justify-content:space-around"><button @click="edit(item.uuid)">edit</button><button @click="remove(item.uuid)">delete</button></div>
      <div v-else style="display: flex;justify-content:space-around"><button @click="store(item.uuid)">store</button><button @click="cancel(item.uuid)">cancel</button></div>
    </div>
  </div>
</template>

<script>
import VueNumeric from "vue-numeric";
import VTextInput from "./v-text-input";
import VDatepicker from "./v-datepicker";
import globalMixin from "./globalMixin";

export default {
  components: {
    VueNumeric,
    VTextInput,
    VDatepicker
  },
  mixins: [globalMixin],
  props: ["propItem", "propColumns", "config"],

  data: function() {
    return {
      item: {},
      editItem: {}
    };
  },
  computed: {
    hasUtils() {
      return Object.values(this.config).some((c) => c === true);
    }
  },
  created: function() {
    this.item = { ...this.propItem };
  },
  watch: {
    propItem: function() {
      this.item = { ...this.propItem };
      this.editItem = { ...this.propItem };
    },
    item: function() {
      this.editItem = { ...this.item };
    }
  },
  methods: {
    showValue(value, type) {
      let val = value;
      if (type === "number") val = value;
      if (type === "date") val = this.formatDate(value);
      return val;
    },
    inputComponent(type) {
      let component = "v-text-input";
      if (type === "number") component = "vue-numeric";
      if (type === "date") component = "v-datepicker";
      return component;
    },
    cellProp(column) {
      return { type: column.type ?? "string", value: this.item[column.name] };
    },
    store(uuid) {
      this.$delete(this.editItem, "edit");
      this.$emit("store-row", { uuid, item: this.editItem });
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
