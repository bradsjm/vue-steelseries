<template>
  <canvas ref="view"></canvas>
</template>

<script>
import { TrafficLight } from "steelseries";

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

function toNumber(value) {
  if (undefined === value) return value;
  return Number(value);
}

export default {
  name: "TrafficLight",
  props: {
    height: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    width: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    red: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    amber: {
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
        height: toNumber(this.height),
        width: toNumber(this.width),
      });
      this.red && this.gauge.setRedOn(toBoolean(this.red));
      this.amber && this.gauge.setAmberOn(toBoolean(this.amber));
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
      this.gauge.setRedOn(newValue);
    },
    amber(newValue) {
      this.gauge.setAmberOn(newValue);
    },
    green(newValue) {
      this.gauge.setGreenOn(newValue);
    },
  },
};
</script>
