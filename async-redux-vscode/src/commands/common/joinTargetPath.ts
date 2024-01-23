import { existsSync } from "fs"
import { join } from "path"
import { errors } from "../../utils"

export function joinTargetPath(
  directoryPath: string,
  targetFile: string,
): string {
  const targetPath = join(directoryPath, targetFile)

  if (existsSync(targetPath)) {
    throw errors.targetFileExists(targetFile)
  }

  return targetPath
}
