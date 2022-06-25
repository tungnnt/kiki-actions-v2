const validator = require("validator");
const {
  STEP_TYPE,
  VARIABLE_TYPE,
  BOOLEAN_ENUMS,
} = require("../const/step-config");

module.exports = async ({ page, options }) => {
  if (
    typeof options?.variableName !== "string" ||
    options.variableName?.length === 0
  )
    throw new Error("ELEMENT_TEXT_VARIABLE.VARIABLE_NAME.INVALID");

  if (
    !validator.equals(
      options?.type,
      STEP_TYPE["ASSIGN_VARIABLE_FROM_ELEMENT_TEXT_BY_XPATH"]
    )
  )
    throw new Error("ELEMENT_TEXT_VARIABLE.STEP_TYPE.INVALID");

  const elements = await page.$x(options?.xpath);

  if (
    !(
      typeof options?.ignoreIfNotFound === "boolean" ||
      validator.isIn(options?.ignoreIfNotFound, Object.values(BOOLEAN_ENUMS))
    )
  )
    throw new Error("ELEMENT_TEXT_VARIABLE.IGNORE_CONFIG.INVALID");

  if (!Array.isArray(elements) || elements.length === 0) {
    if (
      options.ignoreIfNotFound === true ||
      validator.equals(options?.ignoreIfNotFound, BOOLEAN_ENUMS["TRUE"])
    )
      return;
    throw new Error("ELEMENT_TEXT_VARIABLE.ELEMENT.NOT_FOUND");
  }

  if (!validator.isInt(options?.elementIndex))
    throw new Error("ELEMENT_TEXT_VARIABLE.ELEMENT_INDEX.INVALID");

  let elementIndex = parseInt(options.elementIndex - 1);

  elementIndex = elementIndex < 0 ? 0 : elementIndex;

  elementIndex =
    elementIndex > elements.length - 1 ? elements.length - 1 : elementIndex;

  const elementText = await (
    await elements[elementIndex].getProperty("textContent")
  ).jsonValue();

  return {
    variableName: options.variableName,
    value: elementText,
    variableType: VARIABLE_TYPE["ELEMENT_TEXT"],
    isArray: false,
  };
};
