import { Uri } from "vscode"
import { createBusinessFeature } from "./createBusinessFeature"

export const newBusinessFeatureCommand = async (uri: Uri) => {
  await createBusinessFeature(uri)
}
