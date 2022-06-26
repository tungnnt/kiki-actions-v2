const validator = require("validator");
const { STEP_TYPE, VARIABLE_TYPE } = require("../const/step-config");

module.exports = async ({ options }) => {
  if (
    !validator.equals(
      options?.type,
      STEP_TYPE["ASSIGN_VARIABLE_FROM_MANUAL_TEXT"]
    )
  )
    throw new Error("MANUAL_TEXT_VARIABLE.STEP_TYPE.INVALID");

  if (
    typeof options?.variableName !== "string" ||
    options.variableName?.length === 0
  )
    throw new Error("MANUAL_TEXT_VARIABLE.VARIABLE_NAME.INVALID");

  if (
    !Array.isArray(options?.value) ||
    options.value.length === 0 ||
    options.value.some((e) => typeof e !== "string")
  )
    throw new Error("MANUAL_TEXT_VARIABLE.VALUE.INVALID");

  const variableValues = options.value;

  return {
    variableName: options.variableName,
    value: variableValues.length > 1 ? variableValues : variableValues[0],
    variableType: VARIABLE_TYPE["MANUAL_TEXT"],
    isArray: variableValues.length > 1 ? true : false,
  };
};
