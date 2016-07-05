
function chromacs_next_tab() {
  chrome.tabs.query({active: true}, function (active_tabs) {
    var current = active_tabs[0];
    chrome.windows.getLastFocused(
      {populate: true},
      function (window) {
        var next_index = current.index + 1;
        if (next_index >= window.tabs.length) {
          next_index = 0;
        }
        chrome.tabs.update(window.tabs[next_index].id, {active: true});
      });
  });
}


function chromacs_prev_tab() {
  chrome.tabs.query({active: true}, function (active_tabs) {
    var current = active_tabs[0];
    chrome.windows.getLastFocused(
      {populate: true},
      function (window) {
        console.log('current.index: ', current.index);
        var prev_index = current.index - 1;
        console.log('prev_index: ', prev_index);
        if (prev_index < 0) {
          prev_index = window.tabs.length - 1;
        }
        chrome.tabs.update(window.tabs[prev_index].id, {active: true});
      });
  });
}


function chromacs_close_tab() {
  chrome.tabs.query({active: true}, function (active_tabs) {
    console.log('active_tabs: ', active_tabs)
    var current = active_tabs[0];
    chrome.tabs.remove(current.id);
  });
}


// TODO(nick): Still not sure how to get the find bar.
//
// function chromacs_open_find() {
//   chrome.windows.getLastFocused(
//     {populate: true},
//     function (window) {
//       console.log('window: ', window);
//       console.log('window.gFindBar: ', window.gFindBar);
//     }
//   );
// }


chrome.commands.onCommand.addListener(function (command) {
  if (command === 'prev-tab') {
    chromacs_prev_tab();
  }
  else if (command === 'next-tab') {
    chromacs_next_tab();
  }
  else if (command === 'close-tab') {
    chromacs_close_tab();
  }
  // else if (command === 'open-find') {
  //   chromacs_open_find();
  // }
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // console.log('sender: ', sender);
    // console.log();
    // console.log('request: ', request);
    // console.log();
    // console.log();
    if (request.greeting == "Hello") {
      console.log('request.greeting == hello: ', request.greeting);
      sendResponse('hello');
      // sendResponse({farewell: "goodbye"});
    }
  });
