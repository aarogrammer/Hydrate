// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
let count = 0;
const counter = () => {
	count++;
	// let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
	if (count <=1) {
		return `$(heart) You should have consumed ${count} glass of water`;
	} 
	if(count >= 8) {
		// return `Depending on your weight and height, check with a medical professional if you can consume more water. You should never over hydrate.`;
		return `$(check) You should have consumed the recommended amount of water for today. Congratulations!`;
	}
	return `$(heart) You should have consumed ${count} glasses of water`;
};

const goalCheck = () => {

	if (count > 6 && count <= 8) {
		return `You should have consumed the recommended amount of water for today. Congratulations!`;
	}
	if (count < 6) {
		return 'Make sure to grab a glass of water!';
	}	

};
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Hydrate is now activated.');

	let disposable = vscode.commands.registerCommand('extension.hydrate', () => {
		// The code you place here will be executed every time your command is executed
		let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
		vscode.window.showInformationMessage(`We will keep track of how much water you should have consumed in the bottom left status bar.`);
		statusBarItem.show();

		setInterval(() => {
			const message = counter();
			statusBarItem.text = message;
			statusBarItem.color = "White";
		}, 1000);
	});
	setInterval(() => {
		const goal:any = goalCheck();
		vscode.window.showInformationMessage(goal);
	}, 1000);
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate(context: vscode.ExtensionContext) {
		// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('The extension "hydrate" is now uninstalled!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.hydrate', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Uninstalled');
	});

	context.subscriptions.push(disposable);
}
