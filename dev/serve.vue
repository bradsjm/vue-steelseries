<template>
  <div id="app" style="margin-left: 5%; margin-right: 5%">
    <table style="width: 100%;">
      <tr>
        <td>Frame Design</td>
        <td>Background Color</td>
        <td>Foreground Type</td>
        <td>Pointer Color</td>
        <td>Pointer Type</td>
      </tr>
      <tr>
        <td>
          <select v-model="frameDesign">
            <option disabled value="">Please select one</option>
            <option value="BLACK_METAL">BlackMetal</option>
            <option value="METAL">Metal</option>
            <option value="SHINY_METAL">ShinyMetal</option>
            <option value="BRASS">Brass</option>
            <option value="STEEL">Steel</option>
            <option value="CHROME">Chrome</option>
            <option value="GOLD">Gold</option>
            <option value="ANTHRACITE">Anthracite</option>
            <option value="TILTED_GRAY">TiltedGray</option>
            <option value="TILTED_BLACK">TiltedBlack</option>
            <option value="GLOSSY_METAL">GlossyMetal</option>
          </select>
        </td>
        <td>
          <select v-model="backgroundColor">
            <option disabled value="">Please select one</option>
            <option value="DARK_GRAY">DarkGray</option>
            <option value="SATIN_GRAY">SatinGray</option>
            <option value="LIGHT_GRAY">LightGray</option>
            <option value="WHITE">White</option>
            <option value="BLACK">Black</option>
            <option value="BEIGE">Beige</option>
            <option value="BROWN">Brown</option>
            <option value="RED">Red</option>
            <option value="GREEN">Green</option>
            <option value="BLUE">Blue</option>
            <option value="ANTHRACITE">Anthracite</option>
            <option value="MUD">Mud</option>
            <option value="PUNCHED_SHEET">PunchedSheet</option>
            <option value="CARBON">Carbon</option>
            <option value="STAINLESS">Stainless</option>
            <option value="BRUSHED_METAL">BrushedMetal</option>
            <option value="BRUSHED_STAINLESS">BrushedStainless</option>
            <option value="TURNED">Turned</option>
          </select>
        </td>
        <td>
          <select v-model="foregroundType">
            <option disabled value="">Please select one</option>
            <option value="TYPE1">Type1</option>
            <option value="TYPE2">Type2</option>
            <option value="TYPE3">Type3</option>
            <option value="TYPE4">Type4</option>
            <option value="TYPE5">Type5</option>
          </select>
        </td>
        <td>
          <select v-model="pointerColor">
            <option disabled value="">Please select one</option>
            <option value="RED">Red</option>
            <option value="GREEN">Green</option>
            <option value="BLUE">Blue</option>
            <option value="ORANGE">Orange</option>
            <option value="YELLOW">Yellow</option>
            <option value="CYAN">Cyan</option>
            <option value="MAGENTA">Magenta</option>
            <option value="WHITE">White</option>
            <option value="GRAY">Gray</option>
            <option value="BLACK">Black</option>
            <option value="RAITH">Raith</option>
            <option value="GREEN_LCD">Green LCD</option>
            <option value="JUG_GREEN">JUG Green</option>
          </select>
        </td>
        <td>
          <select v-model="pointerType">
            <option disabled value="">Please select one</option>
            <option value="TYPE1">Type 1</option>
            <option value="TYPE2">Type 2</option>
            <option value="TYPE3">Type 3</option>
            <option value="TYPE4">Type 4</option>
            <option value="TYPE5">Type 5</option>
            <option value="TYPE6">Type 6</option>
            <option value="TYPE7">Type 7</option>
            <option value="TYPE8">Type 8</option>
            <option value="TYPE9">Type 9</option>
            <option value="TYPE10">Type 10</option>
            <option value="TYPE11">Type 11</option>
            <option value="TYPE12">Type 12</option>
            <option value="TYPE13">Type 13</option>
            <option value="TYPE14">Type 14</option>
            <option value="TYPE15">Type 15</option>
            <option value="TYPE16">Type 16</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>Avg Pointer Color</td>
        <td>Avg Pointer Type</td>
        <td>LCD Color</td>
        <td>LED Color</td>
      </tr>
      <tr>
        <td>
          <select v-model="avgPointerColor">
            <option disabled value="">Please select one</option>
            <option value="RED">Red</option>
            <option value="GREEN">Green</option>
            <option value="BLUE">Blue</option>
            <option value="ORANGE">Orange</option>
            <option value="YELLOW">Yellow</option>
            <option value="CYAN">Cyan</option>
            <option value="MAGENTA">Magenta</option>
            <option value="WHITE">White</option>
            <option value="GRAY">Gray</option>
            <option value="BLACK">Black</option>
            <option value="RAITH">Raith</option>
            <option value="GREEN_LCD">Green LCD</option>
            <option value="JUG_GREEN">JUG Green</option>
          </select>
        </td>
        <td>
          <select v-model="avgPointerType">
            <option disabled value="">Please select one</option>
            <option value="TYPE1">Type 1</option>
            <option value="TYPE2">Type 2</option>
            <option value="TYPE3">Type 3</option>
            <option value="TYPE4">Type 4</option>
            <option value="TYPE5">Type 5</option>
            <option value="TYPE6">Type 6</option>
            <option value="TYPE7">Type 7</option>
            <option value="TYPE8">Type 8</option>
            <option value="TYPE9">Type 9</option>
            <option value="TYPE10">Type 10</option>
            <option value="TYPE11">Type 11</option>
            <option value="TYPE12">Type 12</option>
            <option value="TYPE13">Type 13</option>
            <option value="TYPE14">Type 14</option>
            <option value="TYPE15">Type 15</option>
            <option value="TYPE16">Type 16</option>
          </select>
        </td>
        <td>
          <select v-model="lcdColor">
            <option disabled value="">Please select one</option>
            <option value="BEIGE">Beige</option>
            <option value="BLUE">Blue</option>
            <option value="ORANGE">Orange</option>
            <option value="RED">Red</option>
            <option value="YELLOW">Yellow</option>
            <option value="WHITE">White</option>
            <option value="GRAY">Gray</option>
            <option value="BLACK">Black</option>
            <option value="GREEN">Green</option>
            <option value="BLUE2">Blue2</option>
            <option value="BLUE_BLACK">BlueBlack</option>
            <option value="BLUE_DARKBLUE">BlueDarkBlue</option>
            <option value="BLUE_GRAY">BlueGray</option>
            <option value="STANDARD">Standard</option>
            <option value="STANDARD_GREEN">StandardGreen</option>
            <option value="BLUE_BLUE">BlueBlue</option>
            <option value="RED_DARKRED">RedDarkRed</option>
            <option value="DARKBLUE">DarkBlue</option>
            <option value="LILA">Lila</option>
            <option value="BLACKRED">BlackRed</option>
            <option value="DARKGREEN">DarkGreen</option>
            <option value="AMBER">Amber</option>
            <option value="LIGHTBLUE">LightBlue</option>
            <option value="SECTIONS">Sections</option>
          </select>
        </td>
        <td>
          <select v-model="ledColor">
            <option disabled value="">Please select one</option>
            <option selected="selected" value="">Led color</option>
            <option value="RED_LED">Red</option>
            <option value="GREEN_LED">Green</option>
            <option value="BLUE_LED">Blue</option>
            <option value="ORANGE_LED">Orange</option>
            <option value="YELLOW_LED">Yellow</option>
            <option value="CYAN_LED">Cyan</option>
            <option value="MAGENTA_LED">Magenta</option>
          </select>
        </td>
      </tr>
    </table>

    <hr />
    <table width="100%">
      <tr>
        <td align="center" colspan="2"><b>Compass</b></td>
        <td align="center" colspan="2"><b>Wind Direction</b></td>
      </tr>
      <tr>
        <td align="center">
          <Compass
            size="201"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :foregroundType="foregroundType"
            :pointerColor="pointerColor"
            :pointerType="pointerType"
            :value="gauges.winddir.value"
          />
        </td>
        <td align="center">
          <Compass
            size="201"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :foregroundType="foregroundType"
            :pointerColor="pointerColor"
            :pointerType="pointerType"
            :value="gauges.winddir.value"
            degreeScale="true"
            rotateFace="true"
          />
        </td>
        <td align="center">
          <WindDirection
            size="201"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :foregroundType="foregroundType"
            :pointerColor="pointerColor"
            :pointerType="pointerType"
            :averagePointerColor="avgPointerColor"
            :averagePointerType="avgPointerType"
            :lcdColor="lcdColor"
            :value="gauges.winddir.value"
            :average="gauges.windavg.value"
          />
        </td>
        <td align="center">
          <WindDirection
            size="201"
            degreeScale="false"
            roseVisible="true"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :foregroundType="foregroundType"
            :pointerColor="pointerColor"
            :pointerType="pointerType"
            :averagePointerColor="avgPointerColor"
            :averagePointerType="avgPointerType"
            :lcdColor="lcdColor"
            :value="gauges.winddir.value"
            :average="gauges.windavg.value"
          />
        </td>
      </tr>
      <br />
      <tr>
        <td align="center"><b>Level</b></td>
        <td align="center"><b>Horizon</b></td>
        <td align="center"><b>Clock</b></td>
        <td align="center"><b>Altimeter</b></td>
      </tr>
      <tr>
        <td align="center">
          <Level
            size="201"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :foregroundType="foregroundType"
            :pointerColor="pointerColor"
            :value="gauges.level.value"
            decimalsVisible="false"
          />
        </td>
        <td align="center">
          <Horizon
            size="201"
            :frameDesign="frameDesign"
            :foregroundType="foregroundType"
            :pitch="gauges.pitch.value"
            :roll="gauges.roll.value"
          />
        </td>
        <td align="center">
          <Clock
            size="201"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :foregroundType="foregroundType"
            :pointerColor="pointerColor"
            :pointerType="pointerType"
          />
        </td>
        <td align="center">
          <Altimeter
            size="201"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :foregroundType="foregroundType"
            :lcdColor="lcdColor"
            :value="gauges.altimeter.value"
          />
        </td>
      </tr>
      <br />
      <tr>
        <td align="center"><b>Radial Type 1</b></td>
        <td align="center"><b>Radial Type 2</b></td>
        <td align="center"><b>Radial Type 3</b></td>
        <td align="center"><b>Radial Type 4</b></td>
      </tr>
      <tr>
        <td align="center">
          <Radial
            size="201"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :foregroundType="foregroundType"
            :lcdColor="lcdColor"
            :ledColor="ledColor"
            :pointerColor="pointerColor"
            :pointerType="pointerType"
            :value="gauges.radial.value"
            gaugeType="TYPE1"
            title="Title"
            unit="Type1"
            threshold="50"
            lcdVisible="true"
          />
        </td>
        <td align="center">
          <Radial
            size="201"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :foregroundType="foregroundType"
            :lcdColor="lcdColor"
            :ledColor="ledColor"
            :pointerColor="pointerColor"
            :pointerType="pointerType"
            :value="gauges.radial.value"
            gaugeType="TYPE2"
            title="Title"
            unit="Type2"
            threshold="50"
            lcdVisible="true"
          />
        </td>
        <td align="center">
          <Radial
            size="201"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :foregroundType="foregroundType"
            :lcdColor="lcdColor"
            :ledColor="ledColor"
            :pointerColor="pointerColor"
            :pointerType="pointerType"
            :value="gauges.radial.value"
            tickLabelOrientation="TANGENT"
            gaugeType="TYPE3"
            title="Title"
            unit="Type3"
            threshold="50"
            lcdVisible="true"
          />
        </td>
        <td align="center">
          <Radial
            size="201"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :foregroundType="foregroundType"
            :lcdColor="lcdColor"
            :ledColor="ledColor"
            :pointerColor="pointerColor"
            :pointerType="pointerType"
            :value="gauges.radial.value"
            gaugeType="TYPE4"
            title="Title"
            unit="Type4"
            threshold="50"
            lcdVisible="true"
          />
        </td>
      </tr>
      <tr>
        <td align="center"><b>Radial Bargraph 1</b></td>
        <td align="center"><b>Radial Bargraph 2</b></td>
        <td align="center"><b>Radial Bargraph 3</b></td>
        <td align="center"><b>Radial Bargraph 4</b></td>
      </tr>
      <tr>
        <td align="center">
          <RadialBargraph
            size="201"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :foregroundType="foregroundType"
            :lcdColor="lcdColor"
            :ledColor="ledColor"
            :pointerColor="pointerColor"
            :pointerType="pointerType"
            :value="gauges.radial.value"
            gaugeType="TYPE1"
            title="Title"
            unit="Type1"
            threshold="50"
            lcdVisible="true"
          />
        </td>
        <td align="center">
          <RadialBargraph
            size="201"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :foregroundType="foregroundType"
            :lcdColor="lcdColor"
            :ledColor="ledColor"
            :pointerColor="pointerColor"
            :pointerType="pointerType"
            :value="gauges.radial.value"
            gaugeType="TYPE2"
            title="Title"
            unit="Type2"
            threshold="50"
            lcdVisible="true"
          >
            <Section start="0" end="15" color="rgba(25, 112, 210, 0.4)" />
            <Section start="15" end="25" color="rgba(9, 150, 224, 0.4)" />
            <Section start="25" end="32" color="rgba(2, 170, 209, 0.4)" />
            <Section start="32" end="40" color="rgba(0, 162, 145, 0.4)" />
            <Section start="40" end="50" color="rgba(0, 158, 122, 0.4)" />
            <Section start="40" end="50" color="rgba(0, 158, 122, 0.4)" />
            <Section start="50" end="60" color="rgba(54, 177, 56, 0.4)" />
            <Section start="60" end="70" color="rgba(111, 202, 56, 0.4)" />
            <Section start="70" end="80" color="rgba(248, 233, 45, 0.4)" />
            <Section start="80" end="90" color="rgba(253, 142, 42, 0.4)" />
            <Section start="90" end="100" color="rgba(236, 45, 45, 0.4)" />
          </RadialBargraph>
        </td>
        <td align="center">
          <RadialBargraph
            size="201"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :foregroundType="foregroundType"
            :lcdColor="lcdColor"
            :ledColor="ledColor"
            :pointerColor="pointerColor"
            :pointerType="pointerType"
            :value="gauges.radial.value"
            tickLabelOrientation="TANGENT"
            gaugeType="TYPE3"
            title="Title"
            unit="Type3"
            threshold="50"
            lcdVisible="true"
          >
            <Section start="0" end="15" color="rgba(25, 112, 210, 0.4)" />
            <Section start="15" end="25" color="rgba(9, 150, 224, 0.4)" />
            <Section start="25" end="32" color="rgba(2, 170, 209, 0.4)" />
            <Section start="32" end="40" color="rgba(0, 162, 145, 0.4)" />
            <Section start="40" end="50" color="rgba(0, 158, 122, 0.4)" />
            <Section start="40" end="50" color="rgba(0, 158, 122, 0.4)" />
            <Section start="50" end="60" color="rgba(54, 177, 56, 0.4)" />
            <Section start="60" end="70" color="rgba(111, 202, 56, 0.4)" />
            <Section start="70" end="80" color="rgba(248, 233, 45, 0.4)" />
            <Section start="80" end="90" color="rgba(253, 142, 42, 0.4)" />
            <Section start="90" end="100" color="rgba(236, 45, 45, 0.4)" />
          </RadialBargraph>
        </td>
        <td align="center">
          <RadialBargraph
            size="201"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :foregroundType="foregroundType"
            :lcdColor="lcdColor"
            :ledColor="ledColor"
            :pointerColor="pointerColor"
            :pointerType="pointerType"
            :value="gauges.radial.value"
            gaugeType="TYPE4"
            title="Title"
            unit="Type4"
            threshold="50"
            lcdVisible="true"
          >
            <Section start="0" end="15" color="rgba(25, 112, 210, 0.4)" />
            <Section start="15" end="25" color="rgba(9, 150, 224, 0.4)" />
            <Section start="25" end="32" color="rgba(2, 170, 209, 0.4)" />
            <Section start="32" end="40" color="rgba(0, 162, 145, 0.4)" />
            <Section start="40" end="50" color="rgba(0, 158, 122, 0.4)" />
            <Section start="40" end="50" color="rgba(0, 158, 122, 0.4)" />
            <Section start="50" end="60" color="rgba(54, 177, 56, 0.4)" />
            <Section start="60" end="70" color="rgba(111, 202, 56, 0.4)" />
            <Section start="70" end="80" color="rgba(248, 233, 45, 0.4)" />
            <Section start="80" end="90" color="rgba(253, 142, 42, 0.4)" />
            <Section start="90" end="100" color="rgba(236, 45, 45, 0.4)" />
          </RadialBargraph>
        </td>
      </tr>
      <tr>
        <td align="center"><b>Radial Vertical North</b></td>
        <td align="center"><b>Radial Vertical West</b></td>
        <td align="center"><b>Radial Vertical East</b></td>
        <td align="center"><b>Radial Odometer</b></td>
      </tr>
      <tr>
        <td align="center">
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
            <Area start="65" end="85" color="rgba(212,132,134,0.3)" />
            <Section start="0" end="15" color="rgba(25, 112, 210, 0.4)" />
            <Section start="15" end="25" color="rgba(9, 150, 224, 0.4)" />
            <Section start="25" end="32" color="rgba(2, 170, 209, 0.4)" />
            <Section start="32" end="40" color="rgba(0, 162, 145, 0.4)" />
            <Section start="40" end="50" color="rgba(0, 158, 122, 0.4)" />
            <Section start="40" end="50" color="rgba(0, 158, 122, 0.4)" />
            <Section start="50" end="60" color="rgba(54, 177, 56, 0.4)" />
            <Section start="60" end="70" color="rgba(111, 202, 56, 0.4)" />
            <Section start="70" end="80" color="rgba(248, 233, 45, 0.4)" />
            <Section start="80" end="90" color="rgba(253, 142, 42, 0.4)" />
            <Section start="90" end="100" color="rgba(236, 45, 45, 0.4)" />
          </RadialVertical>
        </td>
        <td align="center">
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
            unit="West"
            threshold="50"
            orientation="WEST"
          />
        </td>
        <td align="center">
          <RadialVertical
            size="201"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :foregroundType="foregroundType"
            :ledColor="ledColor"
            :pointerColor="pointerColor"
            :pointerType="pointerType"
            :value="gauges.radial.value"
            tickLabelOrientation="TANGENT"
            title="Title"
            unit="East"
            threshold="50"
            orientation="EAST"
          />
        </td>
        <td align="center">
          <Radial
            size="201"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :foregroundType="foregroundType"
            :lcdColor="lcdColor"
            :ledColor="ledColor"
            :pointerColor="pointerColor"
            :pointerType="pointerType"
            :value="gauges.radial.value"
            :odometerValue="odometerValue"
            gaugeType="TYPE4"
            title="Title"
            unit="Type4"
            threshold="50"
            lcdVisible="true"
            lcdDecimals="1"
            useOdometer="true"
            userLedVisible="true"
          >
            <Area start="65" end="85" color="rgba(212,132,134,0.3)" />
            <Section start="0" end="15" color="rgba(25, 112, 210, 0.4)" />
            <Section start="15" end="25" color="rgba(9, 150, 224, 0.4)" />
            <Section start="25" end="32" color="rgba(2, 170, 209, 0.4)" />
            <Section start="32" end="40" color="rgba(0, 162, 145, 0.4)" />
            <Section start="40" end="50" color="rgba(0, 158, 122, 0.4)" />
            <Section start="40" end="50" color="rgba(0, 158, 122, 0.4)" />
            <Section start="50" end="60" color="rgba(54, 177, 56, 0.4)" />
            <Section start="60" end="70" color="rgba(111, 202, 56, 0.4)" />
            <Section start="70" end="80" color="rgba(248, 233, 45, 0.4)" />
            <Section start="80" end="90" color="rgba(253, 142, 42, 0.4)" />
            <Section start="90" end="110" color="rgba(236, 45, 45, 0.4)" />
            <Section start="110" end="200" color="rgba(245, 109, 205, 0.4)" />
          </Radial>
        </td>
      </tr>

      <tr>
        <td align="center"><b>Linear Type1</b></td>
        <td align="center"><b>Linear Type1</b></td>
        <td align="center"><b>Linear Type2</b></td>
        <td align="center"><b>Linear Bargraph</b></td>
      </tr>
      <tr>
        <td align="center">
          <Linear
            width="140"
            height="320"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :lcdColor="lcdColor"
            :ledColor="ledColor"
            :valueColor="pointerColor"
            :value="gauges.linear.value"
            gaugeType="TYPE1"
            title="Title"
            unit="Type1"
            threshold="50"
            lcdVisible="true"
          />
        </td>
        <td align="center">
          <Linear
            width="140"
            height="320"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :lcdColor="lcdColor"
            :ledColor="ledColor"
            :valueColor="pointerColor"
            :value="gauges.linear.value"
            gaugeType="TYPE1"
            title="Title"
            unit="Type1"
            threshold="50"
            lcdVisible="false"
          />
        </td>
        <td align="center">
          <Linear
            width="140"
            height="320"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :lcdColor="lcdColor"
            :ledColor="ledColor"
            :valueColor="pointerColor"
            :value="gauges.linear.value"
            gaugeType="TYPE2"
            title="Title"
            unit="Type2"
            threshold="50"
            lcdVisible="true"
          />
        </td>
        <td align="center">
          <LinearBargraph
            width="140"
            height="320"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :lcdColor="lcdColor"
            :ledColor="ledColor"
            :valueColor="pointerColor"
            :value="gauges.linear.value"
            gaugeType="TYPE1"
            title="Title"
            unit="Type1"
            threshold="50"
            lcdVisible="true"
          >
            <Section start="0" end="15" color="rgba(25, 112, 210, 0.4)" />
            <Section start="15" end="25" color="rgba(9, 150, 224, 0.4)" />
            <Section start="25" end="32" color="rgba(2, 170, 209, 0.4)" />
            <Section start="32" end="40" color="rgba(0, 162, 145, 0.4)" />
            <Section start="40" end="50" color="rgba(0, 158, 122, 0.4)" />
            <Section start="40" end="50" color="rgba(0, 158, 122, 0.4)" />
            <Section start="50" end="60" color="rgba(54, 177, 56, 0.4)" />
            <Section start="60" end="70" color="rgba(111, 202, 56, 0.4)" />
            <Section start="70" end="80" color="rgba(248, 233, 45, 0.4)" />
            <Section start="80" end="90" color="rgba(253, 142, 42, 0.4)" />
            <Section start="90" end="100" color="rgba(236, 45, 45, 0.4)" />
          </LinearBargraph>
        </td>
      </tr>

      <tr>
        <td colspan="2" align="center"><b>Linear Type1</b></td>
        <td colspan="2" align="center"><b>Linear Type2</b></td>
      </tr>
      <tr>
        <td colspan="2" align="center">
          <Linear
            width="320"
            height="140"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :lcdColor="lcdColor"
            :ledColor="ledColor"
            :valueColor="pointerColor"
            :value="gauges.linear.value"
            gaugeType="TYPE1"
            title="Title"
            unit="Type1"
            threshold="50"
            lcdVisible="true"
          />
        </td>
        <td colspan="2" align="center">
          <Linear
            width="320"
            height="140"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :lcdColor="lcdColor"
            :ledColor="ledColor"
            :valueColor="pointerColor"
            :value="gauges.linear.value"
            gaugeType="TYPE2"
            title="Title"
            unit="Type2"
            threshold="50"
            lcdVisible="false"
          />
        </td>
      </tr>
      <tr>
        <td align="center"><b>StopWatch</b></td>
        <td align="center"><b>LightBulb</b></td>
        <td align="center"><b>TrafficLight</b></td>
        <td align="center"><b>Battery</b></td>
      </tr>
      <tr>
        <td align="center">
          <StopWatch
            size="201"
            run="true"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :foregroundType="foregroundType"
            :pointerColor="pointerColor"
          />
        </td>
        <td align="center">
          <LightBulb size="201" :value="bulb" />
        </td>
        <td align="center">
          <TrafficLight
            size="201"
            :red="trafficlight == 1"
            :yellow="trafficlight == 2"
            :green="trafficlight == 3"
            :frameDesign="frameDesign"
            :backgroundColor="backgroundColor"
            :foregroundType="foregroundType"
            :pointerColor="pointerColor"
          />
        </td>
        <td align="center">
          <Battery size="100" :value="gauges.linear.value" />
        </td>
      </tr>
      <tr>
        <td align="center"><b>LED</b></td>
        <td align="center"><b>Odometer</b></td>
        <td align="center"><b>DisplaySingle</b></td>
        <td align="center"><b>DisplayMulti</b></td>
      </tr>
      <tr>
        <td align="center">
          <Led size="100" :value="bulb" />
        </td>
        <td align="center">
          <Odometer height="50" wobbleFactor="0" :value="odometerValue" />
        </td>
        <td align="center">
          <DisplaySingle
            width="120"
            height="50"
            header="Header"
            headerVisible="true"
            valuesNumeric="true"
            unit="units"
            unitVisible="true"
            lcdDecimals="1"
            :value="odometerValue"
          />
        </td>
        <td align="center">
          <DisplayMulti
            width="200"
            height="80"
            header="Header"
            headerVisible="true"
            valuesNumeric="true"
            lcdDecimals="1"
            unit="units"
            unitVisible="true"
            :value="odometerValue"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Vue from "vue";
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
} from "@/entry";

export default Vue.extend({
  name: "ServeDev",
  components: {
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
  },
  data() {
    return {
      frameDesign: undefined,
      backgroundColor: undefined,
      foregroundType: undefined,
      pointerColor: undefined,
      pointerType: undefined,
      avgPointerColor: undefined,
      avgPointerType: undefined,
      lcdColor: undefined,
      ledColor: undefined,
      interval: undefined,
      odometerValue: 0,
      bulb: false,
      trafficlight: 1,
      gauges: {
        winddir: {
          value: 1,
          min: 1,
          max: 360,
        },
        windavg: {
          value: 1,
          min: 1,
          max: 360,
        },
        level: {
          value: 1,
          min: 1,
          max: 360,
        },
        pitch: {
          value: 50,
          min: -90,
          max: 90,
        },
        roll: {
          value: 60,
          min: -90,
          max: 90,
        },
        altimeter: {
          value: 100,
          min: 100,
          max: 10000,
        },
        radial: {
          value: 1,
          min: 1,
          max: 100,
        },
        linear: {
          value: 1,
          min: 1,
          max: 100,
        },
      },
    };
  },
  methods: {
    update() {
      for (const [k, v] of Object.entries(this.gauges)) {
        v.value = v.min + Math.random() * (v.max - v.min);
      }
      this.odometerValue += Math.random() * 10;
      this.bulb = !this.bulb;
      this.trafficlight++;
      if (this.trafficlight > 3) this.trafficlight = 1;
    },
  },
  mounted() {
    this.update();
    this.interval = setInterval(this.update, 5000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
});
</script>
