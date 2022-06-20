const validator = require("validator");
const { STEP_TYPE, STEP_WAIT_FOR_DISPLAY } = require("../const/step-config");

module.exports = async ({ page, options }) => {
  if (!validator.equals(options?.type, STEP_TYPE["WAIT_FOR_XPATH"]))
    throw new Error("WAIT_FOR.STEP_TYPE.INVALID");

  if (!validator.isIn(options?.display, Object.values(STEP_WAIT_FOR_DISPLAY)))
    throw new Error("WAIT_FOR.DISPLAY.INVALID");

  if (!validator.isInt(options?.timeOut))
    throw new Error("WAIT_FOR.TIMEOUT.INVALID");

  if (options.display === STEP_WAIT_FOR_DISPLAY["VISIBLE"])
    await page.waitForXPath(options?.xpath, {
      visible: true,
      timeout: parseInt(options.timeOut),
    });
  else
    await page.waitForXPath(options?.xpath, {
      hidden: true,
      timeout: parseInt(options.timeOut),
    });
};
