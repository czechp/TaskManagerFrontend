export function getPriority(taskPriority: string){
    switch(taskPriority){
        case 'LOW': return "Niski";
        case 'MEDIUM': return "Średni";
        case 'HIGH': return "Wysoki";

    }
}