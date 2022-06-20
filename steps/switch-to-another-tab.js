const validator = require("validator");
const {
  BROWSER_MIN_TABS_OPEN_AMOUNT,
  BROWSER_MAX_TABS_OPEN_AMOUNT,
  STEP_TYPE,
} = require("../const/step-config");
const validator = require("validator");

module.exports = async ({ browser, options }) => {
  if (!validator.equals(options?.type, STEP_TYPE["SWICTH_TAB"]))
    throw new Error("SWITCH_TAB.STEP_TYPE.INVALID");

  let tabIndex = options?.tabIndex;

  if (!validator.isInt(tabIndex))
    throw new Error("SWITCH_TAB.TAB_INDEX.INVALID");

  tabIndex = parseInt(tabIndex, 10);

  if (
    tabIndex < BROWSER_MIN_TABS_OPEN_AMOUNT ||
    tabIndex > BROWSER_MAX_TABS_OPEN_AMOUNT
  )
    throw new Error("SWITCH_TAB.TAB_INDEX.OUT_OF_BOUND");

  const pages = await browser.pages();

  if (tabIndex > pages?.length) throw new Error("SWITCH_TAB.TAB.NOT_FOUND");

  await pages[tabIndex - 1].bringToFront();
};
