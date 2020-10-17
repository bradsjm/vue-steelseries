<template>
  <canvas ref="view"></canvas>
</template>

<script>
import {
  StopWatch,
  BackgroundColor,
  ColorDef,
  FrameDesign,
  ForegroundType,
} from "steelseries";

import { toBoolean, toNumber } from "./util";

export default {
  name: "StopWatch",
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
    pointerColor: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in ColorDef,
    },
    reset: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    run: {
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
  },
  data() {
    return {
      gauge: null,
    };
  },
  methods: {
    draw: function() {
      this.gauge = new StopWatch(this.$refs["view"], {
        backgroundColor: BackgroundColor[this.backgroundColor],
        backgroundVisible: toBoolean(this.backgroundVisible),
        customLayer: this.customLayer,
        foregroundType: ForegroundType[this.foregroundType],
        foregroundVisible: toBoolean(this.foregroundVisible),
        frameDesign: FrameDesign[this.frameDesign],
        frameVisible: toBoolean(this.frameVisible),
        pointerColor: ColorDef[this.pointerColor],
        size: toNumber(this.size),
      });
      if (toBoolean(this.run)) this.startWatch();
    },
    startWatch: function() {
      this.gauge && this.gauge.start();
    },
    stopWatch: function() {
      this.gauge && this.gauge.stop();
    },
    resetWatch: function() {
      this.gauge && this.gauge.reset();
    },
    lapWatch: function() {
      this.gauge && this.gauge.lap();
    },
  },
  mounted() {
    this.draw();
  },
  calculated: {
    measuredTime() {
      return this.gauge.getMeasuredTime();
    },
    isRunning() {
      return this.gauge.isRunning();
    },
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
    pointerColor(newValue) {
      this.gauge && this.gauge.setPointerColor(ColorDef[newValue]);
    },
    reset(newValue) {
      if (toBoolean(newValue)) this.resetWatch();
    },
    run(newValue) {
      toBoolean(newValue) ? this.startWatch() : this.stopWatch();
    },
    size() {
      this.draw();
    },
  },
};
</script>
