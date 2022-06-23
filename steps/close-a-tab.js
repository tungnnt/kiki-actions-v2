const { STEP_TYPE, DELAY_AFTER_HANDLE_TAB } = require("../const/step-config");
const validator = require("validator");
const delayForTime = require("../helpers/delay-for-time");

module.exports = async ({ browser, options }) => {
  if (!validator.equals(options?.type, STEP_TYPE["CLOSE_A_TAB"]))
    throw new Error("CLOSE_TAB.STEP_TYPE.INVALID");

  let tabIndex = options?.tabIndex;

  if (!validator.isInt(tabIndex))
    throw new Error("CLOSE_TAB.TAB_INDEX.INVALID");

  tabIndex = parseInt(tabIndex, 10);

  let pages = await browser.pages();

  if (tabIndex < 1 || tabIndex > pages?.length)
    throw new Error("CLOSE_TAB.TAB.NOT_FOUND");

  await pages[tabIndex - 1].close();

  await delayForTime(DELAY_AFTER_HANDLE_TAB);

  pages = await browser.pages();

  return pages[pages.length - 1];
};
