import { Uri } from "vscode"
import { checkStateImportPathSet } from "../common/state-import-path"
import { createClientFeature } from "./createClientFeature"

export const newClientFeatureCommand = async (uri: Uri) => {
  await createClientFeature(uri)
  await checkStateImportPathSet()
}
