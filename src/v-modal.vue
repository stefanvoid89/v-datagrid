<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">Filter : {{ column.label }}</div>

          <div class="modal-body">
            <div style="display:flex">
              <div>
                <select v-model="operation">
                  <option v-for="operation in operationsByType" :key="operation.name" :value="operation.name">{{ operation.name }}</option>
                </select>
              </div>
              <div>
                <datepicker v-if="column.type == 'date'" v-model="filterValue"></datepicker>
                <input v-else type="text" v-model="filterValue" />
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="modal-default-button" @click="$emit('filter-data', { column, filterValue, operation: selectedOperation.operation })">
              OK
            </button>
            <button class="modal-default-button" @click="$emit('close')">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Datepicker from "vuejs-datepicker";
export default {
  components: {
    Datepicker
  },
  props: { column: Object, operations: Array },
  data: function() {
    return {
      filterValue: "",
      operation: ""
    };
  },
  created: function() {
    let operation = this.operations.find((o) => o.operation === this.column.operation);
    if (operation) this.operation = operation.name;
    else {
      let type = this.column.type || "string";
      if (type == "date" || type == "number") this.operation = "equals";
      else this.operation = "like";
    }

    this.filterValue = this.column.filterValue;
  },
  computed: {
    selectedOperation() {
      return this.operations.find((operation) => operation.name === this.operation);
    },

    operationsByType() {
      let diff;

      let type = this.column.type || "string";

      if (type == "date" || type == "number")
        diff = [
          { name: "like", operation: "like" },
          { name: "does not like", operation: "!like" }
        ];
      else
        diff = [
          { name: "greater than", operation: ">" },
          { name: "greater than or equal to", operation: ">=" },
          { name: "less than", operation: "<" },
          { name: "less than or equal to", operation: "<=" }
        ];

      return this.operations.filter((op) => diff.every((o) => o.operation !== op.operation));
    }
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
