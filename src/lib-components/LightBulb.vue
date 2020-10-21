<template>
  <canvas ref="view"></canvas>
</template>

<script>
import { LightBulb } from "steelseries";

import { toBoolean, toNumber } from "../lib/util";

/**
 * Simple LightBulb display with adjustable color and on/off state
 * @displayName LightBulb
 */
export default {
  name: "LightBulb",
  props: {
    /**
     * Set the canvas globalAlpha (transparency) of the image
     * @values 0.0 to 1.0
     */
    alpha: {
      default: 1,
      required: false,
      type: [Number, String],
      validator: (value) => value >= 0 && value <= 1,
    },
    /**
     * Set the HTML "glow" color eminating from the bulb
     */
    glowColor: {
      default: "#ffff00",
      required: false,
      type: String,
    },
    /**
     * Set the size in pixels of the canvas (height and width)
     * Only used if height and width are not set
     */
    size: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => toNumber(value) > 0,
    },
    /**
     * Set the height in pixels of the canvas
     */
    height: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => toNumber(value) > 0,
    },
    /**
     * Set the width in pixels of the canvas
     */
    width: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => toNumber(value) > 0,
    },
    /**
     * Bulb state, true for 'on' and false for 'off'
     */
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
