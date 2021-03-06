goog.require('Blockly.Blocks');
goog.require('Blockly');
Blockly.defineBlocksWithJsonArray([
  {
    "type": "forward",
    "message0": "forward",
    "previousStatement": null,
    "nextStatement": null,
    "colour":160,
    "helpUrl": "",
    "tooltip": "move forward by 1"
  },
  {
    "type": "backward",
    "message0": "backward",
    "previousStatement": null,
    "nextStatement": null,
    "colour":160,
    "helpUrl": "",
    "tooltip": "move backward by 1"
  },
  {
    "type": "left",
    "message0": "left",
    "previousStatement": null,
    "nextStatement": null,
    "colour":160,
    "helpUrl": "",
    "tooltip": "turn left by 1 path"
  },
  {
    "type": "right",
    "message0": "right",
    "previousStatement": null,
    "nextStatement": null,
    "colour":160,
    "helpUrl": "",
    "tooltip": "turn right by 1 path"
  },
  {
    "type": "rightBy",
    "message0": "right by %1",
    "args0": [{
      "type": "field_number",
      "name": "AMOUNT",
      "value": 2
    }],
    "previousStatement": null,
    "nextStatement": null,
    "colour":160,
    "helpUrl": "",
    "tooltip": "turn right by AMOUNT paths"
  },
  {
    "type": "leftBy",
    "message0": "left by %1",
    "args0": [{
      "type": "field_number",
      "name": "AMOUNT",
      "value": 2
    }],
    "previousStatement": null,
    "nextStatement": null,
    "colour":160,
    "helpUrl": "",
    "tooltip": "turn left by AMOUNT paths"
  },

])


