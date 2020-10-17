<template>
  <canvas ref="view"></canvas>
</template>

<script>
import {
  Radial,
  BackgroundColor,
  LcdColor,
  ColorDef,
  LedColor,
  GaugeType,
  KnobType,
  KnobStyle,
  FrameDesign,
  PointerType,
  ForegroundType,
  LabelNumberFormat,
  TickLabelOrientation,
} from "steelseries";

import { toBoolean, toNumber } from "./util";

export default {
  name: "Radial",
  props: {
    alarmSound: {
      default: undefined,
      required: false,
      type: [Boolean, String],
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
    // BLACK, BRASS, SILVER
    knobStyle: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in KnobStyle,
    },
    // STANDARD_KNOB, METAL_KNOB
    knobType: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in KnobType,
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
    niceScale: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    odometerParams: {
      default: undefined,
      required: false,
      type: Object,
    },
    odometerUseValue: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    odometerValue: {
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
    pointerColor: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in ColorDef,
    },
    // TYPE1 through TYPE16
    pointerType: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in PointerType,
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
    thresholdVisible: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    tickLabelOrientation: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in TickLabelOrientation,
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
    useOdometer: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    userLedColor: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in LedColor,
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
  },
  data() {
    return {
      gauge: null,
    };
  },
  methods: {
    draw() {
      this.gauge = new Radial(this.$refs["view"], {
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
        knobStyle: KnobStyle[this.knobStyle],
        knobType: KnobType[this.knobType],
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
        niceScale: toNumber(this.niceScale),
        odometerParams: this.odometerParams,
        odometerUseValue: toBoolean(this.odometerUseValue),
        playAlarm: toBoolean(this.playAlarm),
        pointerColor: ColorDef[this.pointerColor],
        pointerType: PointerType[this.pointerType],
        size: toNumber(this.size),
        threshold: toNumber(this.threshold),
        thresholdRising: toBoolean(this.thresholdRising),
        thresholdVisible: toBoolean(this.thresholdVisible),
        tickLabelOrientation: TickLabelOrientation[this.tickLabelOrientation],
        titleString: this.title,
        trendColors: this.trendColors,
        trendVisible: toBoolean(this.trendVisible),
        unitString: this.unit,
        useOdometer: toBoolean(this.useOdometer),
        userLedColor: LedColor[this.userLedColor],
        userLedVisible: toBoolean(this.userLedVisible),
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
    maxMeasuredValueVisible(newValue) {
      this.gauge && this.gauge.setMaxMeasuredValueVisible(toNumber(newValue));
    },
    maxValue(newValue) {
      this.gauge && this.gauge.setMaxValue(toNumber(newValue));
    },
    minMeasuredValue(newValue) {
      this.gauge && this.gauge.setMinMeasuredValue(toNumber(newValue));
    },
    minMeasuredValueVisible(newValue) {
      this.gauge && this.gauge.setMinMeasuredValueVisible(toNumber(newValue));
    },
    minValue(newValue) {
      this.gauge && this.gauge.setMinValue(toNumber(newValue));
    },
    odometerValue(newValue) {
      this.gauge && this.gauge.setOdoValue(toNumber(newValue));
    },
    pointerColor(newValue) {
      this.gauge && this.gauge.setPointerColor(ColorDef[newValue]);
    },
    pointerType(newValue) {
      this.gauge && this.gauge.setPointerType(PointerType[newValue]);
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
