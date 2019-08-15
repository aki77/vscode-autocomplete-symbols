import * as vscode from "vscode";
import SymbolCompletionProvider from "./SymbolCompletionProvider";

export function activate(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration("autocompleteSymbols");
  if (config.enabledLanguages.length === 0) {
    return;
  }

  const provider = vscode.languages.registerCompletionItemProvider(
    config.enabledLanguages,
    new SymbolCompletionProvider(config.minLength)
  );
  context.subscriptions.push(provider);
}

export function deactivate() {}
