<template>
  <canvas ref="view"></canvas>
</template>

<script>
import {
  LinearBargraph,
  BackgroundColor,
  LcdColor,
  ColorDef,
  LedColor,
  FrameDesign,
  LabelNumberFormat,
} from "steelseries";

import { toBoolean, toNumber, toUpper } from "./util";

/**
 * Linear bargraph gauge (often used as rain, temperature etc.)
 * @displayName Linear Bargraph
 */
export default {
  name: "LinearBargraph",
  props: {
    /**
     * HTML audio url used to embed optional alarm sound
     */
    alarmSound: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Background Color of Gauge
     * @values DARK_GRAY, SATIN_GRAY, LIGHT_GRAY, WHITE, BLACK, BEIGE, BROWN, RED, GREEN, BLUE,
     * TURNED, ANTHRACITE, MUD, PUNCHED_SHEET, CARBON, STAINLESS, BRUSHED_METAL, BRUSHED_STAINLESS
     */
    backgroundColor: {
      default: "DARK_GRAY",
      required: false,
      type: String,
      validator: (value) => value.toUpperCase() in BackgroundColor,
    },
    /**
     * Display the gauge background
     */
    backgroundVisible: {
      default: true,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Uses LCD font the LCD display
     */
    digitalFont: {
      default: false,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Display the foreground style on the dial
     */
    foregroundVisible: {
      default: true,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Select the frame design style used on the dial
     * @values BLACK_METAL, METAL, SHINY_METAL, BRASS, STEEL, CHROME, GOLD, ANTHRACITE,
     *         TILTED_GRAY, TILTED_BLACK, GLOSSY_METAL
     */
    frameDesign: {
      default: "METAL",
      required: false,
      type: String,
      validator: (value) => value.toUpperCase() in FrameDesign,
    },
    /**
     * Display the frame (with the frameDesign selected) around the dial
     */
    frameVisible: {
      default: true,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Sets the maximum tween time for animation, reduce this to speed up the movement
     */
    fullScaleDeflectionTime: {
      default: 2.5,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * Set the HTML canvas height
     */
    height: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * Set the label number format for the scale.
     * STANDARD shows integer,
     * FRACTIONAL shows 2 fixed decimal places,
     * SCIENTIFIC shows to 2 significant digits
     * @values STANDARD, FRACTIONAL, SCIENTIFIC
     */
    labelNumberFormat: {
      default: "STANDARD",
      required: false,
      type: String,
      validator: (value) => value.toUpperCase() in LabelNumberFormat,
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
     * Display the LCD displays (latest and average) in the dial
     * @values Boolean (defaults to true)
     */
    lcdVisible: {
      default: true,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Set the LED color used to indicate values are over the set threshold
     */
    ledColor: {
      default: "RED",
      required: false,
      type: String,
      validator: (value) => value.toUpperCase() in LedColor,
    },
    /**
     * Enable the display of the LED over threshold indicator
     */
    ledVisible: {
      default: true,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Enable the display of the maximum measured value
     */
    maxMeasuredValueVisible: {
      default: false,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Set the maximum value for the scale (Defaults to the minimum value plus 100)
     */
    maxValue: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * Enable the display of the minimum measured value
     */
    minMeasuredValueVisible: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Set the minimum value for the scale
     */
    minValue: {
      default: 0,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * Enable playing the alarm sound (if defined) when theshold is exceeded
     */
    playAlarm: {
      default: undefined,
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
     * Set the threshold marker (defaults to half way between min and max values)
     */
    threshold: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * Set true if threashold should be exceeded when value rises above it (false means below)
     */
    thresholdRising: {
      default: true,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Set to enable the display of the threshold marker on the scale
     */
    thresholdVisible: {
      default: true,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Sets the gauge title
     */
    title: {
      default: undefined,
      required: false,
      type: String,
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
     * Set the current level (Required)
     */
    value: {
      required: true,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * Set the color of the value display
     */
    valueColor: {
      default: "RED",
      required: false,
      type: String,
      validator: (value) => value.toUpperCase() in ColorDef,
    },
    /**
     * Set the height of the canvas
     */
    width: {
      default: undefined,
      required: false,
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
      this.gauge = new LinearBargraph(this.$refs["view"], {
        alarmSound: this.alarmSound,
        backgroundColor: BackgroundColor[toUpper(this.backgroundColor)],
        backgroundVisible: toBoolean(this.backgroundVisible),
        digitalFont: this.digitalFont,
        foregroundVisible: toBoolean(this.foregroundVisible),
        frameDesign: FrameDesign[toUpper(this.frameDesign)],
        frameVisible: toBoolean(this.frameVisible),
        fullScaleDeflectionTime: toNumber(this.fullScaleDeflectionTime),
        height: this.height ? toNumber(this.height) : toNumber(this.size),
        labelNumberFormat: LabelNumberFormat[toUpper(this.labelNumberFormat)],
        lcdColor: LcdColor[toUpper(this.lcdColor)],
        lcdDecimals: toNumber(this.lcdDecimals),
        lcdVisible: toBoolean(this.lcdVisible),
        ledColor: LedColor[toUpper(this.ledColor)],
        ledVisible: toBoolean(this.ledVisible),
        maxMeasuredValueVisible: toBoolean(this.maxMeasuredValueVisible),
        maxValue: toNumber(this.maxValue),
        minMeasuredValueVisible: toBoolean(this.minMeasuredValueVisible),
        minValue: toNumber(this.minValue),
        playAlarm: toBoolean(this.playAlarm),
        threshold: toNumber(this.threshold),
        thresholdRising: toBoolean(this.thresholdRising),
        thresholdVisible: toBoolean(this.thresholdVisible),
        titleString: this.title,
        unitString: this.unit,
        valueColor: ColorDef[toUpper(this.valueColor)],
        width: this.width ? toNumber(this.width) : toNumber(this.size),
      });
      this.value && this.gauge.setValue(toNumber(this.value));
    },
  },
  mounted() {
    this.draw();
  },
  watch: {
    backgroundColor(newValue) {
      this.gauge &&
        this.gauge.setBackgroundColor(BackgroundColor[toUpper(newValue)]);
    },
    frameDesign(newValue) {
      this.gauge && this.gauge.setFrameDesign(FrameDesign[toUpper(newValue)]);
    },
    labelNumberFormat(newValue) {
      this.gauge &&
        this.gauge.setLabelNumberFormat(LabelNumberFormat[toUpper(newValue)]);
    },
    lcdColor(newValue) {
      this.gauge && this.gauge.setLcdColor(LcdColor[toUpper(newValue)]);
    },
    lcdDecimals(newValue) {
      this.gauge && this.gauge.setLcdDecimals(toNumber(newValue));
    },
    ledColor(newValue) {
      this.gauge && this.gauge.setLedColor(LedColor[toUpper(newValue)]);
    },
    maxMeasuredValue(newValue) {
      this.gauge && this.gauge.setMaxMeasuredValue(toNumber(newValue));
    },
    maxMeasuredValueVisible(newValue) {
      this.gauge && this.gauge.setMaxMeasuredValueVisible(toBoolean(newValue));
    },
    maxValue(newValue) {
      this.gauge && this.gauge.setMaxValue(toNumber(newValue));
    },
    minMeasuredValue(newValue) {
      this.gauge && this.gauge.setMinMeasuredValue(toNumber(newValue));
    },
    minMeasuredValueVisible(newValue) {
      this.gauge && this.gauge.setMinMeasuredValueVisible(toBoolean(newValue));
    },
    minValue(newValue) {
      this.gauge && this.gauge.setMinValue(toNumber(newValue));
    },
    size() {
      this.draw();
    },
    threshold(newValue) {
      this.gauge && this.gauge.setThreshold(toNumber(newValue));
    },
    thresholdRising(newValue) {
      this.gauge && this.gauge.setThresholdRising(toBoolean(newValue));
    },
    thresholdVisible(newValue) {
      this.gauge && this.gauge.setThresholdVisible(toBoolean(newValue));
    },
    title(newValue) {
      this.gauge && this.gauge.setTitleString(newValue);
    },
    trendVisible(newValue) {
      this.gauge && this.gauge.setTrendVisible(toBoolean(newValue));
    },
    unit(newValue) {
      this.gauge && this.gauge.setUnitString(newValue);
    },
    value(newValue) {
      this.gauge && this.gauge.setValueAnimated(toNumber(newValue));
    },
    valueColor(newValue) {
      this.gauge && this.gauge.setValueColor(ColorDef[toUpper(newValue)]);
    },
  },
};
</script>
