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

import { toBoolean, toNumber, toUpper } from "./util";

/**
 * Displays a clock dial that can either be set manually or run automatically
 * @displayName Clock
 */
export default {
  name: "Clock",
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
     * any canvas image source (CanvasImageSource), specifically, a CSSImageValue,
     * an HTMLImageElement, an SVGImageElement, an HTMLVideoElement, an HTMLCanvasElement,
     * an ImageBitmap, or an OffscreenCanvas.
     */
    customLayer: {
      default: undefined,
      required: false,
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
     * Set the hour display (if not automatic)
     * @values Hour (0-23)
     */
    hour: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * Set to have the clock automatically advance
     */
    isAutomatic: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Set the minute display (if not automatic)
     * @values Minute (0-59)
     */
    minute: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
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
     * Sets the design type of the latest value pointer in the dial
     * @values TYPE1 through TYPE16
     */
    pointerType: {
      default: "TYPE1",
      required: false,
      type: String,
      validator: (value) => value in PointerType,
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
     * Set the second display (if not automatic)
     * @values Seconds (0-59)
     */
    second: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * Set to enable the second hand to continously move
     */
    secondMovesContinuous: {
      default: false,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Set to enable the second hand to be displayed
     */
    secondPointerVisible: {
      default: ture,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Set the timezone hour offset
     */
    timeZoneOffsetHour: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * Set the timezone minute offset
     */
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
        backgroundColor: BackgroundColor[toUpper(this.backgroundColor)],
        backgroundVisible: toBoolean(this.backgroundVisible),
        customLayer: this.customLayer,
        foregroundType: ForegroundType[toUpper(this.foregroundType)],
        foregroundVisible: toBoolean(this.foregroundVisible),
        frameDesign: FrameDesign[toUpper(this.frameDesign)],
        frameVisible: toBoolean(this.frameVisible),
        hour: toNumber(this.hour),
        isAutomatic: toBoolean(this.isAutomatic),
        minute: toNumber(this.minute),
        pointerColor: ColorDef[toUpper(this.pointerColor)],
        pointerType: PointerType[toUpper(this.pointerType)],
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
      this.gauge && this.gauge.setPointerColor(ColorDef[toUpper(newValue)]);
    },
    pointerType(newValue) {
      this.gauge && this.gauge.setPointerType(PointerType[toUpper(newValue)]);
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
