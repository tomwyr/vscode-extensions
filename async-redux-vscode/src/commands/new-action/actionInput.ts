import { existsSync } from "fs"
import { join } from "path"
import { Uri } from "vscode"
import * as constants from "../../constants"
import { CaseValue } from "../../utils"
import { getTargetDirectoryPath, getTargetName } from "../common"
import { ActionType, getActionType } from "./actionType"

export type ActionInput = {
  name: CaseValue
  type: ActionType
  targetDirectory: string
}

export async function getActionInput(uri: Uri): Promise<ActionInput> {
  const actionName = await getTargetName("Action Name")

  const actionType = await getActionType()

  const targetDirectory = await getTargetDirectory(uri)

  return {
    name: actionName,
    type: actionType,
    targetDirectory: targetDirectory,
  }
}

async function getTargetDirectory(uri: Uri): Promise<string> {
  const selectedTargetDirectory = await getTargetDirectoryPath(
    uri,
    "Select new action folder",
  )

  const targetDirectory = getActionsDirectoryPath(selectedTargetDirectory)

  return targetDirectory
}

function getActionsDirectoryPath(targetDirectory: string): string {
  const actionsDirectoryName = constants.asyncRedux.actionsDirectory
  const actionsDirectoryPath = join(targetDirectory, actionsDirectoryName)

  return existsSync(actionsDirectoryPath)
    ? actionsDirectoryPath
    : targetDirectory
}
