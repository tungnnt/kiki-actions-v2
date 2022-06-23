const validator = require("validator");
const {
  BROWSER_MIN_TABS_OPEN_AMOUNT,
  BROWSER_MAX_TABS_OPEN_AMOUNT,
  STEP_TYPE,
  DELAY_AFTER_HANDLE_TAB,
} = require("../const/step-config");
const delayForTime = require("../helpers/delay-for-time");

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

  await delayForTime(DELAY_AFTER_HANDLE_TAB);

  return pages[tabIndex - 1];
};
