import { lstatSync } from "fs"
import { OpenDialogOptions, Uri, window } from "vscode"
import { errors } from "../../utils"

export async function getTargetDirectoryPath(
  uri: Uri,
  dialogLabel: string,
): Promise<string> {
  const directoryPath = uri.fsPath.trim()

  if (directoryPath != "" && lstatSync(directoryPath).isDirectory()) {
    return directoryPath
  }

  const selectedDirectory = await promptForTargetDirectory(dialogLabel)

  if (selectedDirectory == undefined) {
    throw errors.directoryNotSelected
  }

  return selectedDirectory
}

async function promptForTargetDirectory(
  dialogLabel: string,
): Promise<string | undefined> {
  const options: OpenDialogOptions = {
    canSelectMany: false,
    openLabel: dialogLabel,
    canSelectFolders: true,
  }

  const selectedUris = await window.showOpenDialog(options)

  if (selectedUris == undefined || selectedUris.length == 0) return undefined

  return selectedUris[0].fsPath
}
