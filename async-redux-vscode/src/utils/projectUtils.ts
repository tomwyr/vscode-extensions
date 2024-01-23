import { existsSync } from "fs"
import * as yaml from "js-yaml"
import * as path from "path"
import { Uri, workspace } from "vscode"

export function getProjectPath(): string | undefined {
  const projectPath = getWorkspacePath()
  const pubspecPath = getPubspecPath()

  if (!projectPath || !pubspecPath || !existsSync(pubspecPath)) return

  return projectPath
}

export async function getProjectName(): Promise<string | undefined> {
  const pubspec = await getPubspec()

  if (!pubspec) return

  const projectName = pubspec["name"]

  if (typeof projectName !== "string") return

  return projectName
}

async function getPubspec(): Promise<Record<string, any> | undefined> {
  const pubspecPath = getPubspecPath()

  if (!pubspecPath || !existsSync(pubspecPath)) return

  let pubspecBytes = await workspace.fs.readFile(Uri.file(pubspecPath))

  try {
    return yaml.load(pubspecBytes.toString()) as Record<string, any>
  } catch (_) {}
}

function getPubspecPath(): string | undefined {
  const workspacePath = getWorkspacePath()

  if (!workspacePath) return

  return path.join(workspacePath, "pubspec.yaml")
}

export function getWorkspacePath(): string | undefined {
  const folders = workspace.workspaceFolders

  if (!folders || folders.length == 0) return

  return folders[0].uri.path
}
