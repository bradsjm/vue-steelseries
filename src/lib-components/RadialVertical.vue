<template>
  <canvas ref="view"></canvas>
</template>

<script>
import {
  RadialVertical,
  BackgroundColor,
  ColorDef,
  LedColor,
  Orientation,
  KnobType,
  KnobStyle,
  FrameDesign,
  PointerType,
  ForegroundType,
  LabelNumberFormat,
} from "steelseries";

import { toBoolean, toNumber, toUpper } from "./util";

/**
 * Radial gauge using bargraph display
 * @displayName Radial Bargraph
 */
export default {
  name: "RadialVertical",
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
     * Background Color of Dial
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
     * Display the dial background
     */
    backgroundVisible: {
      default: true,
      required: false,
      type: [Boolean, String],
    },
    // TYPE1 to TYPE5
    /**
     * Sets the foreground styling type
     * @values TYPE1 through TYPE5
     */
    foregroundType: {
      default: "TYPE1",
      required: false,
      type: String,
      validator: (value) => value.toUpperCase() in ForegroundType,
    },
    /**
     * Display the foreground style (from foregroundType) on the dial
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
     * Sets the knob (where the hands connect in the center) design style
     * @values BLACK, BRASS, SILVER
     */
    knobStyle: {
      default: "SILVER",
      required: false,
      type: String,
      validator: (value) => value.toUpperCase() in KnobStyle,
    },
    /**
     * Sets the knob (where the hands connect in the center) type
     * @values STANDARD_KNOB, METAL_KNOB
     */
    knobType: {
      default: "STANDARD_KNOB",
      required: false,
      type: String,
      validator: (value) => value.toUpperCase() in KnobType,
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
     * Set the LED color used to indicate values are over the set threshold
     * @values RED_LED, GREEN_LED, BLUE_LED, ORANGE_LED, YELLOW_LED, CYAN_LED, MAGENTA_LED
     */
    ledColor: {
      default: "RED_LED",
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
     * Calculate nice values for min, max and range for the tickmarks
     */
    niceScale: {
      default: true,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Gauge Orientation
     * @values NORTH, SOUTH, EAST, WEST
     */
    orientation: {
      default: "NORTH",
      required: false,
      type: String,
      validator: (value) => value.toUpperCase() in Orientation,
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
     * Sets the color of the latest value pointer in the dial
     * @values RED, GREEN, BLUE, ORANGE, YELLOW, CYAN, MAGENTA, WHITE, GRAY, BLACK,
     * RAITH, GREEN_LCD, JUG_GREEN
     */
    pointerColor: {
      default: "RED",
      required: false,
      type: String,
      validator: (value) => value.toUpperCase() in ColorDef,
    },
    /**
     * Sets the design type of the latest value pointer in the dial
     * @values TYPE1 through TYPE16
     */
    pointerType: {
      default: "TYPE1",
      required: false,
      type: String,
      validator: (value) => value.toUpperCase() in PointerType,
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
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Set to enable the display of the threshold marker on the scale
     */
    thresholdVisible: {
      default: undefined,
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
     * Set the value shown on the gauge
     */
    value: {
      required: true,
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
    draw() {
      this.gauge = new RadialVertical(this.$refs["view"], {
        alarmSound: this.alarmSound,
        backgroundColor: BackgroundColor[toUpper(this.backgroundColor)],
        backgroundVisible: toBoolean(this.backgroundVisible),
        foregroundType: ForegroundType[toUpper(this.foregroundType)],
        foregroundVisible: toBoolean(this.foregroundVisible),
        frameDesign: FrameDesign[toUpper(this.frameDesign)],
        frameVisible: toBoolean(this.frameVisible),
        fullScaleDeflectionTime: toNumber(this.fullScaleDeflectionTime),
        knobStyle: KnobStyle[toUpper(this.knobStyle)],
        knobType: KnobType[toUpper(this.knobType)],
        labelNumberFormat: LabelNumberFormat[toUpper(this.labelNumberFormat)],
        ledColor: LedColor[toUpper(this.ledColor)],
        ledVisible: toBoolean(this.ledVisible),
        maxMeasuredValueVisible: toBoolean(this.maxMeasuredValueVisible),
        maxValue: toNumber(this.maxValue),
        minMeasuredValueVisible: toBoolean(this.minMeasuredValueVisible),
        minValue: toNumber(this.minValue),
        niceScale: toNumber(this.niceScale),
        orientation: Orientation[toUpper(this.orientation)],
        playAlarm: toBoolean(this.playAlarm),
        pointerColor: ColorDef[toUpper(this.pointerColor)],
        pointerType: PointerType[toUpper(this.pointerType)],
        size: toNumber(this.size),
        threshold: toNumber(this.threshold),
        thresholdRising: toBoolean(this.thresholdRising),
        thresholdVisible: toBoolean(this.thresholdVisible),
        titleString: this.title,
        unitString: this.unit,
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
    foregroundType(newValue) {
      this.gauge &&
        this.gauge.setForegroundType(ForegroundType[toUpper(newValue)]);
    },
    labelNumberFormat(newValue) {
      this.gauge &&
        this.gauge.setLabelNumberFormat(LabelNumberFormat[toUpper(newValue)]);
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
    pointerColor(newValue) {
      this.gauge && this.gauge.setPointerColor(ColorDef[toUpper(newValue)]);
    },
    pointerType(newValue) {
      this.gauge && this.gauge.setPointerType(PointerType[toUpper(newValue)]);
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
    unit(newValue) {
      this.gauge && this.gauge.setUnitString(newValue);
    },
    value(newValue) {
      this.gauge && this.gauge.setValueAnimated(toNumber(newValue));
    },
  },
};
</script>
