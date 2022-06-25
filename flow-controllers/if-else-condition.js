const { STEP_TYPE, COMPARATOR } = require("../const/step-config");
const validator = require("validator");

module.exports = async ({ options }) => {
  if (!validator.equals(options?.type, STEP_TYPE["IF_ELSE_CONDITION"]))
    throw new Error("IF_ELSE_CONDITION.STEP_TYPE.INVALID");

  if (
    !Array.isArray(options?.stepsIfSatisfyCondition) ||
    !Array.isArray(options?.stepsIfNotSatisfyCondition)
  )
    throw new Error("IF_ELSE_CONDITION.STEPS.INVALID");

  if (
    typeof options?.variableName !== "string" ||
    options.variableName?.length === 0
  )
    throw new Error("IF_ELSE_CONDITION.VARIABLE_NAME.INVALID");

  const variableValue = options[`${options.variableName}`];

  if (typeof options?.compareValue !== "string")
    throw new Error("IF_ELSE_CONDITION.COMPARE_VALUE.INVALID");

  if (!validator.isIn(options?.comparator, Object.values(COMPARATOR)))
    throw new Error("IF_ELSE_CONDITION.COMPARATOR.INVALID");

  switch (options.comparator) {
    case COMPARATOR["EQUAL"]:
      return {
        isSatisfied: variableValue == options.compareValue,
        stepsIfSatisfyCondition: options.stepsIfSatisfyCondition,
        stepsIfNotSatisfyCondition: options.stepsIfNotSatisfyCondition,
      };

    case COMPARATOR["INCLUDE"]:
      return true;

    case COMPARATOR["NOT_INCLUDE"]:
      return true;

    default:
      break;
  }
};
