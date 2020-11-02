export interface TaskSuperClass{
    id?:number;
    title?: string;
    creationDate?:Date;
    finishDate?:Date;
    description?:string;
    taskStatus?: string;
}