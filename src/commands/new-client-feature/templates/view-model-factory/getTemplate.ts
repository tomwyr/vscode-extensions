import { ViewModelFactoryTemplateValues } from "./generateTemplate"

export function getViewModelFactoryTemplate(
  values: ViewModelFactoryTemplateValues,
): string {
  return `${values.imports}
  
class ${values.viewModelFactoryName} extends ${values.viewModelFactoryBaseName}<${values.viewModelFactoryBaseTypeParameters}> {
  @override
  Vm fromStore() => ${values.viewModelName}();
}
`
}
