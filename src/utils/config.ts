import { workspace } from "vscode";
import * as constants from "../constants";

export const config = {
  enableSnippets: getEnableSnippets,
  business: {
    generateExports: getBusinessGenerateExports,
    state: {
      name: getStateName,
      importPath: getStateImportPath,
      generateFreezed: getStateGenerateFreezed,
    },
    action: {
      baseName: getActionBaseName,
      importPath: getActionImportPath,
      includeState: getActionIncludeState,
    },
  },
  client: {
    generateExports: getClientGenerateExports,
    widget: {
      suffix: getWidgetSuffix,
    },
    connector: {
      includeWidgetSuffix: getConnectorIncludeWidgetSuffix,
    },
    viewModel: {
      baseName: getViewModelBaseName,
      importPath: getViewModelImportPath,
    },
    viewModelFactory: {
      baseName: getViewModelFactoryBaseName,
      importPath: getViewModelFactoryImportPath,
      includeState: getViewModelFactoryIncludeState,
    },
  },
};

function getEnableSnippets(): boolean {
  return getConfigValue("enableSnippets") || true;
}

function getBusinessGenerateExports(): boolean {
  return getConfigValue("business.generateExports") || true;
}

function getStateGenerateFreezed(): boolean {
  return getConfigValue("business.state.generateFreezed") || false;
}

function getStateName(): string {
  return getConfigValue("business.state.name") || constants.asyncRedux.stateClass;
}

function getStateImportPath(): string {
  return (
    getConfigValue("business.state.importPath") ||
    constants.asyncRedux.importPath
  );
}

function getActionBaseName(): string {
  return getConfigValue("business.action.baseName") || constants.asyncRedux.actionClass;
}

function getActionImportPath(): string {
  return getConfigValue("business.action.importPath") || constants.asyncRedux.importPath;
}

function getActionIncludeState(): boolean {
  return getConfigValue("business.action.includeState") ||true;
}

function getClientGenerateExports(): boolean {
  return getConfigValue("client.generateExports") || true;
}

function getWidgetSuffix(): string {
  return getConfigValue("client.widget.suffix") || "";
}

function getViewModelBaseName(): string {
  return (
    getConfigValue("client.viewModel.baseName") ||
    constants.asyncRedux.viewModelClass
  );
}

function getViewModelImportPath(): string {
  return (
    getConfigValue("client.viewModel.importPath") ||
    constants.asyncRedux.importPath
  );
}

function getViewModelFactoryBaseName(): string {
  return (
    getConfigValue("client.viewModelFactory.baseName") ||
    constants.asyncRedux.viewModelFactoryClass
  );
}

function getViewModelFactoryImportPath(): string {
  return (
    getConfigValue("client.viewModelFactory.importPath") ||
    constants.asyncRedux.importPath
  );
}

function getViewModelFactoryIncludeState(): boolean {
  return getConfigValue("client.viewModelFactory.includeState") || false;
}

function getConnectorIncludeWidgetSuffix(): boolean {
  return getConfigValue("client.connector.includeWidgetSuffix") || true;
}

function getConfigValue<T>(configItemName: string): T | undefined {
  return workspace
    .getConfiguration(constants.extension.name)
    .get(configItemName);
}
