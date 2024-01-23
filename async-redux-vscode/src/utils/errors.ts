export const errors = {
  nameNotProvided: Error("The name must not be empty"),
  directoryNotSelected: Error("A valid directory must be selected"),
  actionTypeNotSelected: Error("The action type must be selected"),
  notProjectWorkspace: Error("Current workspace is not a valid Dart project"),
  fileNotInProject: Error(
    "Selected file path is outside of current project workspace",
  ),
  unknownProjectName: Error(
    "Project pubspec.yaml file does not contain valid `name` entry",
  ),
  targetFileExists: (targetFile: string) =>
    Error(`${targetFile} already exists`),
}
