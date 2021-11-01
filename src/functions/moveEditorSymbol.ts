import { Position, Selection, TextEditor } from "vscode"
import { MoveSymbolParams } from "../types"

export function moveEditorSymbol(editor: TextEditor, params: MoveSymbolParams) {
  moveSymbolText(editor, params)
  moveSymbolSelection(editor, params)
}

function moveSymbolText(editor: TextEditor, params: MoveSymbolParams) {
  const symbolText = editor.document.getText(params.bottomSymbolRange)
  const blankText = editor.document.getText(params.blankSpaceRange)

  editor.edit((editBuilder) => {
    editBuilder.delete(params.bottomSymbolRange)
    editBuilder.delete(params.blankSpaceRange)
    editBuilder.insert(params.bottomSymbolNewPosition, symbolText)
    editBuilder.insert(params.bottomSymbolNewPosition, blankText)
  })
}

function moveSymbolSelection(editor: TextEditor, params: MoveSymbolParams) {
  const anchor = editor.selection.anchor
  const active = editor.selection.active

  const newAnchor = new Position(
    anchor.line + params.selectionStartLineDelta,
    anchor.character,
  )
  const newActive = new Position(
    active.line + params.selectionStartLineDelta,
    active.character,
  )

  editor.selection = new Selection(newAnchor, newActive)
}
