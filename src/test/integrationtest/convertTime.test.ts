'use strict';

import * as assert from 'assert';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import command = require('../../commands/convertTime');
import TimeConverter = require('../../timeconverter');

suite('convertTime', () => {

    let testEditor: vscode.TextEditor;
    setup( async () => {
        const ext = vscode.extensions.getExtension('HaaLeo.timing');
        if (!ext.isActive) {
            await ext.activate();
        }

        if (vscode.workspace.workspaceFolders !== undefined) {
            const uris = await vscode.workspace.findFiles('*.txt');
            const file = await vscode.workspace.openTextDocument(uris[0]);
            testEditor = await vscode.window.showTextDocument(file);
        }
    });

    test('should calculate result directly.', async () => {
        testEditor.selection = new vscode.Selection(new vscode.Position(3, 31), new vscode.Position(3, 40));
        const spy = sinon.spy(vscode.window, 'showInputBox');
        await vscode.commands.executeCommand('timing.convertTime');
        assert.equal(true, spy.calledOnceWith({
            placeHolder: '123456789',
            value: 'Result: ' + '1973-11-29T21:33:09.000Z',
            valueSelection: ['Result: '.length, 'Result: '.length + '1973-11-29T21:33:09.000Z'.length],
            prompt: 'Input: 123456789(s)'
        }));
    });
});
