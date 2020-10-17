<template>
  <canvas ref="view"></canvas>
</template>

<script>
import { DisplaySingle, LcdColor } from "steelseries";

import { toBoolean, toNumber } from "./util";

export default {
  name: "DisplaySingle",
  props: {
    alwaysScroll: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    autoScroll: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    digitalFont: {
      default: undefined,
      required: false,
      type: String,
    },
    header: {
      default: undefined,
      required: false,
      type: String,
    },
    headerVisible: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    height: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => toNumber(value) > 0,
    },
    lcdColor: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in LcdColor,
    },
    lcdDecimals: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    section: {
      default: undefined,
      required: false,
      type: Object,
    },
    size: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => toNumber(value) > 0,
    },
    unit: {
      default: undefined,
      required: false,
      type: String,
    },
    unitVisible: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    value: {
      required: true,
      type: [Number, String],
    },
    valuesNumeric: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    width: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => toNumber(value) > 0,
    },
  },
  data() {
    return {
      gauge: null,
    };
  },
  methods: {
    draw: function() {
      this.gauge = new DisplaySingle(this.$refs["view"], {
        alwaysScroll: toBoolean(this.alwaysScroll),
        autoScroll: toBoolean(this.autoScroll),
        digitalFont: this.digitalFont,
        headerString: this.header,
        headerStringVisible: toBoolean(this.headerVisible),
        height: this.height ? toNumber(this.height) : toNumber(this.size) / 2,
        lcdColor: LcdColor[this.lcdColor],
        lcdDecimals: toNumber(this.lcdDecimals),
        section: this.section,
        unitString: this.unit,
        unitStringVisible: toBoolean(this.unitVisible),
        value: this.value,
        valuesNumeric: toBoolean(this.valuesNumeric),
        width: this.width ? toNumber(this.width) : toNumber(this.size),
      });
      this.gauge.setScrolling(toBoolean(this.scrolling));
    },
  },
  mounted() {
    this.draw();
  },
  watch: {
    height() {
      this.draw();
    },
    lcdColor(newValue) {
      this.gauge && this.gauge.setLcdColor(LcdColor[newValue]);
    },
    scrolling(newValue) {
      this.gauge && this.gauge.setScrolling(toBoolean(newValue));
    },
    section(newValue) {
      this.gauge && this.gauge.setSection(newValue);
    },
    size() {
      this.draw();
    },
    value(newValue) {
      this.gauge && this.gauge.setValue(newValue);
    },
    width() {
      this.draw();
    },
  },
};
</script>
