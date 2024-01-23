import { config } from "../../../../config"
import { parseCaseValue } from "../../../../utils"
import { DefaultTemplateInput, joinTargetPath } from "../../../common"

export function getWidgetTargetPath(input: DefaultTemplateInput): string {
  const widgetSuffix = config.client.widget.suffix()
  const useFullFeatureNames = config.general.useFullFeatureNames()

  let targetFile = ""
  if (useFullFeatureNames) targetFile += `${input.name.snake}_`
  targetFile += `${parseCaseValue(widgetSuffix).snake}.dart`

  return joinTargetPath(input.targetDirectory, targetFile)
}
