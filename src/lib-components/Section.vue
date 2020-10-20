<script>
import { Section } from "steelseries";

import { toNumber } from "./util";

/**
 * Gauge Section
 * @displayName Gauge Section
 */
export default {
  name: "Section",
  inject: ["setSection"],
  props: {
    /**
     * Instance Id
     */
    id: {
      required: false,
    },
    /**
     * Section Start Value
     */
    start: {
      required: true,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * Section Ends Value
     */
    end: {
      required: true,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * Section color, e.g. 'rgba(195, 92, 211, 0.4)'
     */
    color: {
      required: true,
      type: String,
    },
  },
  methods: {
    update() {
      this.setSection(
        this.id ?? this._uid,
        Section(toNumber(this.start), toNumber(this.end), this.color)
      );
    },
  },
  created() {
    this.update();
  },
  beforeDestroy() {
    this.setSection(this.id ?? this._uid);
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
