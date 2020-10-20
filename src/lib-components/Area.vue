<script>
import { Section } from "steelseries";

import { toNumber } from "./util";

/**
 * Gauge Area
 * @displayName Gauge Area
 */
export default {
  name: "Area",
  inject: ["setArea"],
  props: {
    /**
     * Instance Id
     */
    id: {
      required: false,
    },
    /**
     * Area Start Value
     */
    start: {
      required: true,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * Area Ends Value
     */
    end: {
      required: true,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * Area color, e.g. 'rgba(195, 92, 211, 0.4)'
     */
    color: {
      required: true,
      type: String,
    },
  },
  methods: {
    update() {
      this.setArea(
        this.id ?? this._uid,
        Section(toNumber(this.start), toNumber(this.end), this.color)
      );
    },
  },
  created() {
    this.update();
  },
  beforeDestroy() {
    this.setArea(this.id ?? this._uid);
  },
  render(h) {
    return null;
  },
  watch: {
    start() {
      this.update();
    },
    end() {
      this.update();
    },
    color() {
      this.update();
    },
  },
};
</script>
