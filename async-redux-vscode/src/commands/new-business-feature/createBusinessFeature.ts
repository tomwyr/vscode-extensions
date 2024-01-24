import { Uri } from "vscode"
import { config } from "../../config"
import { runAction } from "../common"
import { getBusinessFeatureInput } from "./businessFeatureInput"
import { createBusinessFeatureDirectories } from "./createBusinessFeatureDirectories"
import { generateExportsTemplate } from "./templates/exports/generateTemplate"
import { generateStateTemplate } from "./templates/state/generateTemplate"

export async function createBusinessFeature(uri: Uri) {
  await runAction(async () => {
    const input = await getBusinessFeatureInput(uri)

    const paths = await createBusinessFeatureDirectories(input)

    await generateStateTemplate({
      name: input.name,
      targetDirectory: paths.featureModelsDirectory,
    })

    const generateExports = config.business.generateExports()

    if (generateExports) await generateExportsTemplate(input)

    return `Successfully generated ${input.name.snake} business feature`
  })
}
