const axios = require("axios");
async function waitForDebugger(port) {
  for (let i = 1; i < 15; i++) {
    try {
      const response = await axios.get(`http://localhost:${port}/json/version`);
      const { webSocketDebuggerUrl } = response.data;
      if (webSocketDebuggerUrl) {
        return webSocketDebuggerUrl;
      }
    } catch (e) {}
    await sleep(500);
  }
  throw new Error("ERROR: Failed to connect to profile");
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
module.exports = {
  waitForDebugger,
};
