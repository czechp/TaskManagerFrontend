export function validationStatementHandler(object: any, validated: boolean):string{
    if(object === null){return 'Błąd! Taki obiekt nie istniej'}
    if(!validated){return 'Błąd! Niepoprawne dane'}
    return '';
}