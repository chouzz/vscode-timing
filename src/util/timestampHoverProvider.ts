/*!
 * ---------------------------------------------------------------------------------------------
 *  Copyright (c) Leo Hanisch. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------
 */

'use strict';

import * as vscode from 'vscode';
import { InputDefinition } from './inputDefinition';
import { TimeConverter } from './timeConverter';

class TimestampHoverProvider implements vscode.HoverProvider, vscode.Disposable {

    private _timeConverter: TimeConverter;

    private _disposables: vscode.Disposable[];

    private _targetFormat: string;
    private _enabled: boolean;

    constructor(timeConverter: TimeConverter) {
        this._timeConverter = timeConverter;

        this.updateTimestampTargetFormatDeprecated();

        // Compatibility reasons: only initialize with new settings when old setting has default values (is not set)
        if (this._enabled && this._targetFormat === 'utc') {
            this.updateTimestampEnabled();
            this.updateTimestampTargetFormat();
        }
        vscode.workspace.onDidChangeConfiguration((changedEvent) => {
            if (changedEvent.affectsConfiguration('timing.hoverTargetFormat')) {
                this.updateTimestampTargetFormatDeprecated();
            } else if (changedEvent.affectsConfiguration('timing.hoverTimestamp.targetFormat')) {
                this.updateTimestampTargetFormat();
            } else if (changedEvent.affectsConfiguration('timing.hoverTimestamp.enabled')) {
                this.updateTimestampEnabled();
            }
        }, this, this._disposables);
    }

    public provideHover(
        document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken):
        vscode.ProviderResult<vscode.Hover> {
        const timeRange = document.getWordRangeAtPosition(position, new RegExp('\\d+'));
        let result: vscode.Hover;
        if (timeRange !== undefined) {
            const hoveredWord = document.getText(timeRange);
            if (this._timeConverter.isValidEpoch(hoveredWord)) {
                const input = new InputDefinition(hoveredWord);
                const prefix = '*Epoch Unit*: `' + input.originalUnit + '`  \n*Timestamp*: `';

                // Is the feature enabled?
                if (this._enabled) {
                    if (this._targetFormat === 'utc') {
                        const utc = this._timeConverter.epochToISOUtc(input.inputAsMs.toString());
                        result = new vscode.Hover(prefix + utc + '`', timeRange);
                    } else if (this._targetFormat === 'local') {
                        const local = this._timeConverter.epochToIsoLocal(input.inputAsMs.toString());
                        result = new vscode.Hover(prefix + local + '`', timeRange);
                    } else if (this._targetFormat) {
                        const custom = this._timeConverter.epochToCustom(
                            input.inputAsMs.toString(),
                            this._targetFormat);
                        result = new vscode.Hover(prefix + custom + '`', timeRange);
                    } else {
                        result = undefined;
                    }
                } else {
                    result = undefined;
                }
            }
        }

        return result;
    }

    public dispose(): void {
        this._disposables.forEach((disposable) => disposable.dispose());
    }

    private updateTimestampTargetFormat(): void {
        const config = vscode.workspace.getConfiguration('timing.hoverTimestamp')
            .get<string>('targetFormat', 'utc');

        this._targetFormat = config;
    }

    private updateTimestampEnabled(): void {
        const config = vscode.workspace.getConfiguration('timing.hoverTimestamp')
            .get<boolean>('enabled', true);

        this._enabled = config;
    }

    private updateTimestampTargetFormatDeprecated(): void {
        // When the new config is already set(!= utc), prioritize the new config's values
        // Otherwise use the old configurations values
        const newTargetFormat = vscode.workspace.getConfiguration('timing.hoverTimestamp')
            .get<string>('targetFormat', 'utc');
        const newEnabled = vscode.workspace.getConfiguration('timing.hoverTimestamp')
            .get<boolean>('enabled', true);

        if (newTargetFormat === 'utc' && newEnabled) { // The default values
            const config = vscode.workspace.getConfiguration('timing')
                .get<string>('hoverTargetFormat', 'utc');

            if (config === 'disable') {
                this._enabled = false;
            } else {
                this._enabled = true;
                this._targetFormat = config;
            }
        } else {
            this._enabled = newEnabled;
            this._targetFormat = newTargetFormat;
        }
    }
}

export { TimestampHoverProvider };
