var nodeType = {
  config: 'config',
  comment: 'comment',
  line: 'line',
  heading: 'heading',
  balance: 'balance',
  version: 'version',
}

function parseLine(line) {
  if (line === '') {
    return {
      type: nodeType.line
    }
  };
  if (line.substring(0, 3) === '/**') {
    return parseComment(line);
  }
  if (line.match(/^([a-z\s]+)\:([\d\.]+)/)) {
    return parseVersion(line);
  }
  if (line.indexOf('Customized White Balance') === 0) {
    return {
      type: nodeType.balance,
      value: 'NOT IMPLEMENTED',
      raw: line
    }
  }
  if (line.indexOf('=[') === -1) {
    return {
      type: nodeType.heading,
      value: line
    }
  }
  return parseConfig(line);
}

function parseVersion(line) {
  var version = line.split(':');
  return {
    type: nodeType.version,
    name: version[0].trim(),
    value: version[1].trim()
  }
}

function parseComment(line) {
  var re = /^\/\*\*(.+)\*\*\//;
  var comment = re.exec(line);
  return {
    type: nodeType.comment,
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
  if (['Movie Bitstream Algorithm', 'Charge from USB Host'].indexOf(name) > -1) {
    // WORKAROUND
    description = description +', ' + valuesArr.shift();
  }
  if (['Exposure Value', 'Contrast', 'Saturation', 'Sharpness'].indexOf(name) > -1) {
    // WORKAROUND
    return result = {
      type: nodeType.config,
      name: name,
      value: keyVal[2],
      description: keyVal[3],
      options: []
    }
  }
  var options = [];
  valuesArr.forEach(function(item) {
    if (name === 'Date time') {
      // WORKAROUND
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
    type: nodeType.config,
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
    result.push(parseLine(line.trim()));
  })
  return result;
}

module.exports = {
  parse: parse
}
