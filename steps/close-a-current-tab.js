const {
  BROWSER_MIN_TABS_OPEN_AMOUNT,
  STEP_TYPE,
} = require("../const/step-config");
const validator = require("validator");

module.exports = async ({ page, options }) => {
  if (!validator.equals(options?.type, STEP_TYPE["CLOSE_A_CURRENT_TAB"]))
    throw new Error("CLOSE_TAB.STEP_TYPE.INVALID");

  const browser = await page.browser();

  if (!browser) throw new Error("CLOSE_TAB.BROWSER.NOT_FOUND");

  const pages = await browser.pages();

  if (pages?.length === BROWSER_MIN_TABS_OPEN_AMOUNT)
    throw new Error("CLOSE_TAB.TAB_AMOUNT.UNDER_ACCEPTED");

  if (!(await page.isClosed())) throw new Error("CLOSE_TAB.PAGE.NOT_EXIST");

  await page.close();
};
