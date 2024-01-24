import { config } from "../../../../config"
import { DefaultTemplateInput, joinTargetPath } from "../../../common"

export function getViewModelTargetPath(input: DefaultTemplateInput): string {
  const useFullFeatureNames = config.general.useFullFeatureNames()

  let targetFile = ""
  if (useFullFeatureNames) targetFile += `${input.name.snake}_`
  targetFile += "view_model.dart"

  return joinTargetPath(input.targetDirectory, targetFile)
}
