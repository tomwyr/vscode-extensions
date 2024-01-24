import fetch from "node-fetch"
import { Hover, HoverProvider, Position, TextDocument } from "vscode"

export const colorNameProvider: HoverProvider = {
  async provideHover(
    document,
    position,
    token
  ): Promise<Hover | undefined> {
    const hoveredText = getHoveredText(document, position)
    if (!hoveredText) return

    const colorHex = parseColorHex(hoveredText)
    if (!colorHex) return

    const colorName = await fetchColorName(colorHex)
    if (!colorName) return

    if (token.isCancellationRequested) return

    return new Hover(colorName)
  },
}

function getHoveredText(
  document: TextDocument,
  position: Position
): string | undefined {
  const hoveredRange = document.getWordRangeAtPosition(position)

  if (!hoveredRange) return

  return document.getText(hoveredRange)
}

function parseColorHex(hoveredRange: string): string | undefined {
  const colorRegex = /^0x([a-zA-Z0-9]{2})?[a-zA-Z0-9]{6}$/

  if (hoveredRange.match(colorRegex)?.length === 0) return

  return hoveredRange.slice(-6)
}

async function fetchColorName(colorHex: string): Promise<string | undefined> {
  const baseUrl = "https://api.color.pizza/v1/"

  try {
    const response = await fetch(baseUrl + colorHex)
    const responseData = await response.json() as ColorResponseData

    return responseData.colors[0].name
  } catch (err) {
    return
  }
}

type ColorResponseData = {
  colors: [
    {
      name: string
    }
  ]
}
