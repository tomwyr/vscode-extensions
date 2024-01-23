import * as changeCase from "change-case"

export type CaseValue = {
  pascal: string
  snake: string
}

export function parseCaseValue(value: string) {
  const noCaseValue = changeCase.noCase(value).toLowerCase()

  return {
    pascal: changeCase.pascalCase(noCaseValue),
    snake: changeCase.snakeCase(noCaseValue),
  }
}
