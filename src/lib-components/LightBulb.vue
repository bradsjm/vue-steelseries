<template>
  <canvas ref="view"></canvas>
</template>

<script>
import { LightBulb } from "steelseries";

import { toBoolean, toNumber } from "./util";

export default {
  name: "LightBulb",
  props: {
    alpha: {
      default: undefined,
      required: false,
      type: [Number, String],
    },
    glowColor: {
      default: undefined,
      required: false,
      type: String,
    },
    size: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => toNumber(value) > 0,
    },
    height: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => toNumber(value) > 0,
    },
    width: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => toNumber(value) > 0,
    },
    value: {
      required: true,
      type: [Boolean, String],
    },
  },
  data() {
    return {
      gauge: null,
    };
  },
  methods: {
    draw: function() {
      const id = (this.$refs["view"].id = this.$refs["view"]._uid);
      this.gauge = new LightBulb(id, {
        glowColor: this.glowColor,
        height: this.height ? toNumber(this.height) : toNumber(this.size),
        width: this.width ? toNumber(this.width) : toNumber(this.size),
      });
      this.value && this.gauge.setOn(toBoolean(this.value));
      this.alpha && this.gauge.setAlpha(toNumber(this.alpha));
    },
  },
  mounted() {
    this.draw();
  },
  watch: {
    alpha(newValue) {
      this.gauge && this.gauge.setAlpha(toNumber(newValue));
    },
    glowColor(newValue) {
      this.gauge && this.gauge.setGlowColor(newValue);
    },
    width() {
      this.draw();
    },
    height() {
      this.draw();
    },
    size() {
      this.draw();
    },
    value(newValue) {
      this.gauge && this.gauge.setOn(toBoolean(newValue));
    },
  },
};
</script>
