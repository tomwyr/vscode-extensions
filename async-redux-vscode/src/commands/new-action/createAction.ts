import { Uri } from "vscode"
import { runAction } from "../common"
import { getActionInput } from "./actionInput"
import { addActionToExports } from "./addActionToExports"
import { generateActionTemplate } from "./templates/action/generateTemplate"

export async function createAction(uri: Uri) {
  await runAction(async () => {
    const input = await getActionInput(uri)

    await generateActionTemplate(input)

    await addActionToExports(input)

    return `Successfully generated ${input.name.snake} action`
  })
}
