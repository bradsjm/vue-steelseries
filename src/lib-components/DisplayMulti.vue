<template>
  <canvas ref="view"></canvas>
</template>

<script>
import { DisplayMulti, LcdColor } from "steelseries";

import { toBoolean, toNumber } from "./util";

export default {
  name: "DisplayMulti",
  props: {
    altValue: {
      required: false,
      type: [Number, String],
    },
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
    detail: {
      default: undefined,
      required: false,
      type: String,
    },
    detailVisible: {
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
    linkAltValue: {
      default: undefined,
      required: false,
      type: [Boolean, String],
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
      this.gauge = new DisplayMulti(this.$refs["view"], {
        alwaysScroll: toBoolean(this.alwaysScroll),
        autoScroll: toBoolean(this.autoScroll),
        detailString: this.detail,
        detailStringVisible: toBoolean(this.detailVisible),
        digitalFont: this.digitalFont,
        headerString: this.header,
        headerStringVisible: toBoolean(this.headerVisible),
        height: this.height ? toNumber(this.height) : toNumber(this.size) / 2,
        lcdColor: LcdColor[this.lcdColor],
        lcdDecimals: toNumber(this.lcdDecimals),
        linkAltValue: toBoolean(this.linkAltValue),
        section: this.section,
        unitString: this.unit,
        unitStringVisible: toBoolean(this.unitVisible),
        value: this.value,
        altValue: this.altValue,
        valuesNumeric: toBoolean(this.valuesNumeric),
        width: this.width ? toNumber(this.width) : toNumber(this.size),
      });
    },
  },
  mounted() {
    this.draw();
  },
  watch: {
    altValue(newValue) {
      this.gauge && this.gauge.setAltValue(newValue);
    },
    height() {
      this.draw();
    },
    lcdColor(newValue) {
      this.gauge && this.gauge.setLcdColor(LcdColor[newValue]);
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
