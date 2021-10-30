import { ViewModelTemplateValues } from "./generateTemplate"

export function getViewModelTemplate(values: ViewModelTemplateValues): string {
  return `${values.viewModelImport}

class ${values.viewModelName} extends ${values.viewModelBaseName} {
  ${values.viewModelName}() : super(equals: []);
}
`
}
