const validator = require("validator");
const {
  STEP_VISIT_WEBSITE_WAIT_CONDITION,
  STEP_TYPE,
} = require("../const/step-config");

module.exports = async ({ page, options }) => {
  if (!validator.equals(options?.type, STEP_TYPE["RELOAD_TAB"]))
    throw new Error("RELOAD_TAB.STEP_TYPE.INVALID");

  if (!validator.isInt(options?.timeOut))
    throw new Error("RELOAD_TAB.TIME_OUT.INVALID");

  if (
    !validator.isIn(options?.waitCondition, STEP_VISIT_WEBSITE_WAIT_CONDITION)
  )
    throw new Error("RELOAD_TAB.WAIT_CONDITION.INVALID");

  await page.reload({
    timeout: parseInt(options.timeOut),
    waitUntil: options.waitCondition,
  });
};
