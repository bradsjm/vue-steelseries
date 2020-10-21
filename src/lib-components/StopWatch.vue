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

import { toBoolean, toNumber, toImage, toUpper } from "../lib/util";

export default {
  name: "StopWatch",
  props: {
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
    /**
     * Set custom layer to specified image source/url
     */
    customLayer: {
      default: undefined,
      required: false,
      type: String,
    },
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
     * Set to true to reset the stop watch to zero
     */
    reset: {
      default: false,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Set to true to start stop watch, false to stop
     */
    run: {
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
  },
  data() {
    return {
      gauge: null,
    };
  },
  methods: {
    draw: function() {
      this.gauge = new StopWatch(this.$refs["view"], {
        backgroundColor: BackgroundColor[toUpper(this.backgroundColor)],
        backgroundVisible: toBoolean(this.backgroundVisible),
        customLayer: toImage(this.customLayer),
        foregroundType: ForegroundType[toUpper(this.foregroundType)],
        foregroundVisible: toBoolean(this.foregroundVisible),
        frameDesign: FrameDesign[toUpper(this.frameDesign)],
        frameVisible: toBoolean(this.frameVisible),
        pointerColor: ColorDef[toUpper(this.pointerColor)],
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
      this.gauge &&
        this.gauge.setBackgroundColor(BackgroundColor[toUpper(newValue)]);
    },
    foregroundType(newValue) {
      this.gauge &&
        this.gauge.setForegroundType(ForegroundType[toUpper(newValue)]);
    },
    frameDesign(newValue) {
      this.gauge && this.gauge.setFrameDesign(FrameDesign[toUpper(newValue)]);
    },
    pointerColor(newValue) {
      this.gauge && this.gauge.setPointerColor(ColorDef[toUpper(newValue)]);
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
