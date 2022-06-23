const validator = require("validator");
const {
  STEP_VISIT_WEBSITE_WAIT_CONDITION,
  STEP_TYPE,
} = require("../const/step-config");

module.exports = async ({ page, options }) => {
  if (!validator.equals(options?.type, STEP_TYPE["VISIT_AN_URL"]))
    throw new Error("VISIT_WEBSITE.STEP_TYPE.INVALID");

  if (!validator.isURL(options?.url))
    throw new Error("VISIT_WEBSITE.URL.INVALID");

  if (!validator.isInt(options?.timeOut))
    throw new Error("VISIT_WEBSITE.TIME_OUT.INVALID");

  if (
    !validator.isIn(options?.waitCondition, STEP_VISIT_WEBSITE_WAIT_CONDITION)
  )
    throw new Error("VISIT_WEBSITE.WAIT_CONDITION.INVALID");

  await page.goto(options?.url, {
    timeout: parseInt(options.timeOut),
    waitUntil: options.waitCondition,
  });
};
