import { runAction } from ".."
import { config } from "../../../config"
import { showStatePathMissingInfo } from "./showStateImportPathMissingInfo"

export async function checkStateImportPathSet() {
  await runAction(async () => {
    const initialPath = config.business.state.importPath()

    if (initialPath != "") return

    await showStatePathMissingInfo()

    const updatedPath = config.business.state.importPath()

    if (initialPath == updatedPath) return

    return `Successfully updated state import path to: ${updatedPath}`
  })
}
