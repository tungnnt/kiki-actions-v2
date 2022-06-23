const {
  BROWSER_MAX_TABS_OPEN_AMOUNT,
  STEP_TYPE,
  DELAY_AFTER_HANDLE_TAB,
} = require("../const/step-config");
const validator = require("validator");
const delayForTime = require("../helpers/delay-for-time");

module.exports = async ({ browser, options }) => {
  if (!validator?.equals(options?.type, STEP_TYPE["OPEN_A_NEW_TAB"]))
    throw new Error("OPEN_TAB.STEP_TYPE.INVALID");

  const pages = await browser.pages();

  if (pages?.length >= BROWSER_MAX_TABS_OPEN_AMOUNT)
    throw new Error("OPEN_TAB.TAB_AMOUNT.EXCEED_ACCEPTED");

  const page = await browser.newPage();

  await delayForTime(DELAY_AFTER_HANDLE_TAB);

  return page;
};
