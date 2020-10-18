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

import { toBoolean, toNumber, toUpper } from "./util";

/**
 * Provides a level display gauge
 * @displayName Level
 */
export default {
  name: "Level",
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
     * Set layer passed to the canvas drawImage. The specification permits
     * any canvas image source (CanvasImageSource)
     */
    customLayer: {
      default: undefined,
      required: false,
    },
    /**
     * Enable the display of decimals in the value
     */
    decimalsVisible: {
      default: false,
      required: false,
      type: [Boolean, String],
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
     * Enable rotation of the display rather than the level
     */
    rotateFace: {
      default: false,
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
    /**
     * Set the text orientation to be fixed rather than follow the level
     */
    textOrientationFixed: {
      default: false,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Level value in degrees (Required)
     */
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
        backgroundColor: BackgroundColor[toUpper(this.backgroundColor)],
        backgroundVisible: toBoolean(this.backgroundVisible),
        customLayer: this.customLayer,
        decimalsVisible: toBoolean(this.decimalsVisible),
        foregroundType: ForegroundType[toUpper(this.foregroundType)],
        foregroundVisible: toBoolean(this.foregroundVisible),
        frameDesign: FrameDesign[toUpper(this.frameDesign)],
        frameVisible: toBoolean(this.frameVisible),
        pointerColor: ColorDef[toUpper(this.pointerColor)],
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
    size() {
      this.draw();
    },
    value(newValue) {
      this.gauge && this.gauge.setValueAnimated(toNumber(newValue));
    },
  },
};
</script>
