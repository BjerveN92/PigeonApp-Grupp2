
// enum for issue status

export type IssueStatus = "INACTIVE" | "ACTIVE" | "DONE";


// inteface för medlemmar
export interface Member{
    memberId?: string;
    projectId?: string;
    memberName: string;
}

// inteface för issue
export interface Issue{
    issueId?: string;
    projectId?: string;
    issueTitle: string;
    issueDescription: string;
    avarageEstTime?:number;
    actualTime?:number;
    issueStatus?:IssueStatus;
    estimatedTimes?: EstimatedTime[]; 
}


// interface för estimated time
export interface EstimatedTime{
    estimatedTimeId?: string;
    issueId?: string;
    timeEstimate: number;
    memberId: string;
    

}

// inteface för projekt
export interface Project{
   projectId?: string;
   title:string;
   activeProject: boolean;
   members:Member[];
    issues:Issue[];
}