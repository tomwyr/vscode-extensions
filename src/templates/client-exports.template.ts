import * as changeCase from "change-case";

export function getClientExportsTemplate(featureName: string): string {
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());

  return `export '${snakeCaseFeatureName}_page.dart';
export '${snakeCaseFeatureName}_page_connector.dart';
export '${snakeCaseFeatureName}_view_model.dart';
export '${snakeCaseFeatureName}_view_model_factory.dart';
`;
}
