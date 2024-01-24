import { join } from "path"
import { createDirectory } from "../../utils"
import { ClientFeatureInput } from "./clientFeatureInput"

export async function createClientFeatureDirectory(
  input: ClientFeatureInput,
): Promise<string> {
  const featureDirectoryPath = join(input.targetDirectory, input.name.snake)

  await createDirectory(featureDirectoryPath)

  return featureDirectoryPath
}
