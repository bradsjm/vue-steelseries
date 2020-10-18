# Odometer

> Odometer display with animation and optional 'wobble' for digits

## Props

| Prop name       | Description                                                            | Type           | Values | Default      |
| --------------- | ---------------------------------------------------------------------- | -------------- | ------ | ------------ |
| backgroundColor | HTML Background Color of Gauge                                         | string         | -      | "#F0F0F0"    |
| digits          | Set number of whole digits to display                                  | number\|string | -      | 6            |
| decimal         | Set number of fraction digits to display                               | number\|string | -      | 1            |
| foregroundColor | HTML foreground color                                                  | string         | -      | "#F01010"    |
| font            | Set the font to use                                                    | string         | -      | "sans-serif" |
| height          | Set the canvas height in pixels                                        | number\|string | -      | undefined    |
| size            | Set the size of the canvas in pixels if height and width not used      | number\|string | -      | undefined    |
| value           | Set the value to display on the odometer                               | number\|string | -      |              |
| valueBackColor  | HTML color of the value background                                     | string         | -      | "#050505"    |
| valueForeColor  | HTML color of the value foreground                                     | string         | -      | "#F8F8F8"    |
| wobbleFactor    | Set the wobble factor of the digits, set to zero for perfect alignment | number\|string | -      | 0.07         |

---
