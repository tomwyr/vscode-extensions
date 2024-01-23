import { join } from "path"
import { config } from "../../../../config"
import * as constants from "../../../../constants"
import { convertToAbsoluteImportPath, parseCaseValue } from "../../../../utils"
import { DefaultTemplateInput } from "../../../common"
import { ViewModelFactoryTemplateValues } from "./generateTemplate"

export async function getViewModelFactoryTemplateValues(
  input: DefaultTemplateInput,
): Promise<ViewModelFactoryTemplateValues> {
  const viewModelFactoryBaseName = config.client.viewModelFactory.baseName()

  const viewModelName = `${input.name.pascal}ViewModel`

  const viewModelFactoryName = `${input.name.pascal}ViewModelFactory`

  const imports = await getImports(input)

  const viewModelFactoryBaseTypeParameters =
    getViewModelFactoryBaseTypeParameters(input)

  return {
    imports: imports,
    viewModelName: viewModelName,
    viewModelFactoryName: viewModelFactoryName,
    viewModelFactoryBaseName: viewModelFactoryBaseName,
    viewModelFactoryBaseTypeParameters: viewModelFactoryBaseTypeParameters,
  }
}

function getViewModelFactoryBaseTypeParameters(
  input: DefaultTemplateInput,
): string {
  const widgetSuffix = config.client.widget.suffix()
  const connectorSuffix = config.client.connector.suffix()
  const connectorIncludeWidgetSuffix =
    config.client.connector.includeWidgetSuffix()
  const stateName = config.business.state.name()
  const viewModelFactoryIncludeState =
    config.client.viewModelFactory.includeState()

  let connectorName = input.name.pascal
  if (connectorIncludeWidgetSuffix) {
    connectorName += widgetSuffix
  }
  connectorName += `Connector${connectorSuffix}`

  const viewModelFactoryTypeParameters = [
    ...(viewModelFactoryIncludeState ? [stateName] : []),
    connectorName,
  ].join(`, `)

  return viewModelFactoryTypeParameters
}

async function getImports(input: DefaultTemplateInput): Promise<string> {
  const viewModelFactoryImportPath = config.client.viewModelFactory.importPath()
  const viewModelFactoryIncludeState =
    config.client.viewModelFactory.includeState()
  const stateImportPath = config.business.state.importPath()

  const packageImports = getPackageImports(
    viewModelFactoryImportPath,
    viewModelFactoryIncludeState,
    stateImportPath,
  )
  const featureImports = await getFeatureImports(input)

  const imports = `${packageImports}

${featureImports}`

  return imports
}

async function getFeatureImports(input: DefaultTemplateInput): Promise<string> {
  const useAbsoluteImports = config.general.useAbsoluteImports()
  const connectorIncludeWidgetSuffix =
    config.client.connector.includeWidgetSuffix()

  const useFullFeatureNames = config.general.useFullFeatureNames()
  const widgetSuffix = config.client.widget.suffix()

  const connectorSuffix = config.client.connector.suffix()

  let connectorName = `${input.name.pascal}`
  if (connectorIncludeWidgetSuffix) {
    connectorName += widgetSuffix
  }
  connectorName += `Connector${connectorSuffix}`

  const viewModelName = `${input.name.pascal}ViewModel`

  const connectorImport = parseCaseValue(connectorName).snake
  const viewModelImport = parseCaseValue(viewModelName).snake

  const featurePrefixLength = `${input.name.snake}_`.length

  const importPathPromises = [connectorImport, viewModelImport].map(
    async (item) => {
      let importPath = `${item}.dart`

      if (!useFullFeatureNames) {
        importPath = importPath.slice(featurePrefixLength)
      }

      if (useAbsoluteImports) {
        const absoluteFilePath = join(input.targetDirectory, importPath)
        importPath = await convertToAbsoluteImportPath(absoluteFilePath)
      }

      return `import '${importPath}';`
    },
  )

  const importPaths = await Promise.all(importPathPromises)
  const featureImports = importPaths.join("\n")

  return featureImports
}

function getPackageImports(
  viewModelFactoryImportPath: string,
  viewModelFactoryIncludeState: boolean,
  stateImportPath: string,
): string {
  let packageImports = `${constants.asyncRedux.importStatement}`

  if (viewModelFactoryImportPath != constants.asyncRedux.importPath) {
    packageImports += `\nimport '${viewModelFactoryImportPath}';`
  }

  const includeCustomStateImport =
    viewModelFactoryIncludeState &&
    stateImportPath != "" &&
    stateImportPath != constants.asyncRedux.importPath

  if (includeCustomStateImport) {
    packageImports += `\nimport '${stateImportPath}';`
  }

  return packageImports
}
