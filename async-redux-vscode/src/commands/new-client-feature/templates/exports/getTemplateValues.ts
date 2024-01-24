import { config } from "../../../../config"
import { parseCaseValue } from "../../../../utils"
import { DefaultTemplateInput } from "../../../common"
import { ExportsTemplateValues } from "./generateTemplate"

export function getExportsTemplateValues(
  input: DefaultTemplateInput,
): ExportsTemplateValues {
  const widgetSuffix = config.client.widget.suffix()
  const connectorSuffix = config.client.connector.suffix()
  const connectorIncludeWidgetSuffix =
    config.client.connector.includeWidgetSuffix()
  const useFullFeatureNames = config.general.useFullFeatureNames()

  let connectorName = ""
  if (useFullFeatureNames) connectorName += `${input.name.snake}_`
  if (connectorIncludeWidgetSuffix && widgetSuffix != "") {
    connectorName += `${parseCaseValue(widgetSuffix).snake}_`
  }
  connectorName += "connector"
  if (connectorSuffix != "") {
    connectorName += `_${parseCaseValue(connectorSuffix).snake}`
  }

  const connectorExport = `export '${connectorName}.dart';`

  return {
    connectorExport: connectorExport,
  }
}
