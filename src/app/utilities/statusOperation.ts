export function statusToString(status: string): string {
    let result = '';
    switch (status) {
        case 'TODO': {
            result = 'Do wykonania';
            break;
        }
        case 'IN_PROGRESS': {
            result = 'Aktualne';
            break;
        }
        case 'DONE': {
            result = 'Zakończone';
            break;
        }
        default: {
            result = 'Nie rozpoznano statusu';
        }
    }
    return result;
}