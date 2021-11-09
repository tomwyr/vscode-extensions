import { join } from "path"
import { config } from "../../../../config"
import * as constants from "../../../../constants"
import { convertToAbsoluteImportPath, parseCaseValue } from "../../../../utils"
import { DefaultTemplateInput } from "../../../common"
import { ConnectorTemplateValues } from "./generateTemplate"

export async function getConnectorTemplateValues(
  input: DefaultTemplateInput,
): Promise<ConnectorTemplateValues> {
  const widgetSuffix = config.client.widget.suffix()
  const injectViewModel = config.client.injectViewModel()
  const connectorSuffix = config.client.connector.suffix()
  const connectorIncludeWidgetSuffix =
    config.client.connector.includeWidgetSuffix()
  const stateName = config.business.state.name()

  let connectorName = input.name.pascal
  if (connectorIncludeWidgetSuffix) connectorName += widgetSuffix
  connectorName += `Connector${connectorSuffix}`

  const widgetName = `${input.name.pascal}${widgetSuffix}`
  const widgetArguments = injectViewModel ? "viewModel: viewModel" : ""

  const viewModelName = `${input.name.pascal}ViewModel`
  const viewModelFactoryName = `${input.name.pascal}ViewModelFactory`

  const connectorTypeParameters = `${stateName}, ${viewModelName}`

  const imports = await getImports(
    input,
    widgetName,
    viewModelName,
    viewModelFactoryName,
  )

  return {
    imports: imports,
    connectorName: connectorName,
    connectorTypeParameters: connectorTypeParameters,
    widgetName: widgetName,
    widgetArguments: widgetArguments,
    viewModelFactoryName: viewModelFactoryName,
  }
}

async function getImports(
  input: DefaultTemplateInput,
  widgetName: string,
  viewModelName: string,
  viewModelFactoryName: string,
): Promise<string> {
  const materialImport = "import 'package:flutter/material.dart';"

  const reduxImports = getReduxImports()

  const featureImports = await getFeatureImports(
    input,
    widgetName,
    viewModelName,
    viewModelFactoryName,
  )

  const imports = `${materialImport}
${reduxImports}

${featureImports}`

  return imports
}

function getReduxImports(): string {
  const stateImportPath = config.business.state.importPath()

  const includeStateImport =
    stateImportPath != "" && stateImportPath != constants.asyncRedux.importPath

  let reduxImports = `${constants.asyncRedux.importStatement}`
  if (includeStateImport) {
    reduxImports += `\nimport '${stateImportPath}';`
  }

  return reduxImports
}

async function getFeatureImports(
  input: DefaultTemplateInput,
  widgetName: string,
  viewModelName: string,
  viewModelFactoryName: string,
): Promise<string> {
  const useAbsoluteImports = config.general.useAbsoluteImports()

  const featurePrefixLength = `${input.name.snake}_`.length

  const widgetImport = parseCaseValue(widgetName).snake
  const viewModelImport = parseCaseValue(viewModelName).snake
  const viewModelFactoryImport = parseCaseValue(viewModelFactoryName).snake

  const useFullFeatureNames = config.general.useFullFeatureNames()

  const importPathPromises = [
    widgetImport,
    viewModelImport,
    viewModelFactoryImport,
  ].map(async (item) => {
    let importPath = `${item}.dart`

    if (!useFullFeatureNames) {
      importPath = importPath.slice(featurePrefixLength)
    }

    if (useAbsoluteImports) {
      const absoluteFilePath = join(input.targetDirectory, importPath)
      importPath = await convertToAbsoluteImportPath(absoluteFilePath)
    }

    return `import '${importPath}';`
  })

  const importPaths = await Promise.all(importPathPromises)
  const featureImports = importPaths.join("\n")

  return featureImports
}
