Blockly.JavaScript['left'] = function(block) {
    return  'colonyBot.turnLeft();\n'
};
Blockly.JavaScript['right'] = function(block) {
    return 'colonyBot.turnRight();\n'
};
Blockly.JavaScript['leftBy'] = function(block) {
    const amount = block.getFieldValue('AMOUNT')*-1;
    return  `colonyBot.turn(${amount});
`
};
Blockly.JavaScript['rightBy'] = function(block) {
    const amount = block.getFieldValue('AMOUNT');
    return  `colonyBot.turn(${amount});
`
};
