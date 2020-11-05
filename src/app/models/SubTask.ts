import { TaskSuperClass } from './Task.SuperClass';

export interface SubTask extends TaskSuperClass{
    progress?: number;
}