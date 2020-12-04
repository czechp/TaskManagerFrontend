import { AppUser } from './AppUser';
import { MaintenanceWorker } from './MaintenanceWorker';
import { TaskSuperClass } from './Task.SuperClass';

export interface MaintenanceTask extends TaskSuperClass {
    maintenanceWorker?: MaintenanceWorker;
    repairMan?: AppUser;
    breakdownPlace?: string;
    breakdownMachine?: string;
    repairConclusion?: string;
} 