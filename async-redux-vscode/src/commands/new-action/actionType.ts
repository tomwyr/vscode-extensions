import { QuickPickItem, window } from "vscode"
import { errors } from "../../utils"

export enum ActionType {
  sync,
  async,
}

export async function getActionType(): Promise<ActionType> {
  const pickedItem = await showActionTypePicker()

  if (pickedItem == syncPickItem) return ActionType.sync
  if (pickedItem == asyncPickItem) return ActionType.async

  throw errors.actionTypeNotSelected
}

async function showActionTypePicker(): Promise<ActionTypePickItem | undefined> {
  return new Promise((resolve) => {
    let selection: ActionTypePickItem | undefined

    const input = window.createQuickPick<ActionTypePickItem>()

    input.placeholder = "Action Type"
    input.items = [syncPickItem, asyncPickItem]

    input.onDidChangeSelection((items) => {
      selection = items.length > 0 ? items[0] : undefined
    })

    input.onDidAccept(() => {
      input.hide()
      resolve(selection)
    })

    input.show()
  })
}

interface ActionTypePickItem extends QuickPickItem {}

const syncPickItem: ActionTypePickItem = {
  label: "sync",
  description: "Produces new state synchronously",
}

const asyncPickItem: ActionTypePickItem = {
  label: "async",
  description: "Produces new state asynchronously",
}
