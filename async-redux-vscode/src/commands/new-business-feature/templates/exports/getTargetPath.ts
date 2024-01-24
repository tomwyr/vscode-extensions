import { DefaultTemplateInput, joinTargetPath } from "../../../common"

export function getExportsTargetPath(input: DefaultTemplateInput): string {
  const targetFile = `${input.name.snake}.dart`

  return joinTargetPath(input.targetDirectory, targetFile)
}
