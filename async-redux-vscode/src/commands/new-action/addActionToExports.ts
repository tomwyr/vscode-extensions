import { existsSync } from "fs"
import { join, sep } from "path"
import { config } from "../../config"
import { getLastIndexWhere, readFileData, writeFileData } from "../../utils"
import { ActionInput } from "./actionInput"

export async function addActionToExports(input: ActionInput) {
  const addToExports = config.business.action.addToExports()

  if (!addToExports) return

  await addActionToFeatureExports(input)
}

async function addActionToFeatureExports(input: ActionInput) {
  const featurePathItems = input.targetDirectory.split(sep).slice(0, -1)
  const featurePath = join(...featurePathItems)
  const featureName = featurePathItems[featurePathItems.length - 1]
  const featureFileName = `${featureName}.dart`
  const featureExportsPath = join(featurePath, featureFileName)

  if (!existsSync(featureExportsPath)) return

  const actionExportStatement = `export 'actions/${input.name.snake}_action.dart';`

  addActionToFeatureExportsFile(featureExportsPath, actionExportStatement)
}

async function addActionToFeatureExportsFile(
  featureExportsPath: string,
  actionExportStatement: string,
) {
  const file = await readFileData(featureExportsPath)
  const rows = file.toString().split("\n")

  const preceedingActionExportIndex = getLastIndexWhere(
    rows,
    (item) => item.startsWith("export") && item < actionExportStatement,
  )
  rows.splice(preceedingActionExportIndex + 1, 0, actionExportStatement)

  await writeFileData(featureExportsPath, rows.join("\n"))
}
