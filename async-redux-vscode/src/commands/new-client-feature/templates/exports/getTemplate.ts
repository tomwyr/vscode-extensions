import { ExportsTemplateValues } from "./generateTemplate"

export function getExportsTemplate(values: ExportsTemplateValues): string {
  return `${values.connectorExport}
`
}
