<template>
  <canvas ref="view"></canvas>
</template>

<script>
import { DisplayMulti, LcdColor } from "steelseries";

import { toBoolean, toNumber, toUpper } from "../lib/util";

/**
 * LCD Multi Line Display
 * @displayName Display Multi
 */
export default {
  name: "DisplayMulti",
  props: {
    /**
     * Alt Value
     */
    altValue: {
      default: 0,
      required: false,
      type: [Number, String],
    },
    /**
     * Always scroll display regardless of length
     */
    alwaysScroll: {
      default: false,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Auto scroll display if length is wider than display
     */
    autoScroll: {
      default: false,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Detail text
     */
    detail: {
      default: undefined,
      required: false,
      type: String,
    },
    /**
     * Enable detail display
     */
    detailVisible: {
      default: false,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Use digital font for display
     */
    digitalFont: {
      default: false,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Header text
     */
    header: {
      default: undefined,
      required: false,
      type: String,
    },
    /**
     * Show header text
     */
    headerVisible: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Set height of canvas in pixels
     */
    height: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => toNumber(value) > 0,
    },
    /**
     * Sets the color of the LCD background
     * @values BEIGE, BLUE, ORANGE, RED, YELLOW, WHITE, GRAY, BLACK, GREEN, BLUE2, BLUE_BLACK,
     * BLUE_DARKBLUE, BLUE_GRAY, STANDARD, STANDARD_GREEN, BLUE_BLUE, RED_DARKRED, DARKBLUE,
     * LILA, BLACKRED, DARKGREEN, AMBER, LIGHTBLUE, SECTIONS
     */
    lcdColor: {
      default: "STANDARD",
      required: false,
      type: String,
      validator: (value) => value.toUpperCase() in LcdColor,
    },
    /**
     * Set the number of decimal places displayed on the LCD
     */
    lcdDecimals: {
      default: 2,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * Link alt value to value
     */
    linkAltValue: {
      default: true,
      required: false,
      type: [Boolean, String],
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
     * Sets the unit values
     */
    unit: {
      default: undefined,
      required: false,
      type: String,
    },
    /**
     * Show the unit text
     */
    unitVisible: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Value to display on LCD
     */
    value: {
      required: true,
      type: [Number, String],
    },
    /**
     * Set to 'true' if the value is numeric
     */
    valuesNumeric: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Set width of canvas in pixels
     */
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
