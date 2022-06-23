const validator = require("validator");
const {
  STEP_TYPE,
  STEP_CLICK_MOUSE_BUTTON,
  BOOLEAN_ENUMS,
} = require("../const/step-config");
const randomInRange = require("random-number-in-range");

module.exports = async ({ page, options }) => {
  if (!validator.equals(options?.type, STEP_TYPE["CLICK_BY_XPATH"]))
    throw new Error("CLICK_XPATH.STEP_TYPE.INVALID");

  const elements = await page.$x(options?.xpath);

  if (
    !(
      typeof options?.ignoreIfNotFound === "boolean" ||
      validator.isIn(options?.ignoreIfNotFound, Object.values(BOOLEAN_ENUMS))
    )
  )
    throw new Error("CLICK_XPATH.IGNORE_CONFIG.INVALID");

  if (!Array.isArray(elements) || elements.length === 0) {
    if (
      options.ignoreIfNotFound === true ||
      validator.equals(options?.ignoreIfNotFound, BOOLEAN_ENUMS["TRUE"])
    )
      return;
    throw new Error("CLICK_XPATH.ELEMENT.NOT_FOUND");
  }

  if (!validator.isInt(options?.elementIndex))
    throw new Error("CLICK_XPATH.ELEMENT_INDEX.INVALID");

  let elementIndex = parseInt(options.elementIndex - 1);

  elementIndex = Math.min(elementIndex, 0);
  elementIndex = Math.max(elementIndex, elements.length - 1);

  if (!validator.isIn(options?.mouseButton, STEP_CLICK_MOUSE_BUTTON))
    throw new Error("CLICK_XPATH.MOUSE_BUTTON.INVALID");

  if (!validator.isInt(options?.clickCount))
    throw new Error("CLICK_XPATH.CLICK_COUNT.INVALID");

  if (!validator.isInt(options?.clickDelay))
    throw new Error("CLICK_XPATH.CLICK_DELAY.INVALID");

  const element = elements[elementIndex];

  const elementBoundingBox = await element.boundingBox();

  await element.click({
    button: options.mouseButton,
    clickCount: parseInt(options.clickCount),
    delay: parseInt(options.clickDelay),
    offset: {
      x: randomInRange(0, elementBoundingBox.width),
      y: randomInRange(0, elementBoundingBox.height),
    },
  });
};
