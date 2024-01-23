import { config } from "../../../../config"
import { CaseValue } from "../../../../utils"
import { BusinessFeatureInput } from "../../businessFeatureInput"
import {
  BusinessStateTemplateValues,
  DefaultStateTemplateValues,
  FreezedStateTemplateValues,
} from "./generateTemplate"

export function getStateTemplateValues(
  input: BusinessFeatureInput,
): BusinessStateTemplateValues {
  const useFullFeatureNames = config.general.useFullFeatureNames()
  const generateFreezed = config.business.state.generateFreezed()

  return generateFreezed
    ? createFreezedStateTemplateValues(input.name, useFullFeatureNames)
    : createDefaultStateTemplateValues(input.name)
}

function createDefaultStateTemplateValues(
  featureName: CaseValue,
): DefaultStateTemplateValues {
  const stateName = getStateName(featureName)

  return {
    type: "default",
    stateName: stateName,
  }
}

function createFreezedStateTemplateValues(
  featureName: CaseValue,
  useFullFeatureNames: boolean,
): FreezedStateTemplateValues {
  const stateName = getStateName(featureName)

  let fileName = ""
  if (useFullFeatureNames) fileName += `${featureName.snake}_`
  fileName += "state"

  return {
    type: "freezed",
    fileName: fileName,
    stateName: stateName,
  }
}

function getStateName(featureName: CaseValue): string {
  return `${featureName.pascal}State`
}
