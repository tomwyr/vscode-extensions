import { Position, Range } from "vscode"
import { MoveSymbolParams, SymbolSwapLines } from "../types"

export function getMoveSymbolParams(
  swapLines: SymbolSwapLines,
): MoveSymbolParams {
  const bottomSymbolNewPosition = getBottomSymbolNewPosition(swapLines)
  const bottomSymbolRange = getBottomSymbolRange(swapLines)
  const blankSpaceRange = getBlankSpaceRange(swapLines, bottomSymbolRange)
  const selectionStartLineDelta = getSelectionStartLineDelta(swapLines)
  const selectedSymbolNewPosition = getSelectedSymbolNewPosition(
    swapLines,
    selectionStartLineDelta,
  )

  return {
    bottomSymbolNewPosition: bottomSymbolNewPosition,
    bottomSymbolRange: bottomSymbolRange,
    blankSpaceRange: blankSpaceRange,
    selectionStartLineDelta: selectionStartLineDelta,
    selectedSymbolNewPosition: selectedSymbolNewPosition,
  }
}

function getSelectedSymbolNewPosition(
  swapLines: SymbolSwapLines,
  selectionStartLineDelta: number,
): Position {
  const line = swapLines.selectedSymbolStartLine + selectionStartLineDelta

  return new Position(line, 0)
}

function getBottomSymbolNewPosition(swapLines: SymbolSwapLines): Position {
  const line = swapLines.bottomSymbolNewPositionLine

  return new Position(line, 0)
}

function getBottomSymbolRange(swapLines: SymbolSwapLines): Range {
  const startLine = swapLines.bottomSymbolStartLine
  const endLine = swapLines.bottomSymbolEndLine + 1

  const start = new Position(startLine, 0)
  const end = new Position(endLine, 0)

  return new Range(start, end)
}

function getBlankSpaceRange(
  swapLines: SymbolSwapLines,
  bottomSymbolRange: Range,
): Range {
  const startLine = swapLines.blankSpaceStartLine + 1
  const endLine = bottomSymbolRange.start.line

  const start = new Position(startLine, 0)
  const end = new Position(endLine, 0)

  return new Range(start, end)
}

function getSelectionStartLineDelta(swapLines: SymbolSwapLines): number {
  return swapLines.selectionDeltaStartLine - swapLines.selectionDeltaEndLine
}
