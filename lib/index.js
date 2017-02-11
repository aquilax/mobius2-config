var nodeTypes = {
  config: 'config',
  comment: 'comment',
  line: 'line'
}

function parseLine(line) {
  if (line === '') {
    return {
      type: nodeTypes.line
    }
  };
  if (line.substring(0, 3) === '/**') {
    return parseComment(line);
  }
  return parseConfig(line);
}

function parseComment(line) {
  var re = /^\/\*\*(.+)\*\*\//;
  var comment = re.exec(line);
  return {
    type: nodeTypes.comment,
    value: comment[1]
  }
}

function parseConfig(line) {
  // Date format=[2];set date format,0:YYYY/MM/DD, 1:DD/MM/YYYY, 2:MM/DD/YYYY
  var re = /^(.+)=\[(.+)\];(.+)/;
  var keyVal = re.exec(line);
  var valuesArr = keyVal[3].split(',').map(s => s.trim());
  var name = keyVal[1];
  var description = valuesArr.shift();
  var options = [];
  valuesArr.forEach(function(item) {
    if (name === 'Date time') {
      options.push({
        value: item
      })
    } else {
      var kv = item.split(':');
      options.push({
        id: kv[0],
        value: kv[1]
      });
    }
  })
  var result = {
    type: nodeTypes.config,
    name: name,
    value: keyVal[2],
    description: description,
    options: options
  }
  return result;
}

function parse(configText) {
  if (!configText) {
    return {}
  }
  var result = [];
  configText.split(/\r|\n/).forEach(function(line){
    console.log(line);
    result.push(parseLine(line.trim()));
  })
  return result;
}

module.exports = {
  parse: parse
}
