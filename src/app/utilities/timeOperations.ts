import { time } from 'console';

export function timeSortResult(x1: Date, x2: Date) {
    const time1 = x1 !== null && x1 !== undefined ? new Date(x1.toString()).getTime() : 0;
    const time2 = x2 !== null && x2 !== undefined ? new Date(x2.toString()).getTime() : 0;
    return time1 - time2;
}