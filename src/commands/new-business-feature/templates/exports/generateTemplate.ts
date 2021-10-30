import { generateDefaultTemplate } from "../../../common"
import { BusinessFeatureInput } from "../../businessFeatureInput"
import { getExportsTargetPath } from "./getTargetPath"
import { getExportsTemplate } from "./getTemplate"
import { getExportsTemplateValues } from "./getTemplateValues"

export type ExportsTemplateValues = {
  stateExport: string
}

export async function generateExportsTemplate(input: BusinessFeatureInput) {
  await generateDefaultTemplate({
    input: input,
    getTargetPath: getExportsTargetPath,
    getTemplateValues: getExportsTemplateValues,
    getTemplate: getExportsTemplate,
  })
}
