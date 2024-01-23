import { window } from "vscode"

export type RunActionBody = () => Promise<string | undefined>

export async function runAction(body: RunActionBody) {
  try {
    const result = await body()

    if (result == undefined) return

    window.showInformationMessage(result)
  } catch (error) {
    window.showErrorMessage(
      error instanceof Error ? error.message : JSON.stringify(error),
    )
  }
}
