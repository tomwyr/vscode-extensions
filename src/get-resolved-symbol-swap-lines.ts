import {
  ResolvedSymbolSwapLines,
  MoveSymbolDirection,
  SymbolSwapLines,
} from "./types"

export function getResolvedSymbolSwapLines(
  swapLines: SymbolSwapLines,
  direction: MoveSymbolDirection,
): ResolvedSymbolSwapLines {
  return direction == MoveSymbolDirection.up
    ? {
        bottomSymbolNewPositionLine: swapLines.adjacentSymbolStartLine,
        bottomSymbolStartLine: swapLines.selectedSymbolStartLine,
        bottomSymbolEndLine: swapLines.selectedSymbolEndLine,
        blankStartLine: swapLines.adjacentSymbolEndLine,
        selectionDeltaStartLine: swapLines.adjacentSymbolStartLine,
        selectionDeltaEndLine: swapLines.selectedSymbolStartLine,
      }
    : {
        bottomSymbolNewPositionLine: swapLines.selectedSymbolStartLine,
        bottomSymbolStartLine: swapLines.adjacentSymbolStartLine,
        bottomSymbolEndLine: swapLines.adjacentSymbolEndLine,
        blankStartLine: swapLines.selectedSymbolEndLine,
        selectionDeltaStartLine: swapLines.adjacentSymbolEndLine,
        selectionDeltaEndLine: swapLines.selectedSymbolEndLine,
      }
}
