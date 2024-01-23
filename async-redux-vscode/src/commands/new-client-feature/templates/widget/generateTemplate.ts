import { generateDefaultTemplate, DefaultTemplateInput } from "../../../common"
import { getWidgetTargetPath } from "./getTargetPath"
import { getWidgetTemplate } from "./getTemplate"
import { getWidgetTemplateValues } from "./getTemplateValues"

export type WidgetTemplateValues = {
  imports: string
  widgetName: string
  constructor: string
}

export async function generateWidgetTemplate(input: DefaultTemplateInput) {
  await generateDefaultTemplate({
    input: input,
    getTargetPath: getWidgetTargetPath,
    getTemplateValues: getWidgetTemplateValues,
    getTemplate: getWidgetTemplate,
  })
}
