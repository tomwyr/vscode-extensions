import { generateDefaultTemplate, DefaultTemplateInput } from "../../../common"
import { ActionType } from "../../actionType"
import { getActionTargetPath } from "./getTargetPath"
import { getActionTemplate } from "./getTemplate"
import { getActionTemplateValues } from "./getTemplateValues"

export type ActionTemplateInput = DefaultTemplateInput & {
  type: ActionType
}

export type ActionTemplateValues = {
  imports: string
  actionName: string
  actionBaseName: string
  reduce: string
}

export async function generateActionTemplate(input: ActionTemplateInput) {
  await generateDefaultTemplate({
    input: input,
    getTargetPath: getActionTargetPath,
    getTemplateValues: getActionTemplateValues,
    getTemplate: getActionTemplate,
  })
}
