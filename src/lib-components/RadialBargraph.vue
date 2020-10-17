<template>
  <canvas ref="view"></canvas>
</template>

<script>
import {
  RadialBargraph,
  BackgroundColor,
  LcdColor,
  ColorDef,
  LedColor,
  GaugeType,
  FrameDesign,
  ForegroundType,
  LabelNumberFormat,
  TickLabelOrientation,
} from "steelseries";

import { toBoolean, toNumber } from "./util";

export default {
  name: "RadialBargraph",
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
    // TYPE1 to TYPE5
    foregroundType: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in ForegroundType,
    },
    foregroundVisible: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    fractionalScaleDecimals: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
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
    labelNumberFormat: {
      default: undefined,
      required: false,
      type: String,
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
    lcdVisible: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    ledColor: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in LedColor,
    },
    ledVisible: {
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
    minValue: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    niceScale: {
      default: undefined,
      required: false,
      type: [Boolean, String],
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
    threshold: {
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
    tickLabelOrientation: {
      default: undefined,
      required: false,
      type: String,
    },
    title: {
      default: undefined,
      required: false,
      type: String,
    },
    trendColors: {
      default: undefined,
      required: false,
      type: Array,
    },
    trendVisible: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    unit: {
      default: undefined,
      required: false,
      type: String,
    },
    userLedColor: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in ColorDef,
    },
    userLedVisible: {
      default: undefined,
      required: false,
      type: [Boolean, String],
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
  },
  data() {
    return {
      gauge: null,
    };
  },
  methods: {
    draw() {
      this.gauge = new RadialBargraph(this.$refs["view"], {
        alarmSound: this.alarmSound,
        backgroundColor: BackgroundColor[this.backgroundColor],
        backgroundVisible: toBoolean(this.backgroundVisible),
        customLayer: this.customLayer,
        digitalFont: this.digitalFont,
        foregroundType: ForegroundType[this.foregroundType],
        foregroundVisible: toBoolean(this.foregroundVisible),
        fractionalScaleDecimals: toNumber(this.fractionalScaleDecimals),
        frameDesign: FrameDesign[this.frameDesign],
        frameVisible: toBoolean(this.frameVisible),
        fullScaleDeflectionTime: toNumber(this.fullScaleDeflectionTime),
        gaugeType: GaugeType[this.gaugeType],
        labelNumberFormat: LabelNumberFormat[this.labelNumberFormat],
        lcdColor: LcdColor[this.lcdColor],
        lcdDecimals: toNumber(this.lcdDecimals),
        lcdVisible: toBoolean(this.lcdVisible),
        ledColor: LedColor[this.ledColor],
        ledVisible: toBoolean(this.ledVisible),
        maxValue: toNumber(this.maxValue),
        minValue: toNumber(this.minValue),
        niceScale: toNumber(this.niceScale),
        playAlarm: toBoolean(this.playAlarm),
        size: toNumber(this.size),
        threshold: toNumber(this.threshold),
        thresholdRising: toBoolean(this.thresholdRising),
        tickLabelOrientation: TickLabelOrientation[this.tickLabelOrientation],
        titleString: this.title,
        trendColors: this.trendColors,
        trendVisible: toBoolean(this.trendVisible),
        unitString: this.unit,
        userLedColor: LedColor[this.userLedColor],
        userLedVisible: toBoolean(this.userLedVisible),
        valueColor: ColorDef[this.valueColor],
      });
      this.value && this.gauge.setValue(toNumber(this.value));
      this.odometerValue &&
        this.gauge.setOdoValue(toNumber(this.odometerValue));
    },
  },
  mounted() {
    this.draw();
  },
  watch: {
    backgroundColor(newValue) {
      this.gauge && this.gauge.setBackgroundColor(BackgroundColor[newValue]);
    },
    fractionalScaleDecimals(newValue) {
      this.gauge && this.gauge.setFractionalScaleDecimals(toNumber(newValue));
    },
    frameDesign(newValue) {
      this.gauge && this.gauge.setFrameDesign(FrameDesign[newValue]);
    },
    foregroundType(newValue) {
      this.gauge && this.gauge.setForegroundType(ForegroundType[newValue]);
    },
    labelNumberFormat(newValue) {
      this.gauge &&
        this.gauge.setLabelNumberFormat(LabelNumberFormat[newValue]);
    },
    lcdColor(newValue) {
      this.gauge && this.gauge.setLcdColor(LcdColor[newValue]);
    },
    lcdDecimals(newValue) {
      this.gauge && this.gauge.setLcdDecimals(toNumber(newValue));
    },
    ledColor(newValue) {
      this.gauge && this.gauge.setLedColor(LedColor[newValue]);
    },
    maxMeasuredValue(newValue) {
      this.gauge && this.gauge.setMaxMeasuredValue(toNumber(newValue));
    },
    maxValue(newValue) {
      this.gauge && this.gauge.setMaxValue(toNumber(newValue));
    },
    minMeasuredValue(newValue) {
      this.gauge && this.gauge.setMinMeasuredValue(toNumber(newValue));
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
    title(newValue) {
      this.gauge && this.gauge.setTitleString(newValue);
    },
    trendVisible(newValue) {
      this.gauge && this.gauge.setTrendVisible(toBoolean(newValue));
    },
    unit(newValue) {
      this.gauge && this.gauge.setUnitString(newValue);
    },
    userLedColor(newValue) {
      this.gauge && this.gauge.setUserLedColor(LedColor[newValue]);
    },
    userLedVisible(newValue) {
      this.gauge && this.gauge.setUserLedVisible(toBoolean(newValue));
    },
    value(newValue) {
      this.gauge && this.gauge.setValueAnimated(toNumber(newValue));
    },
  },
};
</script>
