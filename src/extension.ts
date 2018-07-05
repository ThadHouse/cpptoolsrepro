'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as tools from 'vscode-cpptools';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "cpptoolsrepro" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);


    const cppTools = await tools.getCppToolsApi(tools.Version.v1);
    if (cppTools) {
        context.subscriptions.push(cppTools);
        const provider: tools.CustomConfigurationProvider = {
            name: 'test',
            extensionId: 'testExtension',
            async canProvideConfiguration(uri, token): Promise<boolean> {
                return true;
            },
            async provideConfigurations(uris, token): Promise<tools.SourceFileConfigurationItem[]> {
                const arr: tools.SourceFileConfigurationItem[] = [];
                for (const uri of uris) {
                    arr.push({
                        uri: uri.toString(),
                        configuration: {
                            includePath: [],
                            defines: [],
                            intelliSenseMode: "clang-x64",
                            standard: "c++14",
                            compilerPath: "C:\\frc\\bin\\arm-frc-linux-gnueabi-g++.exe"
                        }
                    });
                }
                return arr;
            },
            dispose() {

            }
        };
        cppTools.registerCustomConfigurationProvider(provider);
        cppTools.didChangeCustomConfiguration(provider);
    }
}

// this method is called when your extension is deactivated
export function deactivate() {
}
