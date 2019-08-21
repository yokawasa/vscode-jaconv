import * as vscode from 'vscode';
import { JaconvCommands } from './jaconvCommands';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.jaconv.commands', JaconvCommands )
  );
}

export function deactivate() {}