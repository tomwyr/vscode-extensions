import { ConnectorTemplateValues } from "./generateTemplate"

export function getConnectorTemplate(values: ConnectorTemplateValues): string {
  return `${values.imports}

class ${values.connectorName} extends StatelessWidget {
  const ${values.connectorName}({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => StoreConnector<${values.connectorTypeParameters}>(
        vm: () => ${values.viewModelFactoryName}(),
        builder: (context, viewModel) => ${values.widgetName}(${values.widgetArguments}),
      );
}
`
}
