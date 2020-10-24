# Vue-Steelseries Gauges

A collection of Vue components for the steelseries gauge components for JavaScript.

This project provides Vue component wrappers for the NPM steelseries package (https://www.npmjs.com/package/steelseries)

## Installation

### Using npm

```bash
npm install vue-steelseries --save
```

## Example

```javascript
<script>
import {
    Altimeter,
    Area,
    Battery,
    Clock,
    Compass,
    DisplaySingle,
    DisplayMulti,
    Horizon,
    Led,
    Level,
    LightBulb,
    Linear,
    LinearBargraph,
    Odometer,
    Radial,
    RadialBargraph,
    RadialVertical,
    Section,
    StopWatch,
    TrafficLight,
    WindDirection,
} from "vue-steelseries";

export default {
  name: "Demo",
  components: {
    Area,
    Section,
    RadialVertical,
  }
}
</script>
```

```html
<template>
  <RadialVertical
    size="201"
    :frameDesign="frameDesign"
    :backgroundColor="backgroundColor"
    :foregroundType="foregroundType"
    :ledColor="ledColor"
    :pointerColor="pointerColor"
    :pointerType="pointerType"
    :value="gauges.radial.value"
    title="Title"
    unit="North"
    threshold="50"
  >
    <area start="65" end="85" color="rgba(212,132,134,0.3)" />
    <section start="0" end="15" color="rgba(25, 112, 210, 0.4)" />
    <section start="15" end="25" color="rgba(9, 150, 224, 0.4)" />
    <section start="25" end="32" color="rgba(2, 170, 209, 0.4)" />
    <section start="32" end="40" color="rgba(0, 162, 145, 0.4)" />
    <section start="40" end="50" color="rgba(0, 158, 122, 0.4)" />
    <section start="40" end="50" color="rgba(0, 158, 122, 0.4)" />
    <section start="50" end="60" color="rgba(54, 177, 56, 0.4)" />
    <section start="60" end="70" color="rgba(111, 202, 56, 0.4)" />
    <section start="70" end="80" color="rgba(248, 233, 45, 0.4)" />
    <section start="80" end="90" color="rgba(253, 142, 42, 0.4)" />
    <section start="90" end="100" color="rgba(236, 45, 45, 0.4)" />
  </RadialVertical>
</template>
```

## Documentation

Unfortunately there is currently no formal documentation for Steelseries Gauges however each Vue component has a full list of properties that have been documented on a best-effort basis through reverse engineering in the [docs](https://github.com/bradsjm/vue-steelseries/tree/main/docs) folder.

An example of each component is provided in the [serve.vue](https://github.com/bradsjm/vue-steelseries/blob/main/dev/serve.vue) file.
