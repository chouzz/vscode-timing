/*!
 * ---------------------------------------------------------------------------------------------
 *  Copyright (c) Leo Hanisch. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------
 */

'use strict';

class InputDefinition {
    private _inputAsMs: number;
    private _originalUnit: string;
    private _originalInput: string;

    constructor(userInput: string, unit?: string) {
        this.initialize(userInput, unit);
    }

    public get inputAsMs(): number {
        return this._inputAsMs;
    }

    public get originalUnit(): string {
        return this._originalUnit;
    }

    public get originalInput(): string {
        return this._originalInput;
    }

    private initialize(userInput: string, unit?: string) {
        this._originalInput = userInput;
        this._originalUnit = undefined;
        this._inputAsMs = undefined;

        // If unit is given convert number to ms and set original unit
        if (userInput && !isNaN(Number(userInput))) {
            if (unit) {
                this._originalUnit = unit;
                switch (unit) {
                    case 's':
                        this._inputAsMs = Number(userInput) * 1000;
                        break;
                    case 'ms':
                        this._inputAsMs = Number(userInput);
                        break;
                    case 'ns':
                        this._inputAsMs = Number(userInput) / 1000000;
                        break;
                    default:
                        throw Error('Unknown format="' + unit + '" was given.');
                }
                // If unit is not given, determine it by checking the length
            } else if (!isNaN(Number(userInput))) {
                if (userInput.length <= 11) {
                    this._inputAsMs = Number(userInput) * 1000;
                    this._originalUnit = 's';
                } else if (userInput.length <= 14) {
                    this._inputAsMs = Number(userInput);
                    this._originalUnit = 'ms';
                } else if (userInput.length <= 21) {
                    this._inputAsMs = Number(userInput) / 1000000;
                    this._originalUnit = 'ns';
                } else {
                    throw Error('Unknown format: number with ' + userInput.length + ' digits.');
                }
            }
        }
    }
}

export { InputDefinition };
