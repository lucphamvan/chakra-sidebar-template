export type StatusFile = {
    name: string;
    percent: number;
    controller: AbortController;
};

// store information to display list file upload
export type Status = {
    files: StatusFile[];
};
