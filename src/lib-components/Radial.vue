<template>
  <canvas ref="view"><slot /></canvas>
</template>

<script>
import {
  Radial,
  BackgroundColor,
  LcdColor,
  ColorDef,
  LedColor,
  GaugeType,
  KnobType,
  KnobStyle,
  FrameDesign,
  PointerType,
  ForegroundType,
  LabelNumberFormat,
  TickLabelOrientation,
} from "steelseries";

import { toBoolean, toNumber, toImage, toUpper } from "./util";

/**
 * Radial gauges
 * @displayName Radial
 */
export default {
  name: "Radial",
  props: {
    /**
     * HTML audio url used to embed optional alarm sound
     */
    alarmSound: {
      default: undefined,
      required: false,
      type: [Boolean, String],
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
     * Set custom layer to specified image source/url
     */
    customLayer: {
      default: undefined,
      required: false,
      type: String,
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
     * Number of fraction digits to show on scale
     */
    fractionalScaleDecimals: {
      default: 1,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
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
     * Set the gauge from one quarter of the display to full
     * @values TYPE1 (quarter) through TYPE4 (full)
     */
    gaugeType: {
      default: "TYPE4",
      required: false,
      type: String,
      validator: (value) => value.toUpperCase() in GaugeType,
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
     * Set the label number format for the scale.
     * STANDARD shows integer,
     * FRACTIONAL shows 2 fixed decimal places,
     * SCIENTIFIC shows to 2 significant digits
     * @values STANDARD, FRACTIONAL, SCIENTIFIC
     */
    labelNumberFormat: {
      default: "STANDARD",
      required: false,
      type: String,
      validator: (value) => value.toUpperCase() in LabelNumberFormat,
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
     * Set the number of decimal places displayed on the LCD
     */
    lcdDecimals: {
      default: 2,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
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
     * Set the LED color used to indicate values are over the set threshold
     * @values RED_LED, GREEN_LED, BLUE_LED, ORANGE_LED, YELLOW_LED, CYAN_LED, MAGENTA_LED
     */
    ledColor: {
      default: "RED_LED",
      required: false,
      type: String,
      validator: (value) => value.toUpperCase() in LedColor,
    },
    /**
     * Enable the display of the LED over threshold indicator
     */
    ledVisible: {
      default: true,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Enable the display of the maximum measured value
     */
    maxMeasuredValueVisible: {
      default: false,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Set the maximum value for the scale (Defaults to the minimum value plus 100)
     */
    maxValue: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * Enable the display of the minimum measured value
     */
    minMeasuredValueVisible: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Set the minimum value for the scale
     */
    minValue: {
      default: 0,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * Calculate nice values for min, max and range for the tickmarks
     */
    niceScale: {
      default: true,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Odometer - Set number of fraction digits to display
     */
    odoDecimals: {
      default: 1,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * Odometer - HTML background color
     */
    odoBackColor: {
      default: "#F0F0F0",
      required: false,
      type: String,
    },
    /**
     * Odometer - HTML foreground color
     */
    odoForeColor: {
      default: "#F01010",
      required: false,
      type: String,
    },
    /**
     * Odometer - Set number of whole digits to display
     */
    odoDigits: {
      default: 6,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * Odometer - Set the font to use
     */
    odoFont: {
      default: "sans-serif",
      required: false,
      type: String,
    },
    /**
     * Odometer - HTML color of the value foreground
     */
    odoValueForeColor: {
      default: "#F8F8F8",
      required: false,
      type: String,
    },
    /**
     * Odometer - HTML color of the value background
     */
    odoValueBackColor: {
      default: "#050505",
      required: false,
      type: String,
    },
    /**
     * Set to enable to use the radial value for the odometer value
     */
    odoUseValue: {
      default: false,
      required: false,
      type: [Boolean, String],
    },
    /**
     * If odoUseValue is not enabled, set the value to be displayed by the odometer
     */
    odoValue: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * Enable playing the alarm sound (if defined) when theshold is exceeded
     */
    playAlarm: {
      default: undefined,
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
     * Set the size in pixels of the canvas (height and width)
     */
    size: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => toNumber(value) > 0,
    },
    /**
     * Set the threshold marker (defaults to half way between min and max values)
     */
    threshold: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * Set true if threashold should be exceeded when value rises above it (false means below)
     */
    thresholdRising: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Set to enable the display of the threshold marker on the scale
     */
    thresholdVisible: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Force the tick orientation, default is based on gauge type
     * @values NORMAL or TANGENT
     */
    tickLabelOrientation: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value.toUpperCase() in TickLabelOrientation,
    },
    /**
     * Sets the gauge title
     */
    title: {
      default: undefined,
      required: false,
      type: String,
    },
    trendColors: {
      default: undefined,
      required: false,
      type: Array,
    },
    trendVisible: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Sets the unit values
     */
    unit: {
      default: undefined,
      required: false,
      type: String,
    },
    /**
     * Enable the odometer display
     */
    useOdometer: {
      default: undefined,
      required: false,
      type: [Boolean, String],
    },
    /**
     * If the user LED is enabled, set the color
     * @values RED_LED, GREEN_LED, BLUE_LED, ORANGE_LED, YELLOW_LED, CYAN_LED, MAGENTA_LED
     */
    userLedColor: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value.toUpperCase() in LedColor,
    },
    /**
     * Show the user LED on the gauge
     */
    userLedVisible: {
      default: false,
      required: false,
      type: [Boolean, String],
    },
    /**
     * Set the value shown on the gauge (and odometer if odoUseValue is set)
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
      sections: new Map(),
      areas: new Map(),
    };
  },
  methods: {
    draw() {
      this.gauge = new Radial(this.$refs["view"], {
        alarmSound: this.alarmSound,
        area: [...this.areas.values()],
        backgroundColor: BackgroundColor[toUpper(this.backgroundColor)],
        backgroundVisible: toBoolean(this.backgroundVisible),
        customLayer: toImage(this.customLayer),
        digitalFont: toBoolean(this.digitalFont),
        foregroundType: ForegroundType[toUpper(this.foregroundType)],
        foregroundVisible: toBoolean(this.foregroundVisible),
        fractionalScaleDecimals: toNumber(this.fractionalScaleDecimals),
        frameDesign: FrameDesign[toUpper(this.frameDesign)],
        frameVisible: toBoolean(this.frameVisible),
        fullScaleDeflectionTime: toNumber(this.fullScaleDeflectionTime),
        gaugeType: GaugeType[toUpper(this.gaugeType)],
        knobStyle: KnobStyle[toUpper(this.knobStyle)],
        knobType: KnobType[toUpper(this.knobType)],
        labelNumberFormat: LabelNumberFormat[toUpper(this.labelNumberFormat)],
        lcdColor: LcdColor[toUpper(this.lcdColor)],
        lcdDecimals: toNumber(this.lcdDecimals),
        lcdVisible: toBoolean(this.lcdVisible),
        ledColor: LedColor[toUpper(this.ledColor)],
        ledVisible: toBoolean(this.ledVisible),
        maxMeasuredValueVisible: toBoolean(this.maxMeasuredValueVisible),
        maxValue: toNumber(this.maxValue),
        minMeasuredValueVisible: toBoolean(this.minMeasuredValueVisible),
        minValue: toNumber(this.minValue),
        niceScale: toNumber(this.niceScale),
        odometerParams: {
          decimals: toNumber(this.odoDecimals),
          digits: toNumber(this.odoDigits),
          valueForeColor: this.odoValueForeColor,
          valueBackColor: this.odoValueBackColor,
          decimalForeColor: this.odoForeColor,
          deciamlBackColor: this.odoBackColor,
          font: this.odoFont,
          value: toNumber(this.odoValue),
        },
        odometerUseValue: toBoolean(this.odoUseValue),
        playAlarm: toBoolean(this.playAlarm),
        pointerColor: ColorDef[toUpper(this.pointerColor)],
        pointerType: PointerType[toUpper(this.pointerType)],
        section: [...this.sections.values()],
        size: toNumber(this.size),
        threshold: toNumber(this.threshold),
        thresholdRising: toBoolean(this.thresholdRising),
        thresholdVisible: toBoolean(this.thresholdVisible),
        tickLabelOrientation:
          TickLabelOrientation[toUpper(this.tickLabelOrientation)],
        titleString: this.title,
        trendColors: this.trendColors,
        trendVisible: toBoolean(this.trendVisible),
        unitString: this.unit,
        useOdometer: toBoolean(this.useOdometer),
        userLedColor: LedColor[toUpper(this.userLedColor)],
        userLedVisible: toBoolean(this.userLedVisible),
      });
      this.value && this.gauge.setValue(toNumber(this.value));
      this.odometerValue && this.gauge.setOdoValue(toNumber(this.odoValue));
    },
    setArea(id, area = undefined) {
      if (undefined === area) {
        this.areas.delete(id);
      } else {
        this.areas.set(id, area);
      }
      this.gauge && this.gauge.setArea([...this.areas.values()]);
    },
    setSection(id, section = undefined) {
      if (undefined === section) {
        this.sections.delete(id);
      } else {
        this.sections.set(id, section);
      }
      this.gauge && this.gauge.setSection([...this.sections.values()]);
    },
  },
  mounted() {
    this.draw();
  },
  provide() {
    return {
      setArea: this.setArea,
      setSection: this.setSection,
    };
  },
  watch: {
    backgroundColor(newValue) {
      this.gauge &&
        this.gauge.setBackgroundColor(BackgroundColor[toUpper(newValue)]);
    },
    fractionalScaleDecimals(newValue) {
      this.gauge && this.gauge.setFractionalScaleDecimals(toNumber(newValue));
    },
    frameDesign(newValue) {
      this.gauge && this.gauge.setFrameDesign(FrameDesign[toUpper(newValue)]);
    },
    foregroundType(newValue) {
      this.gauge &&
        this.gauge.setForegroundType(ForegroundType[toUpper(newValue)]);
    },
    labelNumberFormat(newValue) {
      this.gauge &&
        this.gauge.setLabelNumberFormat(LabelNumberFormat[toUpper(newValue)]);
    },
    lcdColor(newValue) {
      this.gauge && this.gauge.setLcdColor(LcdColor[toUpper(newValue)]);
    },
    lcdDecimals(newValue) {
      this.gauge && this.gauge.setLcdDecimals(toNumber(newValue));
    },
    ledColor(newValue) {
      this.gauge && this.gauge.setLedColor(LedColor[toUpper(newValue)]);
    },
    maxMeasuredValue(newValue) {
      this.gauge && this.gauge.setMaxMeasuredValue(toNumber(newValue));
    },
    maxMeasuredValueVisible(newValue) {
      this.gauge && this.gauge.setMaxMeasuredValueVisible(toNumber(newValue));
    },
    maxValue(newValue) {
      this.gauge && this.gauge.setMaxValue(toNumber(newValue));
    },
    minMeasuredValue(newValue) {
      this.gauge && this.gauge.setMinMeasuredValue(toNumber(newValue));
    },
    minMeasuredValueVisible(newValue) {
      this.gauge && this.gauge.setMinMeasuredValueVisible(toNumber(newValue));
    },
    minValue(newValue) {
      this.gauge && this.gauge.setMinValue(toNumber(newValue));
    },
    odometerValue(newValue) {
      this.gauge && this.gauge.setOdoValue(toNumber(newValue));
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
    threshold(newValue) {
      this.gauge && this.gauge.setThreshold(toNumber(newValue));
    },
    thresholdRising(newValue) {
      this.gauge && this.gauge.setThresholdRising(toBoolean(newValue));
    },
    thresholdVisible(newValue) {
      this.gauge && this.gauge.setThresholdVisible(toBoolean(newValue));
    },
    title(newValue) {
      this.gauge && this.gauge.setTitleString(newValue);
    },
    trendVisible(newValue) {
      this.gauge && this.gauge.setTrendVisible(toBoolean(newValue));
    },
    unit(newValue) {
      this.gauge && this.gauge.setUnitString(newValue);
    },
    userLedColor(newValue) {
      this.gauge && this.gauge.setUserLedColor(LedColor[toUpper(newValue)]);
    },
    userLedVisible(newValue) {
      this.gauge && this.gauge.setUserLedVisible(toBoolean(newValue));
    },
    value(newValue) {
      this.gauge && this.gauge.setValueAnimated(toNumber(newValue));
    },
  },
};
</script>
