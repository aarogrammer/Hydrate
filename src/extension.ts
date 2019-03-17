import * as vscode from 'vscode';
import { Hydrate } from './Hydrate';

/**
 * @description Called when extension is activated
 * @param context 
 */
export function activate(context: vscode.ExtensionContext) {

	console.log('Hydrate is now activated.');

	const disposable = vscode.commands.registerCommand('extension.hydrate', async () => {
		try {
			const userInput:any = await vscode.window.showInputBox({
				placeHolder: 'Amount of hours you intend to work for.',
				prompt: 'Enter amount of hours you intend to work for.',
				value: '8',
				ignoreFocusOut: true,
			});

			if (isNaN(parseInt(userInput))) {
				throw Error('You must insert a number');
			}

			const hydrate = new Hydrate(vscode, userInput);

			hydrate.init();
		} catch (err) {
			vscode.window.showErrorMessage(err.message);
			console.error(err);
		}
	});
	context.subscriptions.push(disposable);
}

/**
 * @description Called when extension is deactivated
 * @param context 
 */
export function deactivate(context: vscode.ExtensionContext) {

	console.log('The extension Hydrate is now uninstalled!');

	const disposable = vscode.commands.registerCommand('extension.hydrate', () => {
		vscode.window.showInformationMessage('Hydrate has been uninstalled');
	});

	context.subscriptions.push(disposable);
}
