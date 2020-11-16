<template>
  <div class="v-datagrid-header" :style="{ paddingRight: `${scrollbarWidth}px` }">
    <div class="v-datagrid-header-wrapper">
      <div>
        <div>
          <button @click="$emit('remove-filter')">ukloni filtere</button>
        </div>
      </div>
      <div class="v-datagrid-header-table">
        <div class="v-datagrid-header-colgroup">
          <div class="v-datagrid-header-col" v-for="column in columns" :key="column.uuid" :style="column.width ? { width: `${column.width}` } : ''"></div>
        </div>
        <div class="v-datagrid-header-row">
          <div class="v-datagrid-header-cell" v-for="column in columns" :key="column.uuid">
            <div style="display: flex;justify-content:space-between">
              <div>{{ column.label }}</div>
              <div style="display: flex">
                <div style="width:1rem">
                  <div v-if="column.orderable" class="box" @click="sortBy(column)" @mouseover="orderOutline = column.uuid" @mouseleave="orderOutline = -1">
                    <div v-if="column.order"><div v-html="getOrderArrow(column.order)"></div></div>
                    <div v-else v-show="orderOutline === column.uuid" v-html="icons.arrow_up_down"></div>
                  </div>
                </div>
                <div style="width:1rem">
                  <div v-if="column.filterable" class="box" @click="showModal(column)" @mouseover="filterOutline = column.uuid" @mouseleave="filterOutline = -1">
                    <div v-if="column.filtered" v-html="icons.filter"></div>
                    <div v-else v-show="filterOutline === column.uuid" v-html="icons.filter_outline"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="config.editable || config.delitable || config.appendable" class="v-datagrid-header-cell">
            <div style="display: flex;justify-content:space-between">
              <div v-if="config.appendable"><button @click="addRow">Dodaj novi red</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import globalMixin from "./globalMixin";
export default {
  mixins: [globalMixin],
  props: ["propColumns", "config"],
  data: function() {
    return {
      columns: [],
      scrollbarWidth: 0,
      filterOutline: -1,
      orderOutline: -1
    };
  },
  created: function() {
    this.columns = this.propColumns;
    this.scrollbarWidth = this.getScrollBarWidth();
  },
  watch: {
    propColumns: function() {
      this.columns = this.propColumns;
    }
  },
  methods: {
    addRow() {
      this.$emit("add-row");
    },
    sortBy(column) {
      this.$emit("sort-by", column);
    },
    showModal(column) {
      this.$emit("show-modal", column);
    },
    getOrderArrow(order) {
      switch (order) {
        case 0:
          return "&nbsp;";
          break;
        case 1:
          return this.icons.arrow_up;
          break;
        case -1:
          return this.icons.arrow_down;
      }
    }
  }
};
</script>

<style>
.v-datagrid-header {
  display: flex;
  flex: 0 0 auto;
  color: #656565;
  background-color: #f6f6f6;
  border-color: rgba(0, 0, 0, 0.08);
}
.v-datagrid-header-wrapper {
  flex: 1 1 auto;
  display: inline-block;
  width: 100%;
  border-width: 0 1px 0 0;
  border-style: solid;
  border-color: inherit;
  position: relative;
  overflow: hidden;
}
.v-datagrid-header-table {
  display: table;
  margin: 0;
  margin-bottom: 0px;
  width: 100%;
  max-width: none;
  border-width: 0;
  border-color: inherit;
  border-collapse: separate;
  border-spacing: 0;
  empty-cells: show;
  outline: 0;
  table-layout: fixed;
}

.v-datagrid-header-colgroup {
  display: table-column-group;
}
.v-datagrid-header-col {
  display: table-column;
}

.v-datagrid-header-row {
  display: table-row;
  border: 1px solid black;
}
.v-datagrid-header-cell {
  display: table-cell;
  border: 1px solid black;
}

.box {
  height: 1rem;
  width: 1rem;
  /* border: 1px solid black; */
}

.red {
  background-color: red;
}

.green {
  background-color: green;
}

.blue {
  background-color: blue;
}
</style>
