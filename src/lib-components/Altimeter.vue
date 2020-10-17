<template>
  <canvas ref="view"></canvas>
</template>

<script>
import {
  Altimeter,
  BackgroundColor,
  LcdColor,
  KnobType,
  KnobStyle,
  FrameDesign,
  ForegroundType,
} from "steelseries";

import { toBoolean, toNumber } from "./util";

export default {
  name: "Altimeter",
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
    knobStyle: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in KnobStyle,
    },
    knobType: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in KnobType,
    },
    lcdColor: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in LcdColor,
    },
    lcdVisible: {
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
    unitAltPos: {
      default: undefined,
      required: false,
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
    draw: function() {
      this.gauge = new Altimeter(this.$refs["view"], {
        backgroundColor: BackgroundColor[this.backgroundColor],
        backgroundVisible: toBoolean(this.backgroundVisible),
        customLayer: this.customLayer,
        digitalFont: this.digitalFont,
        foregroundType: ForegroundType[this.foregroundType],
        foregroundVisible: toBoolean(this.foregroundVisible),
        frameDesign: FrameDesign[this.frameDesign],
        frameVisible: toBoolean(this.frameVisible),
        knobStyle: KnobStyle[this.knowStyle],
        knobType: KnobType[this.knobType],
        lcdColor: LcdColor[this.lcdColor],
        lcdVisible: toBoolean(this.lcdVisible),
        size: toNumber(this.size),
        titleString: this.title,
        unitAltPos: toNumber(this.unitAltPos),
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
      this.gauge && this.gauge.setBackgroundColor(BackgroundColor[newValue]);
    },
    foregroundType(newValue) {
      this.gauge && this.gauge.setForegroundType(ForegroundType[newValue]);
    },
    frameDesign(newValue) {
      this.gauge && this.gauge.setFrameDesign(FrameDesign[newValue]);
    },
    lcdColor(newValue) {
      this.gauge && this.gauge.setLcdColor(LcdColor[newValue]);
    },
    size() {
      this.draw();
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
