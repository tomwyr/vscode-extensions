import { Uri } from "vscode"
import { checkStateImportPathSet } from "../common/state-import-path"
import { createAction } from "./createAction"

export const newActionCommand = async (uri: Uri) => {
  await createAction(uri)
  await checkStateImportPathSet()
}
