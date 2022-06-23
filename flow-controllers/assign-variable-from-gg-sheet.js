const validator = require("validator");
const { STEP_TYPE, VARIABLE_TYPE } = require("../const/step-config");
const { GoogleSpreadsheet } = require("google-spreadsheet");

const GG_SHEET_API_KEY = "AIzaSyD2J752IOibZm76riUclWFpkOhJM5GJoYc";

module.exports = async ({ options }) => {
  if (
    !validator.equals(options?.type, STEP_TYPE["ASSIGN_VARIABLE_FROM_GG_SHEET"])
  )
    throw new Error("GG_SHEET_VARIABLE.STEP_TYPE.INVALID");

  if (
    typeof options?.variableName !== "string" ||
    options.variableName?.length === 0
  )
    throw new Error("GG_SHEET_VARIABLE.VARIABLE_NAME.INVALID");

  if (
    !validator.isInt(options?.fromRowIndex) ||
    !validator.isInt(options?.toRowIndex)
  )
    throw new Error("GG_SHEET_VARIABLE.ROW.INVALID");

  if (!validator.isInt(options?.columnIndex))
    throw new Error("GG_SHEET_VARIABLE.COLUMN.INVALID");

  if (!validator.isInt(options?.sheetIndex))
    throw new Error("GG_SHEET_VARIABLE.SHEET.INVALID");

  try {
    const doc = new GoogleSpreadsheet(options?.sheetID);

    doc.useApiKey(GG_SHEET_API_KEY);

    await doc.loadInfo();

    const sheet = doc.sheetsByIndex?.[options.sheetIndex - 1];

    const rows = await sheet?.getRows();

    const rowContents = rows
      .filter((r) => Array.isArray(r._rawData) && r._rawData.length > 0)
      .map((r) => r._rawData[options.columnIndex - 1]?.trim())
      .slice(options.fromRowIndex - 1, options.toRowIndex)
      .filter((value) => value);

    return {
      variableName,
      value: rowContents,
      variableType: VARIABLE_TYPE["GOOGLE_SHEET"],
    };
  } catch (error) {
    throw new Error(`GG_SHEET_VARIABLE.VALUE.${error.message}`);
  }
};

// setImmediate(async () => {
//   test({
//     page: 1,
//     options: {
//       type: STEP_TYPE["ASSIGN_VARIABLE_FROM_GG_SHEET"],
//       variableName: "links",
//       fromRowIndex: "1",
//       toRowIndex: "5",
//       columnIndex: "2",
//       sheetIndex: "2",
//       sheetID: "1-WAHw2tvnln9uTZGvb3u8TGmWeCi0sDwbHbDjFqjhI4",
//     },
//   });
// });
