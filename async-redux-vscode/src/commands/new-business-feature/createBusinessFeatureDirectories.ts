import { join } from "path"
import { createDirectory } from "../../utils"
import { BusinessFeatureInput } from "./businessFeatureInput"

export type BusinessFeaturePaths = {
  featureDirectory: string
  featureActionsDirectory: string
  featureModelsDirectory: string
}

export async function createBusinessFeatureDirectories(
  input: BusinessFeatureInput,
): Promise<BusinessFeaturePaths> {
  const paths = getBusinessFeaturePaths(input)

  await createDirectory(paths.featureDirectory)
  await createDirectory(paths.featureActionsDirectory)
  await createDirectory(paths.featureModelsDirectory)

  return paths
}

function getBusinessFeaturePaths(
  input: BusinessFeatureInput,
): BusinessFeaturePaths {
  const featureDirectory = join(input.targetDirectory, input.name.snake)
  const featureActionsDirectory = join(featureDirectory, "actions")
  const featureModelsDirectory = join(featureDirectory, "models")

  return {
    featureDirectory: featureDirectory,
    featureActionsDirectory: featureActionsDirectory,
    featureModelsDirectory: featureModelsDirectory,
  }
}
