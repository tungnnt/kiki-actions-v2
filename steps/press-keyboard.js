const validator = require("validator");
const { STEP_TYPE, KEY_DEFINITION } = require("../const/step-config");

module.exports = async ({ page, options }) => {
  if (!validator.equals(options?.type, STEP_TYPE["PRESS_KEYBOARD"]))
    throw new Error("PRESS_KEYBOARD.STEP_TYPE.INVALID");

  if (!validator.isIn(options?.key, Object.keys(KEY_DEFINITION)))
    throw new Error("PRESS_KEYBOARD.KEY.INVALID");

  await page.keyboard.press(options.key);
};
