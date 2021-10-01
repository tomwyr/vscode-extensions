import { DocumentSymbol, Position, Range } from "vscode"

export enum MoveSymbolDirection {
  up,
  down,
}

export type SymbolSearchResult = {
  searched: DocumentSymbol
  previous: DocumentSymbol | undefined
  next: DocumentSymbol | undefined
}

export type SymbolSwapLines = {
  selectedSymbolStartLine: number
  selectedSymbolEndLine: number
  adjacentSymbolStartLine: number
  adjacentSymbolEndLine: number
}

export type ResolvedSymbolSwapLines = {
  bottomSymbolNewPositionLine: number
  bottomSymbolStartLine: number
  bottomSymbolEndLine: number
  blankSpaceStartLine: number
  selectionDeltaStartLine: number
  selectionDeltaEndLine: number
}

export type MoveSymbolParams = {
  bottomSymbolNewPosition: Position
  bottomSymbolRange: Range
  blankSpaceRange: Range
  selectionStartLineDelta: number
}
