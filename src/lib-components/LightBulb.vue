<template>
  <canvas ref="view"></canvas>
</template>

<script>
import { LightBulb } from "steelseries";

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
      validator: (value) => !Number.isNaN(value),
    },
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
      this.gauge && this.gauge.setAlpha(newValue);
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
