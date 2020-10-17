<template>
  <canvas ref="view"></canvas>
</template>

<script>
import { Led, LedColor } from "steelseries";

import { toBoolean, toNumber } from "./util";

export default {
  name: "Led",
  props: {
    blink: {
      default: undefined,
      required: false,
      type: [String, Boolean],
    },
    ledColor: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in LedColor,
    },
    size: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => toNumber(value) > 0,
    },
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
        ledColor: LedColor[this.ledColor],
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
