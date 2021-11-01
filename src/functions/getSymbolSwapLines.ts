import {
  SymbolSwapLines,
  MoveSymbolDirection,
  RelativeSymbolSwapLines,
} from "../types"

export function getSymbolSwapLines(
  swapLines: RelativeSymbolSwapLines,
  direction: MoveSymbolDirection,
): SymbolSwapLines {
  return direction == MoveSymbolDirection.up
    ? {
        bottomSymbolNewPositionLine: swapLines.adjacentSymbolStartLine,
        bottomSymbolStartLine: swapLines.selectedSymbolStartLine,
        bottomSymbolEndLine: swapLines.selectedSymbolEndLine,
        blankSpaceStartLine: swapLines.adjacentSymbolEndLine,
        selectionDeltaStartLine: swapLines.adjacentSymbolStartLine,
        selectionDeltaEndLine: swapLines.selectedSymbolStartLine,
        selectedSymbolStartLine: swapLines.selectedSymbolStartLine,
      }
    : {
        bottomSymbolNewPositionLine: swapLines.selectedSymbolStartLine,
        bottomSymbolStartLine: swapLines.adjacentSymbolStartLine,
        bottomSymbolEndLine: swapLines.adjacentSymbolEndLine,
        blankSpaceStartLine: swapLines.selectedSymbolEndLine,
        selectionDeltaStartLine: swapLines.adjacentSymbolEndLine,
        selectionDeltaEndLine: swapLines.selectedSymbolEndLine,
        selectedSymbolStartLine: swapLines.selectedSymbolStartLine,
      }
}
