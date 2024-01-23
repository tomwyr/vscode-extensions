import { CaseValue, writeFileData } from "../../utils"

export interface DefaultTemplateInput {
  name: CaseValue
  targetDirectory: string
}

export interface DefaultTemplateValues {}

export interface GenerateDefaultTemplateParams<T, R> {
  input: T
  getTargetPath: (input: T) => string
  getTemplateValues: (input: T) => Promise<R> | R
  getTemplate: (templateValues: R) => string
}

export async function generateDefaultTemplate<
  T extends DefaultTemplateInput,
  R extends DefaultTemplateValues,
>(params: GenerateDefaultTemplateParams<T, R>) {
  const targetPath = params.getTargetPath(params.input)

  const templateValues = await params.getTemplateValues(params.input)

  const template = params.getTemplate(templateValues)

  await writeFileData(targetPath, template)
}
