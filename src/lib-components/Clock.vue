<template>
  <canvas ref="view"></canvas>
</template>

<script>
import {
  Clock,
  BackgroundColor,
  ColorDef,
  FrameDesign,
  PointerType,
  ForegroundType,
} from "steelseries";

import { toBoolean, toNumber } from "./util";

export default {
  name: "Clock",
  props: {
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
    hour: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    isAutomatic: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    minute: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
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
    second: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    secondMovesContinuous: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    secondPointerVisible: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    timeZoneOffsetHour: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    timeZoneOffsetMinute: {
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
      this.gauge = new Clock(this.$refs["view"], {
        backgroundColor: BackgroundColor[this.backgroundColor],
        backgroundVisible: toBoolean(this.backgroundVisible),
        customLayer: this.customLayer,
        foregroundType: ForegroundType[this.foregroundType],
        foregroundVisible: toBoolean(this.foregroundVisible),
        frameDesign: FrameDesign[this.frameDesign],
        frameVisible: toBoolean(this.frameVisible),
        hour: toNumber(this.hour),
        isAutomatic: toBoolean(this.isAutomatic),
        minute: toNumber(this.minute),
        pointerColor: ColorDef[this.pointerColor],
        pointerType: PointerType[this.pointerType],
        second: toNumber(this.second),
        secondMovesContinuous: toBoolean(this.secondMovesContinuous),
        secondPointerVisible: toBoolean(this.secondPointerVisible),
        size: toNumber(this.size),
        timeZoneOffsetHour: toNumber(this.timeZoneOffsetHour),
        timeZoneOffsetMinute: toNumber(this.timeZoneOffsetMinute),
      });
    },
  },
  mounted() {
    this.draw();
  },
  watch: {
    backgroundColor(newValue) {
      this.gauge && this.gauge.setBackgroundColor(BackgroundColor[newValue]);
    },
    foregroundType(newValue) {
      this.gauge && this.gauge.setForegroundType(ForegroundType[newValue]);
    },
    frameDesign(newValue) {
      this.gauge && this.gauge.setFrameDesign(FrameDesign[newValue]);
    },
    hour(newValue) {
      this.gauge && this.gauge.setHour(toNumber(newValue));
    },
    isAutomatic(newValue) {
      this.gauge && this.gauge.setAutomatic(toBoolean(newValue));
    },
    minute(newValue) {
      this.gauge && this.gauge.setMinute(toNumber(newValue));
    },
    pointerColor(newValue) {
      this.gauge && this.gauge.setPointerColor(ColorDef[newValue]);
    },
    pointerType(newValue) {
      this.gauge && this.gauge.setPointerType(PointerType[newValue]);
    },
    second(newValue) {
      this.gauge && this.gauge.setSecond(toNumber(newValue));
    },
    secondMovesContinuous(newValue) {
      this.gauge && this.gauge.setSecondMovesContinuous(toBoolean(newValue));
    },
    secondPointerVisible(newValue) {
      this.gauge && this.gauge.setSecondPointerVisible(toBoolean(newValue));
    },
    size() {
      this.draw();
    },
    timeZoneOffsetHour(newValue) {
      this.gauge && this.gauge.setTimeZoneOffsetHour(toNumber(newValue));
    },
    timeZoneOffsetMinute(newValue) {
      this.gauge && this.gauge.setTimeZoneOffsetMinute(toNumber(newValue));
    },
  },
};
</script>
