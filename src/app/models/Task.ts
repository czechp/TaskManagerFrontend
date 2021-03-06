import { AppUser } from './AppUser';
import { Goal } from './Goal';
import { SubTask } from './SubTask';
import { TaskSuperClass } from './Task.SuperClass';
import { TaskComment } from './TaskComment';

export interface Task extends TaskSuperClass{
    progress?: number;
    taskPriority?: string;
    goals?: Goal[];
    subTasks?: SubTask[];
    appUsers?: AppUser[];
    taskComments?: TaskComment[];
}
