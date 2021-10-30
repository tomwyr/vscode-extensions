import { generateDefaultTemplate, DefaultTemplateInput } from "../../../common"
import { getConnectorTargetPath } from "./getTargetPath"
import { getConnectorTemplate } from "./getTemplate"
import { getConnectorTemplateValues } from "./getTemplateValues"

export type ConnectorTemplateValues = {
  imports: string
  connectorName: string
  connectorTypeParameters: string
  widgetName: string
  widgetArguments: string
  viewModelFactoryName: string
}

export async function generateConnectorTemplate(input: DefaultTemplateInput) {
  await generateDefaultTemplate({
    input: input,
    getTargetPath: getConnectorTargetPath,
    getTemplateValues: getConnectorTemplateValues,
    getTemplate: getConnectorTemplate,
  })
}
