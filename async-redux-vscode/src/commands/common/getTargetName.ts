import { InputBoxOptions, window } from "vscode"
import { errors } from "../../utils"
import { CaseValue, parseCaseValue } from "../../utils"

export async function getTargetName(inputPrompt: string): Promise<CaseValue> {
  let targetName = await promptForTargetName(inputPrompt)

  if (targetName == undefined || targetName.trim() == "") {
    throw errors.nameNotProvided
  }

  return parseCaseValue(targetName.trim())
}

function promptForTargetName(
  inputPrompt: string,
): Thenable<string | undefined> {
  const targetNamePromptOptions: InputBoxOptions = {
    prompt: inputPrompt,
    placeHolder: "",
  }

  return window.showInputBox(targetNamePromptOptions)
}
