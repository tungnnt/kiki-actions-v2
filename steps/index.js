const clickBySelector = require("./click-by-selector");
const clickByXpath = require("./click-by-xpath");

const scrollByPixel = require("./scroll-by-pixel");
const scrollByXpath = require("./scroll-by-xpath");
const scrollBySelector = require("./scroll-by-selector");

const openNewTab = require("./open-a-new-tab");
const closeCurrentTab = require("./close-a-tab");
const switchTab = require("./switch-to-another-tab");
const reloadTab = require("./reload-tab");
const visitAnURL = require("./visit-an-url");

const typeBySelector = require("./type-by-selector");
const typeByXpath = require("./type-by-xpath");
const pressKeyboard = require("./press-keyboard");

const waitForXpath = require("./wait-for-xpath");
const waitForSelector = require("./wait-for-selector");
const waitForDuration = require("./wait-for-a-duration");

const assignVariableFromElementTextByXpath = require("../flow-controllers/assign-variable-from-element-text-by-xpath");
const assignVariableFromElementTextBySelector = require("../flow-controllers/assign-variable-from-element-text-by-selector");
const assignVariableFromGoogleSheet = require("../flow-controllers/assign-variable-from-gg-sheet");

const compareCondition = require("../flow-controllers/if-else-condition");

module.exports = {
  clickBySelector,
  clickByXpath,
  scrollByPixel,
  scrollByXpath,
  scrollBySelector,
  openNewTab,
  closeCurrentTab,
  switchTab,
  reloadTab,
  typeBySelector,
  typeByXpath,
  pressKeyboard,
  waitForXpath,
  waitForSelector,
  waitForDuration,
  visitAnURL,
  assignVariableFromElementTextByXpath,
  assignVariableFromElementTextBySelector,
  assignVariableFromGoogleSheet,
  compareCondition,
};
