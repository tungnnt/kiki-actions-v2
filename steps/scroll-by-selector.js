const validator = require("validator");
const { STEP_TYPE } = require("../const/step-config");
const { element2selector } = require("puppeteer-element2selector");

module.exports = async ({ page, options }) => {
  if (!validator.equals(options?.type, STEP_TYPE["SCROLL_BY_SELECTOR"]))
    throw new Error("SCROLL_SELECTOR.STEP_TYPE.INVALID");

  const elements = await page.$$(options?.xpath);

  if (typeof options?.ignoreIfNotFound !== "boolean")
    throw new Error("SCROLL_SELECTOR.IGNORE_CONFIG.INVALID");

  if (!Array.isArray(elements) || elements.length === 0) {
    if (options.ignoreIfNotFound === true) return;
    throw new Error("SCROLL_SELECTOR.ELEMENT.NOT_FOUND");
  }

  if (!validator.isInt(options?.elementIndex))
    throw new Error("SCROLL_SELECTOR.ELEMENT_INDEX.INVALID");

  let elementIndex = parseInt(options.elementIndex - 1);

  elementIndex = elementIndex < 0 ? 0 : elementIndex;

  elementIndex =
    elementIndex > elements.length - 1 ? elements.length - 1 : elementIndex;

  const elementSelector = await element2selector(elements[elementIndex]);

  await page.evaluate((_selector) => {
    document.querySelector(`${_selector}`).scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }, elementSelector);
};
