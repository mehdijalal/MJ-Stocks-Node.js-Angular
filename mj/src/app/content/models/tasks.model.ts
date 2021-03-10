export interface IOfficeTasks {
    OfficeTaskID?: number;
    TaskName?: string;
    Duration?: string;
    StartDate: string;
    EndDate: string;
    Stage?: string;
    Percentage?: string;
  }
export interface ITasks {
    TaskID?: number;
    TaskName?: string;
    Duration?: string;
    StartDate: string;
    EndDate: string;
    Status: boolean;
    Stage?: string;
    Percentage?: string;
    CategoryID: number;
    totaltasks?:number;
  }
  