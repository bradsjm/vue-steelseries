<template>
  <canvas ref="view"></canvas>
</template>

<script>
import {
  Linear,
  BackgroundColor,
  LcdColor,
  ColorDef,
  LedColor,
  GaugeType,
  FrameDesign,
  LabelNumberFormat,
} from "steelseries";

import { toBoolean, toNumber } from "./util";

export default {
  name: "Linear",
  props: {
    alarmSound: {
      default: undefined,
      required: false,
      type: String,
    },
    // DARK_GRAY, SATIN_GRAY, LIGHT_GRAY, WHITE, BLACK, BEIGE, BROWN, RED, GREEN, BLUE, TURNED,
    // ANTHRACITE, MUD, PUNCHED_SHEET, CARBON, STAINLESS, BRUSHED_METAL, BRUSHED_STAINLESS
    backgroundColor: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in BackgroundColor,
    },
    backgroundVisible: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    customLayer: {
      default: undefined,
      required: false,
    },
    digitalFont: {
      default: undefined,
      required: false,
      type: String,
    },
    foregroundVisible: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    // BLACK_METAL, METAL, SHINY_METAL, BRASS, STEEL, CHROME, GOLD, ANTHRACITE, TILTED_GRAY,
    // TILTED_BLACK, GLOSSY_METAL
    frameDesign: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in FrameDesign,
    },
    frameVisible: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    fullScaleDeflectionTime: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    // TYPE1 through TYPE5
    gaugeType: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in GaugeType,
    },
    height: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    labelNumberFormat: {
      default: undefined,
      required: false,
      type: String,
    },
    ledColor: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in LedColor,
    },
    lcdDecimals: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    ledVisible: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    maxMeasuredValueVisible: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    maxValue: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    minMeasuredValueVisible: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    minValue: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    playAlarm: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    size: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => toNumber(value) > 0,
    },
    thresHold: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    thresholdRising: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    thresholdVisible: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    title: {
      default: undefined,
      required: false,
      type: String,
    },
    unit: {
      default: undefined,
      required: false,
      type: String,
    },
    value: {
      required: true,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    valueColor: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in ColorDef,
    },
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
      this.gauge = new Linear(this.$refs["view"], {
        alarmSound: this.alarmSound,
        backgroundColor: BackgroundColor[this.backgroundColor],
        backgroundVisible: toBoolean(this.backgroundVisible),
        customLayer: this.customLayer,
        digitalFont: this.digitalFont,
        foregroundVisible: toBoolean(this.foregroundVisible),
        frameDesign: FrameDesign[this.frameDesign],
        frameVisible: toBoolean(this.frameVisible),
        fullScaleDeflectionTime: toNumber(this.fullScaleDeflectionTime),
        gaugeType: GaugeType[this.gaugeType],
        height: this.height ? toNumber(this.height) : toNumber(this.size),
        labelNumberFormat: LabelNumberFormat[this.labelNumberFormat],
        lcdColor: LcdColor[this.lcdColor],
        lcdDecimals: toNumber(this.lcdDecimals),
        lcdVisible: toBoolean(this.lcdVisible),
        ledColor: LedColor[this.ledColor],
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
        valueColor: ColorDef[this.valueColor],
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
      this.gauge && this.gauge.setBackgroundColor(BackgroundColor[newValue]);
    },
    frameDesign(newValue) {
      this.gauge && this.gauge.setFrameDesign(FrameDesign[newValue]);
    },
    labelNumberFormat(newValue) {
      this.gauge &&
        this.gauge.setLabelNumberFormat(LabelNumberFormat[newValue]);
    },
    lcdColor(newValue) {
      this.gauge && this.gauge.setLcdColor(LcdColor[newValue]);
    },
    lcdDecimals(newValue) {
      this.gauge && this.gauge.setLcdDecimals(newValue);
    },
    ledColor(newValue) {
      this.gauge && this.gauge.setLedColor(LedColor[newValue]);
    },
    maxMeasuredValue(newValue) {
      this.gauge && this.gauge.setMaxMeasuredValue(newValue);
    },
    maxMeasuredValueVisible(newValue) {
      this.gauge && this.gauge.setMaxMeasuredValueVisible(newValue);
    },
    maxValue(newValue) {
      this.gauge && this.gauge.setMaxValue(newValue);
    },
    minMeasuredValue(newValue) {
      this.gauge && this.gauge.setMinMeasuredValue(newValue);
    },
    minMeasuredValueVisible(newValue) {
      this.gauge && this.gauge.setMinMeasuredValueVisible(newValue);
    },
    minValue(newValue) {
      this.gauge && this.gauge.setMinValue(newValue);
    },
    size() {
      this.draw();
    },
    threshold(newValue) {
      this.gauge && this.gauge.setThreshold(newValue);
    },
    thresholdRising(newValue) {
      this.gauge && this.gauge.setThresholdRising(newValue);
    },
    thresholdVisible(newValue) {
      this.gauge && this.gauge.setThresholdVisible(newValue);
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
      this.gauge && this.gauge.setValueColor(ColorDef[newValue]);
    },
  },
};
</script>
