import { config } from "../../../../config"
import { DefaultTemplateInput, joinTargetPath } from "../../../common"

export function getStateTargetPath(input: DefaultTemplateInput): string {
  const useFullFeatureNames = config.general.useFullFeatureNames()

  let targetFile = ""
  if (useFullFeatureNames) targetFile += `${input.name.snake}_`
  targetFile += "state.dart"

  return joinTargetPath(input.targetDirectory, targetFile)
}
