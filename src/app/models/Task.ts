export interface Task{
    id?:number;
    creationDate?:Date;
    finishDate?:Date;
    description?:string;
    taskStatus?: string;
}