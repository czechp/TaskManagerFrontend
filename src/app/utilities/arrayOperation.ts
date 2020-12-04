export function existsById(array:any[], id: number):boolean{
    for(let item of array){
        if(item.id === id){
            return true;
        }
    }
    return false;
}

export function getElementById(array: any[], id: number):any{
    for(let item of array){
        if(item.id === id)
        {return item}
    }
    return null;
}

export function deleteFromArray(array: any[], id: number):any[]{
    return array.filter(x=>{x.id !== id});
}