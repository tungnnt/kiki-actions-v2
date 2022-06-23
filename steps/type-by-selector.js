const validator = require("validator");
const { STEP_TYPE } = require("../const/step-config");

module.exports = async ({ page, options }) => {
  if (!validator.equals(options?.type, STEP_TYPE["TYPE_BY_SELECTOR"]))
    throw new Error("TYPE_SELECTOR.STEP_TYPE.INVALID");

  const elements = await page.$$(options?.selector);

  if (
    !(
      typeof options?.ignoreIfNotFound === "boolean" ||
      validator.isIn(options?.ignoreIfNotFound, Object.values(BOOLEAN_ENUMS))
    )
  )
    throw new Error("TYPE_SELECTOR.IGNORE_CONFIG.INVALID");

  if (!Array.isArray(elements) || elements.length === 0) {
    if (
      options.ignoreIfNotFound === true ||
      validator.equals(options?.ignoreIfNotFound, BOOLEAN_ENUMS["TRUE"])
    )
      return;
    throw new Error("TYPE_SELECTOR.ELEMENT.NOT_FOUND");
  }

  if (!validator.isInt(options?.elementIndex))
    throw new Error("TYPE_SELECTOR.ELEMENT_INDEX.INVALID");

  let elementIndex = parseInt(options.elementIndex - 1);

  elementIndex = elementIndex < 0 ? 0 : elementIndex;

  elementIndex =
    elementIndex > elements.length - 1 ? elements.length - 1 : elementIndex;

  if (typeof options?.content !== "string")
    throw new Error("TYPE_SELECTOR.CONTENT.INVALID");

  if (!validator.isInt(options?.typingDelay))
    throw new Error("TYPE_SELECTOR.TYPING_DELAY.INVALID");

  await elements[elementIndex].type(`${options.content}`, {
    delay: parseInt(options.typingDelay),
  });
};
