import { generateDefaultTemplate } from "../../../common"
import { BusinessFeatureInput } from "../../businessFeatureInput"
import { getStateTargetPath } from "./getTargetPath"
import { getBusinessStateTemplate } from "./getTemplate"
import { getStateTemplateValues } from "./getTemplateValues"

export type BusinessStateTemplateValues =
  | DefaultStateTemplateValues
  | FreezedStateTemplateValues

export type DefaultStateTemplateValues = {
  type: "default"
  stateName: string
}

export type FreezedStateTemplateValues = {
  type: "freezed"
  fileName: string
  stateName: string
}

export async function generateStateTemplate(input: BusinessFeatureInput) {
  await generateDefaultTemplate({
    input: input,
    getTargetPath: getStateTargetPath,
    getTemplateValues: getStateTemplateValues,
    getTemplate: getBusinessStateTemplate,
  })
}
