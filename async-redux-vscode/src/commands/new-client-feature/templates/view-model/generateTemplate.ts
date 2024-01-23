import { generateDefaultTemplate, DefaultTemplateInput } from "../../../common"
import { getViewModelTargetPath } from "./getTargetPath"
import { getViewModelTemplate } from "./getTemplate"
import { getViewModelTemplateValues } from "./getTemplateValues"

export type ViewModelTemplateValues = {
  viewModelImport: string
  viewModelName: string
  viewModelBaseName: string
}

export async function generateViewModelTemplate(input: DefaultTemplateInput) {
  await generateDefaultTemplate({
    input: input,
    getTargetPath: getViewModelTargetPath,
    getTemplateValues: getViewModelTemplateValues,
    getTemplate: getViewModelTemplate,
  })
}
