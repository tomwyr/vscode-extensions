import * as changeCase from "change-case";
import * as constants from "../constants";

export function getConnectorTemplate(
  featureName: string,
  widgetSuffix: string,
  connectorIncludeWidgetSuffix: boolean,
  stateName: string,
  stateImportPath: string
): string {
  const pascalCaseFeatureName = changeCase.pascalCase(featureName.toLowerCase());
  const snakeCaseFeatureName = changeCase.snakeCase(featureName.toLowerCase());

  const widgetName = `${pascalCaseFeatureName}${widgetSuffix}`;
  const pascalCaseWidgetName = changeCase.pascalCase(widgetName.toLowerCase());

  let connectorName = featureName;
  if (connectorIncludeWidgetSuffix) connectorName += widgetSuffix;
  const pascalCaseConnectorName=changeCase.pascalCase(connectorName.toLowerCase());
   
  const pageConnectorName = `${pascalCaseConnectorName}Connector`;
  const viewModelName = `${pascalCaseFeatureName}ViewModel`;
  const viewModelFactoryName = `${pascalCaseFeatureName}ViewModelFactory`;
  const pageName = pascalCaseWidgetName;
  const storeConnectorTypeParameters = `${stateName}, ${viewModelName}`;

  let reduxImports = `${constants.asyncRedux.importStatement}`;
  if (stateImportPath != constants.asyncRedux.importPath) {
    reduxImports += `\nimport '${stateImportPath}';`;
  }

  return `import 'package:flutter/material.dart';
${reduxImports}
import '${snakeCaseFeatureName}.dart';

class ${pageConnectorName} extends StatelessWidget {
  @override
  Widget build(BuildContext context) => StoreConnector<${storeConnectorTypeParameters}>(
        vm: () => ${viewModelFactoryName}(),
        builder: (context, viewModel) => ${pageName}(),
      );
}
`;
}
