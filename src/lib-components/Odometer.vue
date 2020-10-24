<template>
  <canvas ref="view"></canvas>
</template>

<script>
import { Odometer } from "steelseries";

import { toNumber } from "../lib/util";

/**
 * Odometer display with animation and optional 'wobble' for digits
 */
export default {
  name: "Odometer",
  props: {
    /**
     * HTML Background Color of Gauge
     */
    backgroundColor: {
      default: "#F0F0F0",
      required: false,
      type: String,
    },
    /**
     * Set number of whole digits to display
     */
    digits: {
      default: 6,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * Set number of fraction digits to display
     */
    decimal: {
      default: 1,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * HTML foreground color
     */
    foregroundColor: {
      default: "#F01010",
      required: false,
      type: String,
    },
    /**
     * Set the font to use
     */
    font: {
      default: "sans-serif",
      required: false,
      type: String,
    },
    /**
     * Set the canvas height in pixels
     */
    height: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => toNumber(value) > 0,
    },
    /**
     * Set the size of the canvas in pixels if height and width not used
     */
    size: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => toNumber(value) > 0,
    },
    /**
     * Set the value to display on the odometer
     */
    value: {
      required: true,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * HTML color of the value background
     */
    valueBackColor: {
      default: "#050505",
      required: false,
      type: String,
    },
    /**
     * HTML color of the value foreground
     */
    valueForeColor: {
      default: "#F8F8F8",
      required: false,
      type: String,
    },
    /**
     * Set the wobble factor of the digits, set to zero for perfect alignment
     */
    wobbleFactor: {
      default: 0.07,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
  },
  data() {
    return {
      gauge: null,
    };
  },
  methods: {
    draw: function() {
      this.gauge = new Odometer(this.$refs["view"], {
        height: this.height ? toNumber(this.height) : toNumber(this.size),
        digits: toNumber(this.digits),
        decimals: toNumber(this.decimals),
        decimalBackColor: this.backgroundColor,
        decimalForeColor: this.foregroundColor,
        font: this.font,
        value: toNumber(this.value),
        valueBackColor: this.valueBackColor,
        valueForeColor: this.valueForeColor,
        wobbleFactor: toNumber(this.wobbleFactor),
      });
    },
  },
  mounted() {
    this.draw();
  },
  watch: {
    size() {
      this.draw();
    },
    odometerValue(newValue, oldValue) {
      if (!this.gauge) return;
      if (newValue > oldValue) {
        this.gauge.setValueAnimated(toNumber(newValue));
      } else {
        this.gauge.setValue(toNumber(newValue));
      }
  },
};
</script>
