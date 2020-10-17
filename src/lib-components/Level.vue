<template>
  <canvas ref="view"></canvas>
</template>

<script>
import {
  Level,
  BackgroundColor,
  ColorDef,
  FrameDesign,
  ForegroundType,
} from "steelseries";

import { toBoolean, toNumber } from "./util";

export default {
  name: "Level",
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
      type: [Boolean, String],
    },
    decimalsVisible: {
      default: undefined,
      required: false,
      type: [Boolean, String],
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
    rotateFace: {
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
    textOrientationFixed: {
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
    draw: function() {
      this.gauge = new Level(this.$refs["view"], {
        backgroundColor: BackgroundColor[this.backgroundColor],
        backgroundVisible: toBoolean(this.backgroundVisible),
        customLayer: this.customLayer,
        decimalsVisible: toBoolean(this.decimalsVisible),
        foregroundType: ForegroundType[this.foregroundType],
        foregroundVisible: toBoolean(this.foregroundVisible),
        frameDesign: FrameDesign[this.frameDesign],
        frameVisible: toBoolean(this.frameVisible),
        pointerColor: ColorDef[this.pointerColor],
        rotateFace: toBoolean(this.rotateFace),
        size: toNumber(this.size),
        textOrientationFixed: toBoolean(this.textOrientationFixed),
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
    foregroundType(newValue) {
      this.gauge && this.gauge.setForegroundType(ForegroundType[newValue]);
    },
    frameDesign(newValue) {
      this.gauge && this.gauge.setFrameDesign(FrameDesign[newValue]);
    },
    pointerColor(newValue) {
      this.gauge && this.gauge.setPointerColor(ColorDef[newValue]);
    },
    size() {
      this.draw();
    },
    value(newValue) {
      this.gauge && this.gauge.setValueAnimated(toNumber(newValue));
    },
  },
};
</script>
