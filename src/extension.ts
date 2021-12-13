import * as vscode from "vscode"
import { colorNameProvider } from "./colorNameProvider"

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerHoverProvider("dart", colorNameProvider)
  )
}
