<template>
  <canvas ref="view"></canvas>
</template>

<script>
import {
  WindDirection,
  BackgroundColor,
  LcdColor,
  ColorDef,
  KnobType,
  KnobStyle,
  FrameDesign,
  PointerType,
  ForegroundType,
} from "steelseries";

import { toBoolean, toNumber } from "./util";

export default {
  name: "WindDirection",
  props: {
    // 1-360 are used for directions
    // 0 is used as a special case to indicate 'calm'
    average: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
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
    degreeScale: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    degreeScaleHalf: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    digitalFont: {
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
    fullScaleDeflectionTime: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
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
    // BEIGE, BLUE, ORANGE, RED, YELLOW, WHITE, GRAY, BLACK, GREEN, BLUE2, BLUE_BLACK,
    // BLUE_DARKBLUE, BLUE_GRAY, STANDARD, STANDARD_GREEN, BLUE_BLUE, RED_DARKRED, DARKBLUE,
    // LILA, BLACKRED, DARKGREEN, AMBER, LIGHTBLUE, SECTIONS
    lcdColor: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in LcdColor,
    },
    lcdTitleStrings: {
      default: undefined,
      required: false,
      type: Array,
    },
    lcdVisible: {
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
    averagePointerColor: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in ColorDef,
    },
    // TYPE1 through TYPE16
    averagePointerType: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in PointerType,
    },
    // TYPE1 through TYPE16
    pointerType: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in PointerType,
    },
    pointSymbols: {
      default: undefined,
      required: false,
      type: Array,
    },
    pointSymbolsVisible: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    roseVisible: {
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
    useColorLabels: {
      required: false,
      type: [Boolean, String],
    },
    // 1-360 are used for directions
    // 0 is used as a special case to indicate 'calm'
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
      this.gauge = new WindDirection(this.$refs["view"], {
        backgroundColor: BackgroundColor[this.backgroundColor],
        backgroundVisible: toBoolean(this.backgroundVisible),
        customLayer: this.customLayer,
        degreeScale: toBoolean(this.degreeScale),
        degreeScaleHalf: toBoolean(this.degreeScaleHalf),
        digitalFont: this.digitalFont,
        foregroundType: ForegroundType[this.foregroundType],
        foregroundVisible: toBoolean(this.foregroundVisible),
        frameDesign: FrameDesign[this.frameDesign],
        frameVisible: toBoolean(this.frameVisible),
        fullScaleDeflectionTime: toNumber(this.fullScaleDeflectionTime),
        knobStyle: KnobStyle[this.knobStyle],
        knobType: KnobType[this.knobType],
        lcdColor: LcdColor[this.lcdColor],
        lcdTitleStrings: this.lcdTitleStrings,
        lcdVisible: toBoolean(this.lcdVisible),
        pointerColor: ColorDef[this.pointerColor],
        pointerColorAverage: ColorDef[this.averagePointerColor],
        pointerTypeAverage: PointerType[this.averagePointerType],
        pointerTypeLatest: PointerType[this.pointerType],
        pointSymbols: this.pointSymbols,
        pointSymbolsVisible: toBoolean(this.pointSymbolsVisible),
        roseVisible: toBoolean(this.roseVisible),
        size: toNumber(this.size),
        titleString: this.title,
        useColorLabels: toBoolean(this.useColorLabels),
      });
      this.value && this.gauge.setValueLatest(toNumber(this.value));
      this.average && this.gauge.setValueAverage(toNumber(this.average));
    },
  },
  mounted() {
    this.draw();
  },
  watch: {
    average(newValue) {
      this.gauge && this.gauge.setValueAnimatedAverage(toNumber(newValue));
    },
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
    lcdTitleStrings(newValue) {
      this.gauge && this.gauge.setLcdTitleStrings(newValue);
    },
    pointerColor(newValue) {
      this.gauge && this.gauge.setPointerColor(ColorDef[newValue]);
    },
    averagePointerColor(newValue) {
      this.gauge && this.gauge.setPointerColorAverage(ColorDef[newValue]);
    },
    pointSymbols(newValue) {
      this.gauge && this.gauge.setPointSymbols(newValue);
    },
    pointerType(newValue) {
      this.gauge && this.gauge.setPointerType(PointerType[newValue]);
    },
    averagePointerType(newValue) {
      this.gauge && this.gauge.setPointerTypeAverage(PointerType[newValue]);
    },
    size() {
      this.draw();
    },
    value(newValue) {
      this.gauge && this.gauge.setValueAnimatedLatest(toNumber(newValue));
    },
  },
};
</script>
