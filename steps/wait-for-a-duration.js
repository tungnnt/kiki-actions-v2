const validator = require("validator");
const { STEP_TYPE } = require("../const/step-config");
const randomInRange = require("random-number-in-range");

module.exports = async ({ page, options }) => {
  if (!validator.equals(options?.type, STEP_TYPE["WAIT_FOR_DURATION"]))
    throw new Error("WAIT_FOR.STEP_TYPE.INVALID");

  if (
    !validator.isInt(options?.minDuration) ||
    !validator.isInt(options?.maxDuration)
  )
    throw new Error("WAIT_FOR.DURATION.INVALID");

  const minDuration = parseInt(options.minDuration),
    maxDuration = parseInt(options.maxDuration);

  if (minDuration > maxDuration) throw new Error("WAIT_FOR.DURATION.INVALID");

  const duration = randomInRange(minDuration, maxDuration);

  await page.waitForTimeout(duration);
};
