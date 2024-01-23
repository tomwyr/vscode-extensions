import { joinTargetPath } from "../../../common"
import { ActionTemplateInput } from "./generateTemplate"

export function getActionTargetPath(input: ActionTemplateInput): string {
  const targetFile = `${input.name.snake}_action.dart`

  return joinTargetPath(input.targetDirectory, targetFile)
}
