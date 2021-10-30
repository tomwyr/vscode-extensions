import { commands } from "vscode"
import * as constants from "../constants"

export const openConfig = {
  stateImportPath: openStateImportPath,
}

async function openStateImportPath() {
  const settingPath = `${constants.extension.configId}.business.state.importPath`

  await commands.executeCommand(
    // TODO switch to workspace settings once it gets supported by vscode
    // "workbench.action.openWorkspaceSettings",
    // https://github.com/microsoft/vscode/issues/90086
    "workbench.action.openSettings",
    settingPath,
  )
}
