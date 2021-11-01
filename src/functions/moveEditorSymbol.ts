import { Position, Range, Selection, TextEditor } from "vscode"
import { MoveSymbolParams } from "../types"

export function moveEditorSymbol(editor: TextEditor, params: MoveSymbolParams) {
  moveSymbolText(editor, params)
  moveSymbolSelection(editor, params)
  updateVisibleRange(editor, params)
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

function updateVisibleRange(editor: TextEditor, params: MoveSymbolParams) {
  const documentEndLine = editor.document.lineCount - 1

  const visibleStartLine = editor.visibleRanges[0].start.line
  const visibleEndLine =
    editor.visibleRanges[editor.visibleRanges.length - 1].end.line

  const newStartLine = params.selectedSymbolNewPosition.line

  const lineNextToFirstVisible = visibleStartLine + 1
  const linePriorToLastVisible = visibleEndLine - 1

  const isNewStartLineInVisibleRange =
    newStartLine >= lineNextToFirstVisible &&
    newStartLine <= linePriorToLastVisible
  if (isNewStartLineInVisibleRange) return

  const visibleRangeSpan = visibleEndLine - visibleStartLine

  const targetStartLine =
    newStartLine < visibleStartLine + 1
      ? Math.max(lineNextToFirstVisible, 0)
      : Math.min(linePriorToLastVisible - visibleRangeSpan, documentEndLine)

  const targetEndLine = targetStartLine + visibleRangeSpan

  const targetRange = new Range(
    new Position(targetStartLine, 0),
    new Position(targetEndLine, 0),
  )

  editor.revealRange(targetRange)
}
