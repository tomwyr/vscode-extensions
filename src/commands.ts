import { TextDocument, window } from "vscode"
import { findSelectedSymbol } from "./find-selected-symbol"
import { getDocumentSymbols } from "./get-document-symbols"
import { getMoveSymbolParams } from "./get-move-symbol-params"
import { getResolvedSymbolSwapLines } from "./get-resolved-symbol-swap-lines"
import { getSymbolSwapLines } from "./get-symbol-swap-lines"
import { moveEditorSymbol } from "./move-editor-symbol"
import {
  MoveSymbolParams,
  MoveSymbolDirection,
  SymbolSearchResult,
} from "./types"

export const moveSymbolUp = async () => moveSymbol(MoveSymbolDirection.up)

export const moveSymbolDown = async () => moveSymbol(MoveSymbolDirection.down)

async function moveSymbol(direction: MoveSymbolDirection) {
  const editor = window.activeTextEditor
  if (editor == undefined) return

  const document = editor.document
  const selection = editor.selection

  const documentSymbols = await getDocumentSymbols(document)
  if (documentSymbols == undefined) return

  const symbolSearchResult = findSelectedSymbol(selection, documentSymbols)
  if (symbolSearchResult == undefined) return

  const moveSymbolParams = await getEditorMoveParams(
    document,
    symbolSearchResult,
    direction,
  )
  if (moveSymbolParams == undefined) return

  moveEditorSymbol(editor, moveSymbolParams)
}

async function getEditorMoveParams(
  document: TextDocument,
  searchResult: SymbolSearchResult,
  direction: MoveSymbolDirection,
): Promise<MoveSymbolParams | undefined> {
  const swapLines = await getSymbolSwapLines(document, searchResult, direction)
  if (swapLines == undefined) return

  const resolvedSwapLines = getResolvedSymbolSwapLines(swapLines, direction)

  const moveParams = getMoveSymbolParams(resolvedSwapLines)

  return moveParams
}
