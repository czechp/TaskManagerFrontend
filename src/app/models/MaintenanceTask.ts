import { AppUser } from './AppUser';
import { MaintenanceWorker } from './MaintenanceWorker';
import { Task } from './Task';

export interface MaintenanceTask extends Task {
    maintenanceWorker?: MaintenanceWorker;
    repairMan?: AppUser;
    breakdownPlace?: string;
    repairConclusion: string;
} 