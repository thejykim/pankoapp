export interface UserStats {
    boardsCreated: number;
    tasksCreated: number;
    tasksCompleted: number;
    creationTimes: number[];
    completedTimes: number[];
}

export let taskCreationType: 'morning' | 'afternoon' | 'night' | 'morning-afternoon' | 'morning-night' | 'afternoon-night';

export let taskCompletionType: 'morning' | 'afternoon' | 'night' | 'morning-afternoon' | 'morning-night' | 'afternoon-night';
