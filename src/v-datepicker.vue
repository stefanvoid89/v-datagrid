<script>
import Datepicker from "vuejs-datepicker";

export default {
  extends: Datepicker,
  props: {
    format: {
      type: String,
      default: "dd.MM.yyyy"
    }
  }
};
</script>
