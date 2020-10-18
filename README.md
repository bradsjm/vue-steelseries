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
import {
  Altimeter,
  Battery,
  Clock,
  Compass,
  Horizon,
  Led,
  ...
  WindDirection
} from "vue-steelseries";

export default {
  name: "Demo",
  components: {
    Altimeter,
    Battery,
    Clock,
    ...
    WindDirection
  }
}
```

```html
<template>
  <WindDirection
    size="200"
    frameDesign="GOLD"
    lcdVisible="true"
    :value="wind_dir + 1 || 0"
    :average="avg_dir + 1 || 0"
  />
</template>
```

## Documentation

Unfortunately there is currently no formal documentation however each Vue component has a full list of properties that can be used.

Some capabilities are still be implemented including sections and areas.
