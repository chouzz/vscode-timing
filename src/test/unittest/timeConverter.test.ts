'use strict';

import * as assert from 'assert';
import * as moment from 'moment';
import { TimeConverter } from '../../timeConverter';

describe('TimeConverter', () => {
    describe('epochToIsoUtc', () => {
        it('Should convert to ISO correctly.', () => {
            const testObject = new TimeConverter();

            const result = testObject.epochToIsoUtc('123456789000');

            assert.equal(result, '1973-11-29T21:33:09.000Z');
        });
    });

    describe('epochToIsoLocal', () => {
        it('Should convert to ISO correctly.', () => {
            const testObject = new TimeConverter();
            const result = testObject.epochToIsoLocal('123456789000');
            assert.equal(result, moment('1973-11-29T21:33:09.000Z').toISOString(true));
        });
    });

    describe('isoRfcToEpoch', () => {
        let testObject: TimeConverter;

        beforeEach('Set up test object.', () => {
            testObject = new TimeConverter();
        });

        it('Should convert to epoch correctly as s.', () => {
            const result = testObject.isoRfcToEpoch('1973-11-29T21:33:09.000Z', 's');

            assert.equal(result, '123456789');
        });

        it('Should convert to epoch correctly as ms.', () => {
            const result = testObject.isoRfcToEpoch('1973-11-29T21:33:09.000Z', 'ms');

            assert.equal(result, '123456789000');
        });

        it('Should convert to epoch correctly as ns.', () => {
            const result = testObject.isoRfcToEpoch('1973-11-29T21:33:09.000Z', 'ns');

            assert.equal(result, '123456789000000000');
        });

        it('Should throw an error if option is unknown.', () => {
            const result = testObject.isoRfcToEpoch('1973-11-29T21:33:09.000Z', 'ns');

            assert.throws(() => testObject.isoRfcToEpoch('1973-11-29T21:33:09.000Z', undefined));
        });
    });

    describe('isValidEpoch', () => {
        let testObject: TimeConverter;

        beforeEach('Set up test object.', () => {
            testObject = new TimeConverter();
        });

        it('Should return true if it is a valid epoch time.', () => {
            assert.equal(true, testObject.isValidEpoch('123456789'));
        });

        it('Should return false if it is an invalid epoch time.', () => {
            assert.equal(false, testObject.isValidEpoch('1973-11-29T21:33:09.000Z'));
        });
    });

    describe('isValidIsoRfc', () => {
        let testObject: TimeConverter;

        beforeEach('Set up test object.', () => {
            testObject = new TimeConverter();
        });

        it('Should return true if it is a valid ISO time.', () => {
            assert.equal(testObject.isValidIsoRfc('1973-11-29T21:33:09.000Z'), true);
        });

        it('Should return false if it is an invalid ISO time.', () => {
            assert.equal(testObject.isValidIsoRfc('123456789'), false);
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
            assert.equal(isNaN(Number(result)), false);
            assert.equal(now <= Number(result), true);
        });

        it('Should return current epoch time as milliseconds.', () => {
            const now = moment().valueOf();
            const result = testObject.getNowAsEpoch('ms');
            assert.equal(isNaN(Number(result)), false);
            assert.equal(now <= Number(result), true);
        });

        it('Should return current epoch time as milliseconds.', () => {
            const now = moment().valueOf() * 1000000;
            const result = testObject.getNowAsEpoch('ns');
            assert.equal(isNaN(Number(result)), false);
            assert.equal(now <= Number(result), true);
        });
    });

    describe('getNowAsIsoUtc', () => {

        it('Should return current time in ISO UTC format.', () => {
            const testObject = new TimeConverter();
            const now = moment();
            const result = testObject.getNowAsIsoUtc();

            // TODO: Fix me
            // assert.equal(moment(result).isUTC(), true);
            assert.equal(moment(result).isSameOrAfter(now), true);
        });

        it('Should return current time in ISO Local format.', () => {
            const testObject = new TimeConverter();
            const now = moment();
            const result = testObject.getNowAsIsoLocal();

            assert.equal(moment(result).isLocal(), true);
            assert.equal(moment(result).isSameOrAfter(now), true);
        });

    });
});
