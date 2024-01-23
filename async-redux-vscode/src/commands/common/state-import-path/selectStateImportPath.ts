import { join } from "path"
import { Uri, window } from "vscode"
import {
  convertToAbsoluteImportPath,
  errors,
  getProjectPath,
} from "../../../utils"

export async function selectStateImportPath(): Promise<string | undefined> {
  const projectPath = getProjectPath()

  if (!projectPath) throw errors.notProjectWorkspace

  const projectLibPath = join(projectPath, "lib")
  const stateFilePath = await showStateFilePathDialog(projectLibPath)

  if (!stateFilePath) return

  if (!stateFilePath.startsWith(projectLibPath)) {
    throw errors.fileNotInProject
  }

  return convertToAbsoluteImportPath(stateFilePath)
}

async function showStateFilePathDialog(
  projectLibPath: string,
): Promise<string | undefined> {
  const selectedUris = await window.showOpenDialog({
    canSelectMany: false,
    openLabel: "Select state file",
    defaultUri: Uri.parse(projectLibPath),
    filters: { Dart: ["dart"] },
  })

  if (selectedUris == undefined || selectedUris.length == 0) return

  return selectedUris[0].path
}
