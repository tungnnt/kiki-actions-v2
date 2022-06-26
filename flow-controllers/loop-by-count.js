const { STEP_TYPE } = require("../const/step-config");
const validator = require("validator");

module.exports = async ({ options }) => {
  if (!validator.equals(options?.type, STEP_TYPE["LOOP_BY_COUNT"]))
    throw new Error("LOOP_BY_COUNT.STEP_TYPE.INVALID");

  if (
    typeof options?.countVariableName !== "string" ||
    options.countVariableName?.length === 0
  )
    throw new Error("LOOP_BY_COUNT.COUNT_VARIABLE_NAME.INVALID");

  if (
    typeof options?.indexVariableName !== "string" ||
    options.indexVariableName?.length === 0
  )
    throw new Error("LOOP_BY_COUNT.INDEX_VARIABLE_NAME.INVALID");

  const loopCount = options[`${options.countVariableName}`];

  if (!validator.isInt(loopCount))
    throw new Error("LOOP_BY_COUNT.LOOP_COUNT.INVALID");

  if (!Array.isArray(options?.steps))
    throw new Error("LOOP_BY_COUNT.STEPS.INVALID");

  return {
    loopCount: parseInt(loopCount),
    indexVariableName: options.indexVariableName,
    steps: options.steps,
  };
};
