import { config } from "../../../../config"
import { DefaultTemplateInput } from "../../../common"
import { ExportsTemplateValues } from "./generateTemplate"

export function getExportsTemplateValues(
  input: DefaultTemplateInput,
): ExportsTemplateValues {
  const useFullFeatureNames = config.general.useFullFeatureNames()

  let stateFileName = ""
  if (useFullFeatureNames) stateFileName += `${input.name.snake}_`
  stateFileName += "state.dart"

  const stateExport = `export 'models/${stateFileName}`

  return {
    stateExport: stateExport,
  }
}
