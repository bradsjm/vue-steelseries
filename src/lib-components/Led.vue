<template>
  <canvas ref="view"></canvas>
</template>

<script>
import { Led, LedColor } from "steelseries";

import { toBoolean, toNumber, toUpper } from "../lib/util";

/**
 * Simple LED with on, off and blinking capabilities
 * @displayName LED
 */
export default {
  name: "Led",
  props: {
    /**
     * Enables blinking
     */
    blink: {
      default: undefined,
      required: false,
      type: [String, Boolean],
    },
    /**
     * Set the LED color
     * @values RED_LED, GREEN_LED, BLUE_LED, ORANGE_LED, YELLOW_LED, CYAN_LED, MAGENTA_LED
     */
    ledColor: {
      default: "RED_LED",
      required: false,
      type: String,
      validator: (value) => value.toUpperCase() in LedColor,
    },
    /**
     * Set the size in pixels of the canvas (height and width)
     */
    size: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => toNumber(value) > 0,
    },
    /**
     * Set the LED on (true) or off (false)
     */
    value: {
      required: true,
      type: [String, Boolean],
    },
  },
  data() {
    return {
      gauge: null,
    };
  },
  methods: {
    draw: function() {
      this.gauge = new Led(this.$refs["view"], {
        size: toNumber(this.size),
        ledColor: LedColor[toUpper(this.ledColor)],
      });
      this.gauge.setLedOnOff(toBoolean(this.value));
      this.gauge.blink(toBoolean(this.blink));
    },
  },
  mounted() {
    this.draw();
  },
  watch: {
    blink(newValue) {
      this.gauge && this.gauge.blink(toBoolean(newValue));
    },
    size() {
      this.gauge.setLedOnOff(false);
      this.gauge.blink(false);
      this.draw();
    },
    ledColor(newValue) {
      this.gauge && this.gauge.setLedColor(LedColor[newValue]);
    },
    value(newValue) {
      this.gauge && this.gauge.setLedOnOff(toBoolean(newValue));
    },
  },
};
</script>
