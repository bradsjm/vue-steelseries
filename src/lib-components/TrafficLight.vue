<template>
  <canvas ref="view"></canvas>
</template>

<script>
import { TrafficLight } from "steelseries";

import { toBoolean, toNumber } from "../lib/util";

/**
 * Traffic Light display allowing individual control of red, yellow and green LEDs
 * @displayName Traffic Light
 */
export default {
  name: "TrafficLight",
  props: {
    /**
     * Height of canvas in pixels
     */
    height: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => toNumber(value) > 0,
    },
    /**
     * Width of canvas in pixels
     */
    width: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => toNumber(value) > 0,
    },
    /**
     * Size of canvas in pixels (if height and width are not set)
     */
    size: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => toNumber(value) > 0,
    },
    /**
     * Red LED enable
     */
    red: {
      default: false,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Yellow LED enable
     */
    yellow: {
      default: false,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Green LED enable
     */
    green: {
      default: false,
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
