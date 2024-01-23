import { WidgetTemplateValues } from "./generateTemplate"

export function getWidgetTemplate(values: WidgetTemplateValues): string {
  return `${values.imports}

class ${values.widgetName} extends StatelessWidget {
  ${values.constructor}

  @override
  Widget build(BuildContext context) => Container();
}
`
}

export function getDefaultConstructorTemplate(widgetName: string) {
  return `const ${widgetName}({Key? key}) : super(key: key);`
}

export function getViewModelConstructorTemplate(
  widgetName: string,
  viewModelName: string,
) {
  return `const ${widgetName}({
    Key? key,
    required this.viewModel,
  }) : super(key: key);
  
  final ${viewModelName} viewModel;`
}
