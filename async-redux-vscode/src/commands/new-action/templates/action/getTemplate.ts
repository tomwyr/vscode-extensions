import { ActionTemplateValues } from "./generateTemplate"

export function getActionTemplate(values: ActionTemplateValues): string {
  return `${values.imports}

class ${values.actionName} extends ${values.actionBaseName} {
  ${values.reduce}
}
`
}

export function getSyncReduceTemplate(stateName: string): string {
  return `@override
  ${stateName}? reduce() {
    
  }`
}

export function getAsyncReduceTemplate(stateName: string): string {
  return `@override
  Future<${stateName}?> reduce() async {
    
  }`
}
