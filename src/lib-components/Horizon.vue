<template>
  <canvas ref="view"></canvas>
</template>

<script>
import { Horizon, ColorDef, FrameDesign, ForegroundType } from "steelseries";

function toBoolean(value) {
  if (undefined === value) return value;
  switch (
    value
      .toString()
      .toLowerCase()
      .trim()
  ) {
    case "true":
    case "yes":
    case "1":
      return true;
    case "false":
    case "no":
    case "0":
    case null:
      return false;
    default:
      return Boolean(value);
  }
}

function toNumber(value) {
  if (undefined === value) return value;
  return Number(value);
}

export default {
  name: "Horizon",
  props: {
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
      type: Boolean,
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
      type: Boolean,
    },
    pointerColor: {
      default: undefined,
      required: false,
      type: String,
      validator: (value) => value in ColorDef,
    },
    roll: {
      required: true,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    pitch: {
      required: true,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    pitchOffset: {
      default: undefined,
      required: false,
      type: [Number, String],
      validator: (value) => !Number.isNaN(value),
    },
    size: {
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
      this.gauge = new Horizon(this.$refs["view"], {
        foregroundType: ForegroundType[this.foregroundType],
        foregroundVisible: toBoolean(this.foregroundVisible),
        frameDesign: FrameDesign[this.frameDesign],
        frameVisible: toBoolean(this.frameVisible),
        pointerColor: ColorDef[this.pointerColor],
        size: toNumber(this.size),
      });
      this.roll && this.gauge.setRoll(this.roll);
      this.pitch && this.gauge.setPitch(this.pitch);
      this.pitchOffset && this.gauge.setPitchOffset(this.pitchOffset);
    },
  },
  mounted() {
    this.draw();
  },
  watch: {
    foregroundType(newValue) {
      this.gauge && this.gauge.setForegroundType(ForegroundType[newValue]);
    },
    frameDesign(newValue) {
      this.gauge && this.gauge.setFrameDesign(FrameDesign[newValue]);
    },
    pointerColor(newValue) {
      this.gauge && this.gauge.setPointerColor(ColorDef[newValue]);
    },
    roll(newValue) {
      this.gauge && this.gauge.setRollAnimated(newValue);
    },
    pitch(newValue) {
      this.gauge && this.gauge.setPitchAnimated(newValue);
    },
    pitchOffset(newValue) {
      this.gauge && this.gauge.setPitchOffset(newValue);
    },
    size() {
      this.draw();
    },
  },
};
</script>
