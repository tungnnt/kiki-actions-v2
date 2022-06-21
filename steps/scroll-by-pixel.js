const validator = require("validator");
const { STEP_TYPE, STEP_SCROLL_DIRECTION } = require("../const/step-config");
const randomInRange = require("random-number-in-range");

module.exports = async ({ page, options }) => {
  if (!validator.equals(options?.type, STEP_TYPE["SCROLL_BY_PIXEL"]))
    throw new Error("SCROLL_PIXEL.STEP_TYPE.INVALID");

  if (!validator.isIn(options?.direction, Object.values(STEP_SCROLL_DIRECTION)))
    throw new Error("SCROLL_PIXEL.DIRECTION.INVALID");

  if (
    !validator.isInt(options?.minDistance) ||
    parseInt(options.minDistance) < 0
  )
    throw new Error("SCROLL_PIXEL.DISTANCE.INVALID");

  if (
    !validator.isInt(options?.maxDistance) ||
    parseInt(options.maxDistance) < 0
  )
    throw new Error("SCROLL_PIXEL.DISTANCE.INVALID");

  const minDistance = parseInt(options.minDistance),
    maxDistance = parseInt(options.maxDistance);

  if (minDistance > maxDistance)
    throw new Error("SCROLL_PIXEL.DISTANCE.INVALID");

  let distance = randomInRange(minDistance, maxDistance);

  distance =
    options.direction === STEP_SCROLL_DIRECTION["UP"] ? distance : -distance;

  await page.evaluate((_distance) => {
    window.scrollBy({
      top: _distance,
      left: 0,
      behavior: "smooth",
    });
  }, distance);
};
