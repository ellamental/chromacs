
// Generates the key code map used by the bindings/keydown event listener.
var generate_char_codes_string = function (start, end) {
  start = start || 32;
  end = end || 127;

  s = '  var CHAR_CODES_TO_CHAR_LOWER = {\n'
  for (var i=start; i<end; i++) {
    var c = String.fromCharCode(i).toLowerCase();
    if (c === "'") { c = "\\'"; }
    if (c === '\\') { c = "\\\\"; }
    s += '    ' + i + ": '" + c + "',\n";
  }
  s += '  }';
  return s;
};
console.log(generate_char_codes_string(32, 1000));
