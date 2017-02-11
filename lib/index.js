var nodeTypes = {
  config: 'config'
}

function parseLine(line) {
  // Date format=[2];set date format,0:YYYY/MM/DD, 1:DD/MM/YYYY, 2:MM/DD/YYYY
  var re = /^(.+)=\[(\d)+\];(.+)/;
  var keyVal = re.exec(line);
  var valuesArr = keyVal[3].split(',').map(s => s.trim());
  var description = valuesArr.shift();
  var options = {};
  valuesArr.forEach(function(item) {
    var kv = item.split(':');
    options[kv[0]]=kv[1];
  })
  var result = {
    type: nodeTypes.config,
    name: keyVal[1],
    value: parseInt(keyVal[2], 10),
    description: description,
    options: options
  }
  return result;
}

function parseConfig(configText) {
  if (!configText) {
    return {}
  }
  var result = [];
  configText.split("\n").forEach(function(line){
    result.push(parseLine(configText));
  })
  return result;
}

module.exports = {
  parseConfig: parseConfig
}
