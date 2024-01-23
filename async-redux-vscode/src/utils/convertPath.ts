import { join } from "path"
import { getProjectName, getProjectPath } from "."
import { errors } from "."

export async function convertToAbsoluteImportPath(
  filePath: string,
): Promise<string> {
  const projectPath = getProjectPath()

  if (!projectPath) throw errors.notProjectWorkspace

  return getImportPath(projectPath, filePath)
}

async function getImportPath(
  projectPath: string,
  filePath: string,
): Promise<string> {
  const libPathLength = join(projectPath, "lib").length + 1
  const libFilePath = filePath.slice(libPathLength)

  const projectName = await getProjectName()

  if (!projectName || projectName == "") {
    throw errors.unknownProjectName
  }

  return `package:${projectName}/${libFilePath}`
}
