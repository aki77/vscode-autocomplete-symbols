import {
  commands,
  SymbolKind,
  SymbolInformation,
  CompletionItemProvider,
  TextDocument,
  Position,
  CompletionItem,
  CompletionItemKind,
  MarkdownString
} from "vscode";

export default class SymbolCompletionProvider
  implements CompletionItemProvider {
  private enabled: boolean = false;

  constructor(private minLength: number) {}

  public async provideCompletionItems(
    document: TextDocument,
    position: Position
  ) {
    if (!this.enabled) {
      return null;
    }

    const linePrefix = document
      .lineAt(position)
      .text.substr(0, position.character);
    const matched = linePrefix.match(/(\w+)$/);
    if (!matched) {
      return null;
    }

    const query = matched[1];
    if (query.length < this.minLength) {
      return null;
    }

    return await this.buildCompletionItems(query);
  }

  public enable() {
    this.enabled = true;
  }

  public disable() {
    this.enabled = false;
  }

  private async buildCompletionItems(query: string): Promise<CompletionItem[]> {
    const symbols = (await commands.executeCommand(
      "vscode.executeWorkspaceSymbolProvider",
      query
    )) as SymbolInformation[];

    const methods: Map<string, Set<string>> = new Map();
    symbols
      .filter(({ kind }) => kind === SymbolKind.Method)
      .forEach(symbol => {
        const containerNames: Set<string> =
          methods.get(symbol.name) || new Set();
        containerNames.add(symbol.containerName);
        methods.set(symbol.name, containerNames);
      });

    return Array.from(methods).map(([name, containerNames]) => {
      const item = new CompletionItem(name, CompletionItemKind.Method);
      const markdown = Array.from(containerNames)
        .map(containerName => `- ${containerName}`)
        .join("\n");
      item.documentation = new MarkdownString(markdown);
      return item;
    });
  }
}
