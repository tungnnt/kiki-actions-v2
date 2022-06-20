const {
  BROWSER_MAX_TABS_OPEN_AMOUNT,
  STEP_TYPE,
} = require("../const/step-config");
const validator = require("validator");

module.exports = async ({ browser, options }) => {
  if (!validator?.equals(options?.type, STEP_TYPE["OPEN_A_NEW_TAB"]))
    throw new Error("OPEN_TAB.STEP_TYPE.INVALID");

  const pages = await browser.pages();

  if (pages?.length >= BROWSER_MAX_TABS_OPEN_AMOUNT)
    throw new Error("OPEN_TAB.TAB_AMOUNT.EXCEED_ACCEPTED");

  await browser.newPage();
};
