// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const webView = document.querySelector("webview");

webView.addEventListener("dom-ready", () => {
  webView.openDevTools();
  webView.send("querySelectorAllStarCount");
});

webView.addEventListener("ipc-message", (eventFromWebView) => {
  console.log("ipc-message event", eventFromWebView);

  const errMessages = [];

  if (!("channel" in eventFromWebView)) {
    errMessages.push(`"event" doesn't have "channel" prop`);
  }
  if (!("args" in eventFromWebView)) {
    errMessages.push(`"event" doesn't have "args" prop`);
  }

  if (errMessages.length) {
    appendText(errMessages.join(" + "));
  } else {
    const {channel, args: [arg1]} = eventFromWebView;
    appendText(JSON.stringify({channel, arg1}));
  }
});

function appendText(text) {
  document.body.appendChild(
    Object.assign(
      document.createElement("div"),
      {
        innerText: text,
      },
    ),
  );
}
