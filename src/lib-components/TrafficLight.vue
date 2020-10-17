<template>
  <canvas ref="view"></canvas>
</template>

<script>
import { TrafficLight } from "steelseries";

import { toBoolean, toNumber } from "./util";

export default {
  name: "TrafficLight",
  props: {
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
    size: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => toNumber(value) > 0,
    },
    red: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    yellow: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    green: {
      default: undefined,
      required: false,
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
      this.gauge = new TrafficLight(this.$refs["view"], {
        height: this.height ? toNumber(this.height) : toNumber(this.size),
        width: this.width ? toNumber(this.width) : toNumber(this.size),
      });
      this.red && this.gauge.setRedOn(toBoolean(this.red));
      this.yellow && this.gauge.setYellowOn(toBoolean(this.amber));
      this.green && this.gauge.setGreenOn(toBoolean(this.green));
    },
  },
  mounted() {
    this.draw();
  },
  watch: {
    height() {
      this.draw();
    },
    width() {
      this.draw();
    },
    red(newValue) {
      this.gauge.setRedOn(toBoolean(newValue));
    },
    yellow(newValue) {
      this.gauge.setYellowOn(toBoolean(newValue));
    },
    green(newValue) {
      this.gauge.setGreenOn(toBoolean(newValue));
    },
  },
};
</script>
