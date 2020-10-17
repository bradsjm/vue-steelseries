<template>
  <canvas ref="view"></canvas>
</template>

<script>
import { Led, LedColor } from "steelseries";

function toBoolean(value) {
  if (undefined === value) return value;
  switch (
    value
      .toString()
      .toLowerCase()
      .trim()
  ) {
    case "true":
    case "yes":
    case "1":
      return true;
    case "false":
    case "no":
    case "0":
    case null:
      return false;
    default:
      return Boolean(value);
  }
}

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
      validator: (value) => !Number.isNaN(value),
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
        size: undefined === this.size ? undefined : Number(this.size),
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
      this.gauge && this.gauge.setLedColor(newValue);
    },
    value(newValue) {
      this.gauge && this.gauge.setLedOnOff(toBoolean(newValue));
    },
  },
};
</script>
