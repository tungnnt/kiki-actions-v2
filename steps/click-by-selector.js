const validator = require("validator");
const { STEP_TYPE, STEP_CLICK_MOUSE_BUTTON } = require("../const/step-config");
const randomInRange = require("random-number-in-range");

module.exports = async ({ page, options }) => {
  if (!validator.equals(options?.type, STEP_TYPE["CLICK_BY_SELECTOR"]))
    throw new Error("CLICK_SELECTOR.STEP_TYPE.INVALID");

  const elements = await page.$$(options?.selector);

  if (typeof options?.ignoreIfNotFound !== "boolean")
    throw new Error("CLICK_SELECTOR.IGNORE_CONFIG.INVALID");

  if (!Array.isArray(elements) || elements.length === 0) {
    if (options.ignoreIfNotFound === true) return;
    throw new Error("CLICK_SELECTOR.ELEMENT.NOT_FOUND");
  }

  if (!validator.isInt(options?.elementIndex))
    throw new Error("CLICK_SELECTOR.ELEMENT_INDEX.INVALID");

  let elementIndex = parseInt(options.elementIndex - 1);

  elementIndex = elementIndex < 0 ? 0 : elementIndex;

  elementIndex =
    elementIndex > elements.length - 1 ? elements.length - 1 : elementIndex;

  if (!validator.isIn(options?.mouseButton, STEP_CLICK_MOUSE_BUTTON))
    throw new Error("CLICK_SELECTOR.MOUSE_BUTTON.INVALID");

  if (!validator.isInt(options?.clickCount))
    throw new Error("CLICK_SELECTOR.CLICK_COUNT.INVALID");

  if (!validator.isInt(options?.clickDelay))
    throw new Error("CLICK_SELECTOR.CLICK_DELAY.INVALID");

  const element = elements[elementIndex];

  const elementBoundingBox = await element.boundingBox();

  await element.click({
    button: options.mouseButton,
    clickCount: parseInt(options.clickCount),
    delay: parseInt(options.clickDelay),
    offset: {
      x: randomInRange(
        elementBoundingBox.x,
        elementBoundingBox.x + elementBoundingBox.width
      ),
      y: randomInRange(
        elementBoundingBox.y,
        elementBoundingBox.y + elementBoundingBox.height
      ),
    },
  });
};
