<template>
  <canvas ref="view"></canvas>
</template>

<script>
import { Horizon, ColorDef, FrameDesign, ForegroundType } from "steelseries";

import { toBoolean, toNumber, toUpper } from "./util";

/**
 * Displays roll and pitch horizon gauge.
 * @displayName Horizon
 */

export default {
  name: "Horizon",
  props: {
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
     * Set the roll value to display (Required)
     */
    roll: {
      required: true,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * Set the pitch value to display (Required)
     */
    pitch: {
      required: true,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    /**
     * Set the pitch offset to be used
     */
    pitchOffset: {
      default: 0,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
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
      this.gauge = new Horizon(this.$refs["view"], {
        foregroundType: ForegroundType[toUpper(this.foregroundType)],
        foregroundVisible: toBoolean(this.foregroundVisible),
        frameDesign: FrameDesign[toUpper(this.frameDesign)],
        frameVisible: toBoolean(this.frameVisible),
        pointerColor: ColorDef[toUpper(this.pointerColor)],
        size: toNumber(this.size),
      });
      this.roll && this.gauge.setRoll(toNumber(this.roll));
      this.pitch && this.gauge.setPitch(toNumber(this.pitch));
      this.pitchOffset && this.gauge.setPitchOffset(toNumber(this.pitchOffset));
    },
  },
  mounted() {
    this.draw();
  },
  watch: {
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
    roll(newValue) {
      this.gauge && this.gauge.setRollAnimated(toNumber(newValue));
    },
    pitch(newValue) {
      this.gauge && this.gauge.setPitchAnimated(toNumber(newValue));
    },
    pitchOffset(newValue) {
      this.gauge && this.gauge.setPitchOffset(toNumber(newValue));
    },
    size() {
      this.draw();
    },
  },
};
</script>
