import { generateDefaultTemplate, DefaultTemplateInput } from "../../../common"
import { getViewModelFactoryTargetPath } from "./getTargetPath"
import { getViewModelFactoryTemplate } from "./getTemplate"
import { getViewModelFactoryTemplateValues } from "./getTemplateValues"

export type ViewModelFactoryTemplateValues = {
  imports: string
  viewModelName: string
  viewModelFactoryName: string
  viewModelFactoryBaseName: string
  viewModelFactoryBaseTypeParameters: string
}

export async function generateViewModelFactoryTemplate(
  input: DefaultTemplateInput,
) {
  await generateDefaultTemplate({
    input: input,
    getTargetPath: getViewModelFactoryTargetPath,
    getTemplateValues: getViewModelFactoryTemplateValues,
    getTemplate: getViewModelFactoryTemplate,
  })
}
