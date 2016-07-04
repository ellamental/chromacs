
var ENABLED = false;

Chromacs = window.Chromacs || {}


Chromacs.Commands = (function (Commands, undefined) {
  var LINE = 10;

  Commands.scroll_down = function () {
    scrollBy(0, LINE);
  };

  Commands.scroll_up = function () {
    scrollBy(0, -LINE);
  };

  Commands.close_tab = function () {
    chrome.tabs.remove(chrome.tabs.getCurrent());
  };

  return Commands
})(Chromacs.Commands || {});


Chromacs.Bindings = (function( Bindings, undefined) {

  CTRL = 'macctrl';

  Bindings.CHAR_CODES_TO_CHAR_LOWER = {
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
    126: '~'
  };

  Bindings.bindings = {
    'ctrl-n': {
      'command': Chromacs.Commands.scroll_down,
      'help': 'Scroll page down one line.',
    },
    'ctrl-p': {
      'command': Chromacs.Commands.scroll_up,
      'help': 'Scroll page up one line.',
    },
    'macctrl-w': {
      'command': Chromacs.Commands.close_tab,
      'help': 'Close current tab',
    }
  };

  function get_key(e) {
    var input = '';
    if (e.shiftKey) { input += 'shift-'; }
    if (e.ctrlKey) { input += CTRL + '-'; }
    if (e.altKey) { input += 'alt-'; }
    console.log(e);
    console.log('keycode: ' + e.keyCode);
    input += Bindings.CHAR_CODES_TO_CHAR_LOWER[e.keyCode];
    return input;
  }

  // TODO(nick): There's multiple bugs with this implementation
  //   1) Keypresses are captured within input fields as well.  This means that
  //      bindings that don't use a modifier key, effectively disable the
  //      bound key.
  //   2) Control+n, and other Chrome bindings don't work and can't be bound.
  //      There needs to be a workaround for this, though I'm not sure what it
  //      is yet.
  //   3) Certain actions are unavailable (like chrome.tabs.remove()).  I
  //      believe that ContentScripts do not have access to certain Chrome
  //      apis and must use a work-around such as sending a message to a
  //      command that is run in a background script.
  //   4) I haven't tested, but this might interfere with system default
  //      bindings, like the emacs-style bindings present in OS X, using the
  //      command key (command+f -> move cursor forward, etc.).  The best
  //      implementation here would be to make overriding system defaults
  //      configurable.  My use-case is to deliberately stop myself from using
  //      the muscle-memory that has caused RSI.
  if (ENABLED) {
    document.addEventListener('keydown', function(e) {
      keypress = get_key(e);
      console.log('Keypress: ' + keypress);
      binding = Bindings.bindings[keypress];
      if (binding) {
        console.log(keypress + ' is bound!');
        binding.command();
        e.preventDefault();
        e.stopPropagation();
      };
    }, true);
  }

  return Bindings;
}(Chromacs.Bindings || {}));
