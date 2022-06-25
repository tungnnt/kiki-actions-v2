const puppeteer = require("puppeteer");
const child_process = require("child_process");
const { waitForDebugger } = require("./helpers/wait-for-chrome-debugger");
const { STEP_TYPE } = require("./const/step-config");
const STEPS = require("./steps");

let currentPage;
let scriptVariables = {};
let variableConfig;

setImmediate(async () => {
  const userDataDir = `${__dirname}/profile`;
  const browser = await _initBrowserViaExecutionPath({
    userDataDir,
  });

  const blocks = require("./scripts/script-01.json");

  currentPage = await browser.newPage();

  for (const block of blocks) {
    for (const section of block.sections) {
      for (const step of section.steps) {
        await _handleStep({
          browser,
          page: currentPage,
          options: step.options,
        });
      }
    }
  }
});

const _handleStep = async ({ browser, page, options }) => {
  switch (options.type) {
    case STEP_TYPE["OPEN_A_NEW_TAB"]:
      currentPage = await STEPS.openNewTab({
        browser,
        options,
      });
      break;

    case STEP_TYPE["SWICTH_TAB"]:
      currentPage = await STEPS.switchTab({
        browser,
        options,
      });
      break;

    case STEP_TYPE["VISIT_AN_URL"]:
      await STEPS.visitAnURL({
        page,
        options,
      });
      break;

    case STEP_TYPE["RELOAD_TAB"]:
      await STEPS.reloadTab({
        page,
        options,
      });
      break;

    case STEP_TYPE["CLOSE_A_TAB"]:
      currentPage = await STEPS.closeCurrentTab({
        browser,
        options,
      });
      break;

    case STEP_TYPE["SCROLL_BY_PIXEL"]:
      await STEPS.scrollByPixel({
        page,
        options,
      });
      break;

    case STEP_TYPE["WAIT_FOR_DURATION"]:
      await STEPS.waitForDuration({
        page,
        options,
      });
      break;

    case STEP_TYPE["SCROLL_BY_XPATH"]:
      await STEPS.scrollByXpath({
        page,
        options,
      });
      break;

    case STEP_TYPE["SCROLL_BY_SELECTOR"]:
      await STEPS.scrollBySelector({
        page,
        options,
      });
      break;

    case STEP_TYPE["TYPE_BY_XPATH"]:
      await STEPS.typeByXpath({
        page,
        options,
      });
      break;

    case STEP_TYPE["TYPE_BY_SELECTOR"]:
      await STEPS.typeBySelector({
        page,
        options,
      });
      break;

    case STEP_TYPE["PRESS_KEYBOARD"]:
      await STEPS.pressKeyboard({
        page,
        options,
      });
      break;

    case STEP_TYPE["CLICK_BY_XPATH"]:
      await STEPS.clickByXpath({
        page,
        options,
      });
      break;

    case STEP_TYPE["ASSIGN_VARIABLE_FROM_ELEMENT_TEXT_BY_XPATH"]:
      variableConfig = await STEPS.assignVariableFromElementTextByXpath({
        page,
        options,
      });

      scriptVariables[`${variableConfig.variableName}`] = variableConfig.value;

      console.log({ scriptVariables });

      break;

    case STEP_TYPE["ASSIGN_VARIABLE_FROM_ELEMENT_TEXT_BY_SELECTOR"]:
      variableConfig = await STEPS.assignVariableFromElementTextBySelector({
        page,
        options,
      });

      scriptVariables[`${variableConfig.variableName}`] = variableConfig.value;

      console.log({ scriptVariables });

      break;

    case STEP_TYPE["ASSIGN_VARIABLE_FROM_GG_SHEET"]:
      variableConfig = await STEPS.assignVariableFromGoogleSheet({
        options,
      });

      scriptVariables[`${variableConfig.variableName}`] = variableConfig.value;

      console.log({ scriptVariables });

      break;

    case STEP_TYPE["IF_ELSE_CONDITION"]:
      const compareResponse = await STEPS.compareCondition({
        options: { ...scriptVariables, ...options },
      });

      if (compareResponse.isSatisfied) {
        console.log("Condition is satisfied");
        for (const step of compareResponse.stepsIfSatisfyCondition) {
          await _handleStep({
            browser,
            page: currentPage,
            options: step.options,
          });
        }
      } else {
        console.log("Condition is not satisfied");
        for (const step of compareResponse.stepsIfSatisfyCondition) {
          await _handleStep({
            browser,
            page: currentPage,
            options: step.options,
          });
        }
      }

      break;

    default:
      break;
  }
};

const _initBrowserViaExecutionPath = async ({ userDataDir }) => {
  const debugPort = Math.floor(Math.random() * 10000) + 30000;
  const puppeteerArguments = [
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${userDataDir}`,
  ];
  const executablePath =
    '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
  child_process.spawn(
    `${executablePath} ${puppeteerArguments.join(" ")}`,
    [],
    {
      shell: true,
    },
    () => {}
  );
  const webSocketDebuggerUrl = await waitForDebugger(debugPort);
  return puppeteer.connect({
    browserWSEndpoint: webSocketDebuggerUrl,
    defaultViewport: null,
  });
};
