import { config } from "../../../../config"
import { convertToAbsoluteImportPath } from "../../../../utils"
import { DefaultTemplateInput } from "../../../common"
import {
  getDefaultConstructorTemplate,
  getViewModelConstructorTemplate,
} from "./getTemplate"
import { WidgetTemplateValues } from "./generateTemplate"
import { join } from "path"

export async function getWidgetTemplateValues(
  input: DefaultTemplateInput,
): Promise<WidgetTemplateValues> {
  const widgetSuffix = config.client.widget.suffix()
  const injectViewModel = config.client.injectViewModel()

  const widgetName = `${input.name.pascal}${widgetSuffix}`

  const contructor = getConstructor(input, injectViewModel, widgetName)

  const imports = await getImports(input, injectViewModel)

  return {
    imports: imports,
    widgetName: widgetName,
    constructor: contructor,
  }
}

function getConstructor(
  input: DefaultTemplateInput,
  injectViewModel: boolean,
  widgetName: string,
): string {
  const viewModelName = `${input.name.pascal}ViewModel`

  const constructor = injectViewModel
    ? getViewModelConstructorTemplate(widgetName, viewModelName)
    : getDefaultConstructorTemplate(widgetName)

  return constructor
}

async function getImports(
  input: DefaultTemplateInput,
  injectViewModel: boolean,
): Promise<string> {
  const materialImport = "import 'package:flutter/material.dart';"

  let viewModelImport = ""
  if (injectViewModel) {
    const viewModelImportPath = await getViewModelImportPath(input)

    viewModelImport = `import '${viewModelImportPath}';`
  }

  return `${materialImport}
  
${viewModelImport}
`.trim()
}

async function getViewModelImportPath(
  input: DefaultTemplateInput,
): Promise<string> {
  const useAbsoluteImports = config.general.useAbsoluteImports()
  const useFullFeatureNames = config.general.useFullFeatureNames()

  let viewModelFileName = ""
  if (useFullFeatureNames) viewModelFileName += `${input.name.snake}_`
  viewModelFileName += "view_model.dart"

  const viewModelFilePath = join(input.targetDirectory, viewModelFileName)

  const viewModelImportPath = useAbsoluteImports
    ? await convertToAbsoluteImportPath(viewModelFilePath)
    : viewModelFileName

  return viewModelImportPath
}
