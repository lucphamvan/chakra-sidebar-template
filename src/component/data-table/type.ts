export interface PaginationProp {
    canPreviousPage: boolean;
    canNextPage: boolean;
    pageOptions: number[];
    pageCount: number;
    gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
    nextPage: () => void;
    previousPage: () => void;
    setPageSize: (pageSize: number) => void;
    pageIndex: number;
    pageSize: number;
}
