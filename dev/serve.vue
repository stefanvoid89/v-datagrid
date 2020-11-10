<script>
import Vue from "vue";
import VDatagrid from "@/v-datagrid.vue";

import initialItems from "./data.json";

import Datepicker from "vuejs-datepicker";

export default Vue.extend({
  name: "ServeDev",
  components: {
    VDatagrid,
    Datepicker
  },
  data: function() {
    return {
      date: "2020-02-03",
      items: initialItems,
      counter: 1,
      columns: [{ name: "id", label: "Id", orderable: true, filterable: true, width: 50 }, { name: "first_name", label: "First name", orderable: true, filterable: true }, { name: "last_name" }, { name: "email" }, { name: "dob", type: "date", orderable: true, filterable: true }]
    };
  },
  methods: {
    addColumn() {
      this.columns.push(this.defaultColumn);
      this.counter++;
    }
  },
  computed: {
    defaultColumn: function() {
      return { name: `attr_${this.counter}` };
    }
  }
});
</script>

<template>
  <div id="app" style="display: flex; justify-content: center; margin-top: 20px">
    <div style="">
      <v-datagrid :propItems="items" :propColumns="columns" />
    </div>
  </div>
</template>
