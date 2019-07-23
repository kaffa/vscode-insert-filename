import { commands, workspace, window, ExtensionContext } from 'vscode';


function replaceEditorSelection() {
	const editor = window.activeTextEditor;
	if (editor === undefined) {
		return;
	}
	const selections = editor.selections;
	editor.edit((editBuilder) => {
	  selections.forEach((selection) => {
		let url = editor.document.fileName;
        let urlFormatted = url.replace(/\\/g, '/');
        let lastPart = urlFormatted.split('/').pop() || '';
		editBuilder.replace(selection, '');
		editBuilder.insert(selection.active, lastPart);
	  });
	});
  }
  
export function activate(context: ExtensionContext) {
	console.log('Congratulations, your extension "Insert Filename" is now active!');

	let disposable = commands.registerCommand('extension.insertFilename', () => replaceEditorSelection());

	context.subscriptions.push(disposable);
}

export function deactivate() {
    console.log('Your extension "Insert Filename" is now inactive!');
}