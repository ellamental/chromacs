CHAR_CODES_TO_CHAR_LOWER = {
  32: ' ',
  33: '!',
  34: '"',
  35: '#',
  36: '$',
  37: '%',
  38: '&',
  39: '\'',
  40: '(',
  41: ')',
  42: '*',
  43: '+',
  44: ',',
  45: '-',
  46: '.',
  47: '/',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  58: ':',
  59: ';',
  60: '<',
  61: '=',
  62: '>',
  63: '?',
  64: '@',
  65: 'a',
  66: 'b',
  67: 'c',
  68: 'd',
  69: 'e',
  70: 'f',
  71: 'g',
  72: 'h',
  73: 'i',
  74: 'j',
  75: 'k',
  76: 'l',
  77: 'm',
  78: 'n',
  79: 'o',
  80: 'p',
  81: 'q',
  82: 'r',
  83: 's',
  84: 't',
  85: 'u',
  86: 'v',
  87: 'w',
  88: 'x',
  89: 'y',
  90: 'z',
  91: '[',
  92: '\\',
  93: ']',
  94: '^',
  95: '_',
  96: '`',
  97: 'a',
  98: 'b',
  99: 'c',
  100: 'd',
  101: 'e',
  102: 'f',
  103: 'g',
  104: 'h',
  105: 'i',
  106: 'j',
  107: 'k',
  108: 'l',
  109: 'm',
  110: 'n',
  111: 'o',
  112: 'p',
  113: 'q',
  114: 'r',
  115: 's',
  116: 't',
  117: 'u',
  118: 'v',
  119: 'w',
  120: 'x',
  121: 'y',
  122: 'z',
  123: '{',
  124: '|',
  125: '}',
  126: '~',
  188: ',',
  190: '.',
};


function chromacs_get_key(e) {
  var input = '';
  if (e.shiftKey) { input += 'shift-'; }
  if (e.ctrlKey) { input += 'ctrl-'; }
  if (e.altKey) { input += 'alt-'; }
  // console.log(e);
  // console.log('keycode: ' + e.keyCode);
  input += CHAR_CODES_TO_CHAR_LOWER[e.keyCode];
  return input;
}


document.addEventListener('keydown', function(e) {
  keypress = chromacs_get_key(e);
  if (keypress == 'ctrl-y') {
    console.log('keypress ctrl-y recognized');
    chrome.runtime.sendMessage({greeting: "Hello"}, function(response) {
      console.log('sendMessage response: ', response);
    });
    e.preventDefault();
    e.stopPropagation();
  };
}, true);

