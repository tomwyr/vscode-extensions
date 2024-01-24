import { config } from "../../../../config"
import { parseCaseValue } from "../../../../utils"
import { DefaultTemplateInput, joinTargetPath } from "../../../common"

export function getConnectorTargetPath(input: DefaultTemplateInput): string {
  const widgetSuffix = config.client.widget.suffix()
  const connectorSuffix = config.client.connector.suffix()
  const connectorIncludeWidgetSuffix =
    config.client.connector.includeWidgetSuffix()
  const useFullFeatureNames = config.general.useFullFeatureNames()

  let targetFile = ""
  if (useFullFeatureNames) targetFile += `${input.name.snake}_`
  if (connectorIncludeWidgetSuffix) {
    targetFile += `${parseCaseValue(widgetSuffix).snake}_`
  }
  targetFile += "connector"
  if (connectorSuffix != "") {
    targetFile += `_${parseCaseValue(connectorSuffix).snake}`
  }
  targetFile += ".dart"

  return joinTargetPath(input.targetDirectory, targetFile)
}
