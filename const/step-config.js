const BROWSER_MAX_TABS_OPEN_AMOUNT = 10;
const BROWSER_MIN_TABS_OPEN_AMOUNT = 1;

const STEP_VISIT_WEBSITE_WAIT_CONDITION = [
  "load",
  "domcontentloaded",
  "networkidle0",
  "networkidle2",
];

const STEP_WAIT_FOR_DISPLAY = { VISIBLE: "visible", HIDDEN: "hidden" };

const STEP_CLICK_MOUSE_BUTTON = ["left", "right", "middle", "back", "forward"];

const STEP_SCROLL_DIRECTION = { UP: "up", DOWN: "down" };

const KEY_DEFINITION = require("./key");

const STEP_TYPE = {
  VISIT_AN_URL: "visit-an-url",
  OPEN_A_NEW_TAB: "open-a-new-tab",
  CLOSE_A_CURRENT_TAB: "close-a-current-tab",
  RELOAD_TAB: "reload-tab",
  SWICTH_TAB: "switch-tab",
  WAIT_FOR_SELECTOR: "wait-for-selector",
  WAIT_FOR_XPATH: "wait-for-xpath",
  WAIT_FOR_DURATION: "wait-for-duration",
  CLICK_BY_XPATH: "click-by-xpath",
  CLICK_BY_SELECTOR: "click-by-selector",
  TYPE_BY_SELECTOR: "type-by-selector",
  TYPE_BY_XPATH: "type-by-xpath",
  SCROLL_BY_XPATH: "scroll-by-xpath",
  SCROLL_BY_SELECTOR: "scroll-by-selector",
  SCROLL_BY_PIXEL: "scroll-by-pixel",
  PRESS_KEYBOARD: "press-keyboard",
};

module.exports = {
  BROWSER_MAX_TABS_OPEN_AMOUNT,
  BROWSER_MIN_TABS_OPEN_AMOUNT,
  STEP_VISIT_WEBSITE_WAIT_CONDITION,
  STEP_TYPE,
  STEP_WAIT_FOR_DISPLAY,
  STEP_SCROLL_DIRECTION,
  STEP_CLICK_MOUSE_BUTTON,
  KEY_DEFINITION,
};
