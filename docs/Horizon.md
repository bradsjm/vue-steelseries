# Horizon

> Displays roll and pitch horizon gauge.

## Props

| Prop name         | Description                                                       | Type            | Values                                                                                                                                 | Default   |
| ----------------- | ----------------------------------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| foregroundType    | Sets the foreground styling type                                  | string          | `TYPE1 through TYPE5`                                                                                                                  | "TYPE1"   |
| foregroundVisible | Display the foreground style (from foregroundType) on the dial    | boolean\|string | -                                                                                                                                      | true      |
| frameDesign       | Select the frame design style used on the dial                    | string          | `BLACK_METAL`, `METAL`, `SHINY_METAL`, `BRASS`, `STEEL`, `CHROME`, `GOLD`, `ANTHRACITE`, `TILTED_GRAY`, `TILTED_BLACK`, `GLOSSY_METAL` | "METAL"   |
| frameVisible      | Display the frame (with the frameDesign selected) around the dial | boolean\|string | -                                                                                                                                      | true      |
| pointerColor      | Sets the color of the latest value pointer in the dial            | string          | `RED`, `GREEN`, `BLUE`, `ORANGE`, `YELLOW`, `CYAN`, `MAGENTA`, `WHITE`, `GRAY`, `BLACK`, `RAITH`, `GREEN_LCD`, `JUG_GREEN`             | "RED"     |
| roll              | Set the roll value to display (Required)                          | number\|string  | -                                                                                                                                      |           |
| pitch             | Set the pitch value to display (Required)                         | number\|string  | -                                                                                                                                      |           |
| pitchOffset       | Set the pitch offset to be used                                   | number\|string  | -                                                                                                                                      | 0         |
| size              | Set the size in pixels of the canvas (height and width)           | number\|string  | -                                                                                                                                      | undefined |

---
