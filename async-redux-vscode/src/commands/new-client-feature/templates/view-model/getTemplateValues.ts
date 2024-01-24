import { config } from "../../../../config"
import { DefaultTemplateInput } from "../../../common"
import { ViewModelTemplateValues } from "./generateTemplate"

export function getViewModelTemplateValues(
  input: DefaultTemplateInput,
): ViewModelTemplateValues {
  const viewModelBaseName = config.client.viewModel.baseName()
  const viewModelImportPath = config.client.viewModel.importPath()

  const viewModelName = `${input.name.pascal}ViewModel`

  const viewModelImport = `import '${viewModelImportPath}';`

  return {
    viewModelImport: viewModelImport,
    viewModelName: viewModelName,
    viewModelBaseName: viewModelBaseName,
  }
}
