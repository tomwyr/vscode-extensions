import { TextDocument } from "vscode"
import {
  MoveSymbolDirection,
  SymbolSwapLines,
  SymbolSearchResult,
} from "./types"

export async function getSymbolSwapLines(
  document: TextDocument,
  searchResult: SymbolSearchResult,
  direction: MoveSymbolDirection,
): Promise<SymbolSwapLines | undefined> {
  const selectedSymbol = searchResult.searched
  const adjacentSymbol =
    direction == MoveSymbolDirection.up
      ? searchResult.previous
      : searchResult.next

  if (adjacentSymbol == undefined) return

  const swapLines = {
    selectedSymbolStartLine: selectedSymbol.range.start.line,
    selectedSymbolEndLine: selectedSymbol.range.end.line,
    adjacentSymbolStartLine: adjacentSymbol.range.start.line,
    adjacentSymbolEndLine: adjacentSymbol.range.end.line,
  }

  const swapLinesIncludingAnnotations = includeSymbolAnnotations(
    document,
    swapLines,
  )

  return swapLinesIncludingAnnotations
}

function includeSymbolAnnotations(
  document: TextDocument,
  moveLines: SymbolSwapLines,
): SymbolSwapLines {
  const selectedSymbolStartLineIncludingAnnotations =
    getLineIncludingAnnotations(document, moveLines.selectedSymbolStartLine)

  const adjacentSymbolStartLineIncludingAnnotations =
    getLineIncludingAnnotations(document, moveLines.adjacentSymbolStartLine)

  return {
    selectedSymbolStartLine: selectedSymbolStartLineIncludingAnnotations,
    selectedSymbolEndLine: moveLines.selectedSymbolEndLine,
    adjacentSymbolStartLine: adjacentSymbolStartLineIncludingAnnotations,
    adjacentSymbolEndLine: moveLines.adjacentSymbolEndLine,
  }
}

function getLineIncludingAnnotations(
  document: TextDocument,
  line: number,
): number {
  var annotationsLinesCount = 0

  for (let index = line - 1; index >= 0; index--) {
    const isAnnotation = document.lineAt(index).text.trimStart().startsWith("@")

    if (!isAnnotation) break

    annotationsLinesCount++
  }

  return line - annotationsLinesCount
}
