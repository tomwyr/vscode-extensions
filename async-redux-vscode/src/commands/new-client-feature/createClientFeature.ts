import { Uri } from "vscode"
import { config } from "../../config"
import { DefaultTemplateInput, runAction } from "../common"
import { getClientFeatureInput } from "./clientFeatureInput"
import { createClientFeatureDirectory } from "./createClientFeatureDirectory"
import { generateConnectorTemplate } from "./templates/connector/generateTemplate"
import { generateExportsTemplate } from "./templates/exports/generateTemplate"
import { generateViewModelFactoryTemplate } from "./templates/view-model-factory/generateTemplate"
import { generateViewModelTemplate } from "./templates/view-model/generateTemplate"
import { generateWidgetTemplate } from "./templates/widget/generateTemplate"

export async function createClientFeature(uri: Uri) {
  await runAction(async () => {
    const input = await getClientFeatureInput(uri)

    const featureDirectoryPath = await createClientFeatureDirectory(input)

    const templateInput: DefaultTemplateInput = {
      name: input.name,
      targetDirectory: featureDirectoryPath,
    }

    await generateWidgetTemplate(templateInput)
    await generateConnectorTemplate(templateInput)
    await generateViewModelTemplate(templateInput)
    await generateViewModelFactoryTemplate(templateInput)

    const generateExports = config.client.generateExports()

    if (generateExports) {
      await generateExportsTemplate(templateInput)
    }

    return `Successfully generated ${input.name.snake} client feature`
  })
}
