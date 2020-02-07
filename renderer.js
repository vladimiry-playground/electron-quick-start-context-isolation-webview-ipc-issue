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

webView.addEventListener("ipc-message", (event) => {
  const {channel, args: [arg1]} = event;

  document.body.appendChild(
    Object.assign(
      document.createElement("div"),
      {
        innerText: JSON.stringify({channel, arg1}),
      },
    ),
  );
});
