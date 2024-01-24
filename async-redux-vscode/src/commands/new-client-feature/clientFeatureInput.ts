import { Uri } from "vscode"
import { CaseValue } from "../../utils"
import { getTargetName, getTargetDirectoryPath } from "../common"

export type ClientFeatureInput = {
  name: CaseValue
  targetDirectory: string
}

export async function getClientFeatureInput(
  uri: Uri,
): Promise<ClientFeatureInput> {
  const featureName = await getTargetName("Feature Name")
  const targetDirectory = await getTargetDirectoryPath(
    uri,
    "Select new feature folder",
  )

  return {
    name: featureName,
    targetDirectory: targetDirectory,
  }
}
