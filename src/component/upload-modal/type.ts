export type StatusFile = {
    name: string;
    percent: number;
    controller: AbortController;
    finished: boolean;
};

// store information to display list file upload
export type Status = {
    files: StatusFile[];
};
