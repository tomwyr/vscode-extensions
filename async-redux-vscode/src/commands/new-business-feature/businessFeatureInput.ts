import { Uri } from "vscode"
import { CaseValue } from "../../utils"
import { getTargetName, getTargetDirectoryPath } from "../common"

export type BusinessFeatureInput = {
  name: CaseValue
  targetDirectory: string
}

export async function getBusinessFeatureInput(
  uri: Uri,
): Promise<BusinessFeatureInput> {
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
