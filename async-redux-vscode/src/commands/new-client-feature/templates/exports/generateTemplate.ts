import { generateDefaultTemplate, DefaultTemplateInput } from "../../../common"
import { getExportsTargetPath } from "./getTargetPath"
import { getExportsTemplate } from "./getTemplate"
import { getExportsTemplateValues } from "./getTemplateValues"

export type ExportsTemplateValues = {
  connectorExport: string
}

export async function generateExportsTemplate(input: DefaultTemplateInput) {
  await generateDefaultTemplate({
    input: input,
    getTargetPath: getExportsTargetPath,
    getTemplateValues: getExportsTemplateValues,
    getTemplate: getExportsTemplate,
  })
}
