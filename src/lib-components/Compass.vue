<template>
  <canvas ref="view"></canvas>
</template>

<script>
import {
  Compass,
  BackgroundColor,
  ColorDef,
  KnobType,
  KnobStyle,
  FrameDesign,
  PointerType,
  ForegroundType,
} from "steelseries";

import { toBoolean, toNumber, toImage, toUpper } from "../lib/util";

/**
 * Displays directional compass dial.
 * @displayName Compass
 */
export default {
  name: "Compass",
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
     * Display degrees around the dial edge from 0 to 360 in 20 degree increments
     */
    degreeScale: {
      default: true,
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
     * Sets the knob (where the hands connect in the center) design style
     * @values BLACK, BRASS, SILVER
     */
    knobStyle: {
      default: "SILVER",
      required: false,
      type: String,
      validator: (value) => value.toUpperCase() in KnobStyle,
    },
    /**
     * Sets the knob (where the hands connect in the center) type
     * @values STANDARD_KNOB, METAL_KNOB
     */
    knobType: {
      default: "STANDARD_KNOB",
      required: false,
      type: String,
      validator: (value) => value.toUpperCase() in KnobType,
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
      validator: (value) => value.toUpperCase() in PointerType,
    },
    /**
     * Sets the symbols of the 8 compass points around the dial
     * @values Comma seperated string of 8 symbols (default is "N,NE,E,SE,S,SW,W,NW")
     */
    pointSymbols: {
      default: "N,NE,E,SE,S,SW,W,NW",
      required: false,
      type: String,
      validator: (value) => value.split(",").length == 8,
    },
    /**
     * Display symbols of the 8 compass points around the dial
     */
    pointSymbolsVisible: {
      default: true,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Display compass rose overlay showing the orientation of
     * the cardinal directions and the intermediate points
     */
    roseVisible: {
      default: true,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Rotate the compass face so that north is always up
     */
    rotateFace: {
      default: false,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Set the pixel size of the canvas (height and width)
     */
    size: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => toNumber(value) > 0,
    },
    /**
     * Direction Indicator (Required)
     * @values 0-359 are used for indicator
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
      this.gauge = new Compass(this.$refs["view"], {
        backgroundColor: BackgroundColor[toUpper(this.backgroundColor)],
        backgroundVisible: toBoolean(this.backgroundVisible),
        customLayer: toImage(this.customLayer),
        degreeScale: toBoolean(this.degreeScale),
        foregroundType: ForegroundType[toUpper(this.foregroundType)],
        foregroundVisible: toBoolean(this.foregroundVisible),
        frameDesign: FrameDesign[toUpper(this.frameDesign)],
        frameVisible: toBoolean(this.frameVisible),
        knobStyle: KnobStyle[toUpper(this.knobStyle)],
        knobType: KnobType[toUpper(this.knobType)],
        pointerColor: ColorDef[toUpper(this.pointerColor)],
        pointerType: PointerType[toUpper(this.pointerTypeLatest)],
        pointSymbols: this.pointSymbols.split(","),
        pointSymbolsVisible: toBoolean(this.pointSymbolsVisible),
        roseVisible: toBoolean(this.roseVisible),
        rotateFace: toBoolean(this.rotateFace),
        size: toNumber(this.size),
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
        this.gauge.setBackgroundColor(toUpper(BackgroundColor[newValue]));
    },
    foregroundType(newValue) {
      this.gauge &&
        this.gauge.setForegroundType(ForegroundType[toUpper(newValue)]);
    },
    frameDesign(newValue) {
      this.gauge && this.gauge.setFrameDesign(FrameDesign[toUpper(newValue)]);
    },
    pointSymbols(newValue) {
      this.gauge && this.gauge.setPointSymbols(newValue.split(","));
    },
    pointerColor(newValue) {
      this.gauge && this.gauge.setPointerColor(ColorDef[toUpper(newValue)]);
    },
    pointerType(newValue) {
      this.gauge && this.gauge.setPointerType(PointerType[toUpper(newValue)]);
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
