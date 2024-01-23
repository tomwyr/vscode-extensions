import { ConfigurationTarget, workspace } from "vscode"
import * as constants from "../constants"

export const changeConfig = {
  stateImportPath: setStateImportPath,
}

async function setStateImportPath(importPath: string) {
  await workspace
    .getConfiguration(constants.extension.configId)
    .update(
      "business.state.importPath",
      importPath,
      ConfigurationTarget.Workspace,
    )
}
