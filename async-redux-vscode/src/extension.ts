import * as vscode from "vscode"
import * as commands from "./commands"
import * as constants from "./constants"
import { SnippetCompletionItemProvider } from "./providers"

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      constants.vscode.dartFileSelector,
      new SnippetCompletionItemProvider(context.extensionPath),
    ),
  )

  context.subscriptions.push(
    vscode.commands.registerCommand(
      constants.extension.newActionCommandId,
      commands.newActionCommand,
    ),
    vscode.commands.registerCommand(
      constants.extension.newBusinessFeatureCommandId,
      commands.newBusinessFeatureCommand,
    ),
    vscode.commands.registerCommand(
      constants.extension.newClientFeatureCommandId,
      commands.newClientFeatureCommand,
    ),
  )
}
