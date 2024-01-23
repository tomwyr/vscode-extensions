import { config } from "../../../../config"
import { distinct, notEmpty } from "../../../../utils"
import { ActionType } from "../../actionType"
import { getAsyncReduceTemplate, getSyncReduceTemplate } from "./getTemplate"
import { ActionTemplateInput, ActionTemplateValues } from "./generateTemplate"

export function getActionTemplateValues(
  input: ActionTemplateInput,
): ActionTemplateValues {
  const stateName = config.business.state.name()
  const stateImportPath = config.business.state.importPath()
  const actionImportPath = config.business.action.importPath()
  const actionIncludeState = config.business.action.includeState()
  let actionBaseName = config.business.action.baseName()

  const imports = getActionImports([actionImportPath, stateImportPath])

  const actionName = `${input.name.pascal}Action`

  if (actionIncludeState) actionBaseName += `<${stateName}>`

  const reduce = getActionTypeReduce(input.type, stateName)

  return {
    imports: imports,
    actionName: actionName,
    actionBaseName: actionBaseName,
    reduce: reduce,
  }
}

function getActionImports(importPaths: string[]): string {
  return importPaths
    .filter(notEmpty)
    .filter(distinct)
    .map((path) => `import '${path}';`)
    .join("\n")
}

function getActionTypeReduce(
  actionType: ActionType,
  stateName: string,
): string {
  switch (actionType) {
    case ActionType.sync:
      return getSyncReduceTemplate(stateName)
    case ActionType.async:
      return getAsyncReduceTemplate(stateName)
  }
}
