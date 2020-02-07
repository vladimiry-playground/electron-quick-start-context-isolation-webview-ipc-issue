(() => {
  const {ipcRenderer} = require("electron");
  const channel = "querySelectorAllStarCount";

  ipcRenderer.on(channel, () => {
    const args = [
      {
        payload: {
          value: document.querySelectorAll("*").length,
        },
      },
    ];

    ipcRenderer.sendToHost(channel, ...args);
  });
})();
