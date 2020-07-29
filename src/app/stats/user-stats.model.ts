export interface UserStats {
    boardsCreated: number;
    tasksCreated: number;
    tasksCompleted: number;
    creationData: creationData[];
    completedTimes: number[];
}

export interface creationData {
    date: number;
    mood: number;
}
