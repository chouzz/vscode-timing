/*!
 * ---------------------------------------------------------------------------------------------
 *  Copyright (c) Leo Hanisch. All rights reserved.
 *  Licensed under the MIT License. See LICENSE.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------
 */

'use strict';

import * as assert from 'assert';
import * as moment from 'moment';
import { TimeConverter } from '../../util/timeConverter';

describe('TimeConverter', () => {
    describe('epochToISOUtc', () => {
        it('Should convert to ISO correctly.', () => {
            const testObject = new TimeConverter();

            const result = testObject.epochToISOUtc('123456789000');

            assert.strictEqual(result, '1973-11-29T21:33:09.000Z');
        });
    });

    describe('epochToISOLocal', () => {
        it('Should convert to ISO correctly.', () => {
            const testObject = new TimeConverter();
            const result = testObject.epochToIsoLocal('123456789000');
            assert.strictEqual(result, moment('1973-11-29T21:33:09.000Z').toISOString(true));
        });
    });

    describe('epochToCustom', () => {
        it('Should convert to ISO correctly.', () => {
            const testObject = new TimeConverter();
            const result = testObject.epochToCustom('123456789000', 'YYYY');
            assert.strictEqual(result, '1973');
        });
    });

    describe('isoRfcToEpoch', () => {
        let testObject: TimeConverter;

        beforeEach('Set up test object.', () => {
            testObject = new TimeConverter();
        });

        it('Should convert to epoch correctly as s.', () => {
            const result = testObject.isoRfcToEpoch('1973-11-29T21:33:09.000Z', 's');

            assert.strictEqual(result, '123456789');
        });

        it('Should convert to epoch correctly as ms.', () => {
            const result = testObject.isoRfcToEpoch('1973-11-29T21:33:09.000Z', 'ms');

            assert.strictEqual(result, '123456789000');
        });

        it('Should convert to epoch correctly as ns.', () => {
            const result = testObject.isoRfcToEpoch('1973-11-29T21:33:09.000Z', 'ns');

            assert.strictEqual(result, '123456789000000000');
        });

        it('Should throw an error if option is unknown.', () => {
            const result = testObject.isoRfcToEpoch('1973-11-29T21:33:09.000Z', 'ns');

            assert.throws(() => testObject.isoRfcToEpoch('1973-11-29T21:33:09.000Z', undefined));
        });
    });

    describe('isoRfcToCustom', () => {
        it('Should convert to ISO correctly.', () => {
            const testObject = new TimeConverter();
            const result = testObject.isoRfcToCustom('1973-11-29T21:33:09.000Z', 'YYYY-MM-DD');
            assert.strictEqual(result, '1973-11-29');
        });
    });

    describe('customToEpoch', () => {
        let testObject: TimeConverter;

        beforeEach('Set up test object.', () => {
            testObject = new TimeConverter();
        });

        it('Should convert to epoch correctly as s.', () => {
            const result = testObject.customToEpoch('2018/07/07', 'YYYY/MM/DD', 's');

            assert.strictEqual(Number(result), moment('2018/07/07', 'YYYY/MM/DD').unix());
        });

        it('Should convert to epoch correctly as ms.', () => {
            const result = testObject.customToEpoch('2018/07/07', 'YYYY/MM/DD', 'ms');

            assert.strictEqual(Number(result), moment('2018/07/07', 'YYYY/MM/DD').valueOf());
        });

        it('Should convert to epoch correctly as ns.', () => {
            const result = testObject.customToEpoch('2018/07/07', 'YYYY/MM/DD', 'ns');

            assert.strictEqual(Number(result), moment('2018/07/07', 'YYYY/MM/DD').valueOf() * 1000000);
        });

        it('Should throw an error if option is unknown.', () => {
            assert.throws(() => testObject.customToEpoch('2018/07/07', 'YYYY/MM/DD', undefined));
        });
    });

    describe('customToISOLocal', () => {
        it('Should convert to ISO Local correctly.', () => {
            const testObject = new TimeConverter();
            const result = testObject.customToISOLocal('2018-05-05', 'YYYY-MM-DD');
            assert.strictEqual(result, moment('2018-05-05', 'YYYY-MM-DD').toISOString(true));
        });
    });

    describe('customToISOUtc', () => {
        it('Should convert to ISO UTC correctly.', () => {
            const testObject = new TimeConverter();
            const result = testObject.customToISOUtc('2018-05-05', 'YYYY-MM-DD');
            assert.strictEqual(result, moment('2018-05-05', 'YYYY-MM-DD').toISOString(false));
        });
    });

    describe('isValidEpoch', () => {
        let testObject: TimeConverter;

        beforeEach('Set up test object.', () => {
            testObject = new TimeConverter();
        });

        it('Should return true if it is a valid epoch time.', () => {
            assert.strictEqual(true, testObject.isValidEpoch('123456789'));
        });

        it('Should return false if it is an invalid epoch time.', () => {
            assert.strictEqual(false, testObject.isValidEpoch('1973-11-29T21:33:09.000Z'));
            assert.strictEqual(false, testObject.isValidEpoch(''));
        });
    });

    describe('isValidIsoRfc', () => {
        let testObject: TimeConverter;

        beforeEach('Set up test object.', () => {
            testObject = new TimeConverter();
        });

        it('Should return true if it is a valid ISO time.', () => {
            assert.strictEqual(testObject.isValidIsoRfc('1973-11-29T21:33:09.000Z'), true);
        });

        it('Should return false if it is an invalid ISO time.', () => {
            assert.strictEqual(testObject.isValidIsoRfc('123456789'), false);
        });
    });

    describe('isValidCustom', () => {
        let testObject: TimeConverter;

        beforeEach('Set up test object.', () => {
            testObject = new TimeConverter();
        });

        it('Should return true if it is a valid custom time.', () => {
            assert.strictEqual(testObject.isValidCustom('2018/07/07', 'YYYY/MM/DD'), true);
        });

        it('Should return false if it is an invalid custom time.', () => {
            assert.strictEqual(testObject.isValidCustom('123456789', 'YYYY/MM/DD'), false);
        });

        it('Should return false if it is undefined.', () => {
            assert.strictEqual(testObject.isValidCustom(undefined, 'YYYY/MM/DD'), false);
            assert.strictEqual(testObject.isValidCustom('1232342', undefined), false);
        });

    });

    describe('getNowAsCustom', () => {
        let testObject: TimeConverter;

        beforeEach('Set up test object.', () => {
            testObject = new TimeConverter();
        });

        it('Should return current time in custom format.', () => {
            const now = moment(moment().format('YYYY/MM/DD'), 'YYYY/MM/DD').unix();
            const result = testObject.getNowAsCustom('YYYY/MM/DD');

            assert.strictEqual(now <= moment(result, 'YYYY/MM/DD').unix(), true);
        });
    });

    describe('getNowAsEpoch', () => {
        let testObject: TimeConverter;

        beforeEach('Set up test object.', () => {
            testObject = new TimeConverter();
        });

        it('Should return current epoch time as seconds.', () => {
            const now = moment().unix();
            const result = testObject.getNowAsEpoch('s');
            assert.strictEqual(isNaN(Number(result)), false);
            assert.strictEqual(now <= Number(result), true);
        });

        it('Should return current epoch time as milliseconds.', () => {
            const now = moment().valueOf();
            const result = testObject.getNowAsEpoch('ms');
            assert.strictEqual(isNaN(Number(result)), false);
            assert.strictEqual(now <= Number(result), true);
        });

        it('Should return current epoch time as milliseconds.', () => {
            const now = moment().valueOf() * 1000000;
            const result = testObject.getNowAsEpoch('ns');
            assert.strictEqual(isNaN(Number(result)), false);
            assert.strictEqual(now <= Number(result), true);
        });

        it('Should throw an exception if epoch format is not known.', () => {
            assert.throws(() => testObject.getNowAsEpoch('invalid Format'));
        });
    });

    describe('getNowAsISOUtc', () => {

        it('Should return current time in ISO UTC format.', () => {
            const testObject = new TimeConverter();
            const now = moment();
            const result = testObject.getNowAsIsoUtc();

            assert.strictEqual(moment(result).isSameOrAfter(now), true);
        });

        it('Should return current time in ISO Local format.', () => {
            const testObject = new TimeConverter();
            const now = moment();
            const result = testObject.getNowAsIsoLocal();

            assert.strictEqual(moment(result).isLocal(), true);
            assert.strictEqual(moment(result).isSameOrAfter(now), true);
        });
    });

    describe('epochToISODuration', () => {
        it('Should convert to the correct ISO duration.', () => {
            const testObject = new TimeConverter();
            const result = testObject.epochToISODuration(123456789);

            assert.strictEqual(result, 'PT34H17M36.789S');
        });
    });

    describe('epochToReadableDuration', () => {
        let testObject: TimeConverter;

        beforeEach('Set up test object.', () => {
            testObject = new TimeConverter();
        });

        it('should only consist of "0 ms".', () => {
            const input = 0;
            const expected = '0ms';

            const result = testObject.epochToReadableDuration(input);

            assert.strictEqual(result, expected);
        });

        it('should only consist of "ms".', () => {
            const input = 123;
            const expected = '123ms';

            const result = testObject.epochToReadableDuration(input);

            assert.strictEqual(result, expected);
        });

        it('should only consist of "s" and "ms".', () => {
            const input = 6123;
            const expected = '6s, 123ms';

            const result = testObject.epochToReadableDuration(input);

            assert.strictEqual(result, expected);
        });

        it('should only consist of "min", "s" and "ms".', () => {
            const input = 123456;
            const expected = '2min, 3s, 456ms';

            const result = testObject.epochToReadableDuration(input);

            assert.strictEqual(result, expected);
        });

        it('should only consist of "h", "min", "s" and "ms".', () => {
            const input = 12345678;
            const expected = '3h, 25min, 45s, 678ms';

            const result = testObject.epochToReadableDuration(input);

            assert.strictEqual(result, expected);
        });

        it('should consist of "d", "h", "min", "s" and "ms".', () => {
            const input = 123456789;
            const expected = '1d, 10h, 17min, 36s, 789ms';

            const result = testObject.epochToReadableDuration(input);

            assert.strictEqual(result, expected);
        });

        it('should consist of "w", "d", "h", "min", "s" and "ms".', () => {
            const input = 12345678900;
            const expected = '20w, 2d, 21h, 21min, 18s, 900ms';

            const result = testObject.epochToReadableDuration(input);

            assert.strictEqual(result, expected);
        });
    });
});
