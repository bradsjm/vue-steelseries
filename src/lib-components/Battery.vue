<template>
  <canvas ref="view"></canvas>
</template>

<script>
import { Battery } from "steelseries";

import { toBoolean, toNumber } from "./util";

export default {
  name: "Battery",
  props: {
    size: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => toNumber(value) > 0,
    },
    value: {
      required: true,
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
      this.gauge = new Battery(this.$refs["view"], {
        size: toNumber(this.size),
        value: toNumber(this.value),
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
    value(newValue) {
      this.gauge && this.gauge.setValue(toNumber(newValue));
    },
  },
};
</script>
