<template>
  <canvas ref="view"></canvas>
</template>

<script>
import { Battery } from "steelseries";

export default {
  name: "Battery",
  props: {
    size: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
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
        size: undefined === this.size ? undefined : Number(this.size),
        value: undefined === this.value ? undefined : Number(this.value),
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
      this.gauge && this.gauge.setValue(newValue);
    },
  },
};
</script>
