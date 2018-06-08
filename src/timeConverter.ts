'use strict';

import * as moment from 'moment';

class TimeConverter {

    public epochToIsoUtc(ms: string): string {
        const result = moment(ms, 'x').toISOString(false);
        return result;
    }

    public epochToIsoLocal(ms: string): string {
        const result = moment(ms, 'x').toISOString(true);
        return result;
    }

    public isoRfcToEpoch(date: string, targetFormat?: string): string {
        let result: number;
        switch (targetFormat) {
            case 's':
                result = moment(date).unix();
                break;
            case 'ms':
                result = moment(date).valueOf();
                break;
            case 'ns':
                result = moment(date).valueOf() * 1000000;
                break;
            default:
                throw new Error('Unknown option="' + targetFormat + '" detected.');
        }
        return result.toString();
    }

    public isValidEpoch(epoch: string): boolean {
        const result = moment(Number(epoch)).isValid();
        return result;
    }

    public isValidIsoRfc(date: string): boolean {
        let result = false;
        if (date !== undefined) {
            result = moment(date).isValid();
        }
        return result;
    }

public getNowAsEpoch(targetFormat: string): string {
        let result: number;
        switch (targetFormat) {
            case 's':
                result = moment().unix();
                break;
            case 'ms':
                result = moment().valueOf();
                break;
            case 'ns':
                result = moment().valueOf() * 1000000;
                break;
            default:
                throw new Error('Unknown option="' + targetFormat + '" detected.');
        }
        return result.toString();
    }

public getNowAsIsoUtc(): string {
        const result = moment().toISOString(false);
        return result;
    }

public getNowAsIsoLocal(): string {
        const result = moment().toISOString(true);
        return result;
    }
}

export { TimeConverter };
