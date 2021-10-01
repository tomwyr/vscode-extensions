import { Position, Range } from "vscode"
import { MoveSymbolParams, ResolvedSymbolSwapLines } from "./types"

export function getMoveSymbolParams(
  swapLines: ResolvedSymbolSwapLines,
): MoveSymbolParams {
  const bottomSymbolNewPosition = getBottomSymbolNewPosition(swapLines)
  const bottomSymbolRange = getBottomSymbolRange(swapLines)
  const blankSpaceRange = getBlankSpaceRange(swapLines, bottomSymbolRange)
  const selectionStartLineDelta = getSelectionStartLineDelta(swapLines)

  return {
    bottomSymbolNewPosition: bottomSymbolNewPosition,
    bottomSymbolRange: bottomSymbolRange,
    blankSpaceRange: blankSpaceRange,
    selectionStartLineDelta: selectionStartLineDelta,
  }
}

function getBottomSymbolNewPosition(
  swapLines: ResolvedSymbolSwapLines,
): Position {
  const line = swapLines.bottomSymbolNewPositionLine

  return new Position(line, 0)
}

function getBottomSymbolRange(swapLines: ResolvedSymbolSwapLines): Range {
  const startLine = swapLines.bottomSymbolStartLine
  const endLine = swapLines.bottomSymbolEndLine + 1

  const start = new Position(startLine, 0)
  const end = new Position(endLine, 0)

  return new Range(start, end)
}

function getBlankSpaceRange(
  swapLines: ResolvedSymbolSwapLines,
  bottomSymbolRange: Range,
): Range {
  const startLine = swapLines.blankSpaceStartLine + 1
  const endLine = bottomSymbolRange.start.line

  const start = new Position(startLine, 0)
  const end = new Position(endLine, 0)

  return new Range(start, end)
}

function getSelectionStartLineDelta(
  swapLines: ResolvedSymbolSwapLines,
): number {
  return swapLines.selectionDeltaStartLine - swapLines.selectionDeltaEndLine
}
