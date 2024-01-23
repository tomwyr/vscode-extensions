import {
  BusinessStateTemplateValues,
  DefaultStateTemplateValues,
  FreezedStateTemplateValues,
} from "./generateTemplate"

export function getBusinessStateTemplate(
  config: BusinessStateTemplateValues,
): string {
  switch (config.type) {
    case "default":
      return getDefaultStateTemplate(config)
    case "freezed":
      return getFreezedStateTemplate(config)
  }
}

function getDefaultStateTemplate(config: DefaultStateTemplateValues): string {
  return `class ${config.stateName} {
  const ${config.stateName}();

  ${config.stateName} copyWith() => ${config.stateName}();
}
`
}

function getFreezedStateTemplate(config: FreezedStateTemplateValues): string {
  return `import 'package:freezed_annotation/freezed_annotation.dart';

part '${config.fileName}.freezed.dart';

@freezed
class ${config.stateName} with _$${config.stateName} {
  factory ${config.stateName}() = _${config.stateName};
}
`
}
