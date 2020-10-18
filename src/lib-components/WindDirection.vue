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

import { toBoolean, toNumber, toUpper } from "./util";

/**
 * Displays latest and average wind direction dial with optional LCD display of values.
 * @displayName Wind Direction
 */
export default {
  name: "WindDirection",
  props: {
    /**
     * Average Wind Direction Indicator
     * @values 1-360 are used for directions, 0 is used as a special case to indicate 'calm'
     */
    average: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
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
     * Display degrees around the dial edge from 0 to 360 in 20 degree increments
     */
    degreeScale: {
      default: true,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Display degrees around the dial edge from -180 to 180
     * Requires degreeScale to be true
     */
    degreeScaleHalf: {
      default: false,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Uses LCD font the LCD display
     */
    digitalFont: {
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
     * Sets the maximum tween time for animation, reduce this to speed up the movement
     */
    fullScaleDeflectionTime: {
      default: 2.5,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
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
     * Sets the color of the LCD background
     * @values BEIGE, BLUE, ORANGE, RED, YELLOW, WHITE, GRAY, BLACK, GREEN, BLUE2, BLUE_BLACK,
     * BLUE_DARKBLUE, BLUE_GRAY, STANDARD, STANDARD_GREEN, BLUE_BLUE, RED_DARKRED, DARKBLUE,
     * LILA, BLACKRED, DARKGREEN, AMBER, LIGHTBLUE, SECTIONS
     */
    lcdColor: {
      default: "STANDARD",
      required: false,
      type: String,
      validator: (value) => value.toUpperCase() in LcdColor,
    },
    /**
     * Sets the title for the bottom average LCD display
     * @values String
     */
    lcdAverageTitle: {
      default: "Average",
      required: false,
      type: String,
    },
    /**
     * Sets the title for the top value LCD display
     * @values String
     */
    lcdValueTitle: {
      default: "Latest",
      required: false,
      type: String,
    },
    /**
     * Display the LCD displays (latest and average) in the dial
     * @values Boolean (defaults to true)
     */
    lcdVisible: {
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
     * Sets the color of the average value pointer in the dial
     * @values RED, GREEN, BLUE, ORANGE, YELLOW, CYAN, MAGENTA, WHITE, GRAY, BLACK,
     * RAITH, GREEN_LCD, JUG_GREEN
     */
    averagePointerColor: {
      default: "BLUE",
      required: false,
      type: String,
      validator: (value) => value.toUpperCase() in ColorDef,
    },
    /**
     * Sets the design type of the average value pointer in the dial
     * @values TYPE1 through TYPE16
     */
    averagePointerType: {
      default: "TYPE8",
      required: false,
      type: String,
      validator: (value) => value in PointerType,
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
     * Set the gauge title shown in the center
     */
    title: {
      default: undefined,
      required: false,
      type: String,
    },
    /**
     * Use the pointer colors for LCD labels
     */
    useColorLabels: {
      default: false,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Latest Wind Direction Indicator
     * @values 1-360 are used for directions, 0 is used as a special case to indicate 'calm'
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
      this.gauge = new WindDirection(this.$refs["view"], {
        backgroundColor: BackgroundColor[toUpper(this.backgroundColor)],
        backgroundVisible: toBoolean(this.backgroundVisible),
        customLayer: this.customLayer,
        degreeScale: toBoolean(this.degreeScale),
        degreeScaleHalf: toBoolean(this.degreeScaleHalf),
        digitalFont: this.digitalFont,
        foregroundType: ForegroundType[toUpper(this.foregroundType)],
        foregroundVisible: toBoolean(this.foregroundVisible),
        frameDesign: FrameDesign[toUpper(this.frameDesign)],
        frameVisible: toBoolean(this.frameVisible),
        fullScaleDeflectionTime: toNumber(this.fullScaleDeflectionTime),
        knobStyle: KnobStyle[toUpper(this.knobStyle)],
        knobType: KnobType[toUpper(this.knobType)],
        lcdColor: LcdColor[toUpper(this.lcdColor)],
        lcdTitleStrings: [this.lcdValueTitle, this.lcdAverageTitle],
        lcdVisible: toBoolean(this.lcdVisible),
        pointerColor: ColorDef[toUpper(this.pointerColor)],
        pointerColorAverage: ColorDef[toUpper(this.averagePointerColor)],
        pointerTypeAverage: PointerType[toUpper(this.averagePointerType)],
        pointerTypeLatest: PointerType[toUpper(this.pointerType)],
        pointSymbols: this.pointSymbols.split(","),
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
    lcdColor(newValue) {
      this.gauge && this.gauge.setLcdColor(LcdColor[toUpper(newValue)]);
    },
    lcdAverageTitle(newValue) {
      this.gauge &&
        this.gauge.setLcdTitleStrings([this.lcdValueTitle, newValue]);
    },
    lcdValueTitle(newValue) {
      this.gauge &&
        this.gauge.setLcdTitleStrings([newValue, this.lcdAverageTitle]);
    },
    pointerColor(newValue) {
      this.gauge && this.gauge.setPointerColor(ColorDef[toUpper(newValue)]);
    },
    averagePointerColor(newValue) {
      this.gauge &&
        this.gauge.setPointerColorAverage(ColorDef[toUpper(newValue)]);
    },
    pointSymbols(newValue) {
      this.gauge && this.gauge.setPointSymbols(newValue.split(","));
    },
    pointerType(newValue) {
      this.gauge && this.gauge.setPointerType(PointerType[toUpper(newValue)]);
    },
    averagePointerType(newValue) {
      this.gauge &&
        this.gauge.setPointerTypeAverage(PointerType[toUpper(newValue)]);
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
