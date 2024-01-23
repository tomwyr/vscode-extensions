import { config } from "../../../../config"
import { DefaultTemplateInput, joinTargetPath } from "../../../common"

export function getViewModelFactoryTargetPath(
  input: DefaultTemplateInput,
): string {
  const useFullFeatureNames = config.general.useFullFeatureNames()

  let targetFile = ""
  if (useFullFeatureNames) targetFile += `${input.name.snake}_`
  targetFile += "view_model_factory.dart"

  return joinTargetPath(input.targetDirectory, targetFile)
}
