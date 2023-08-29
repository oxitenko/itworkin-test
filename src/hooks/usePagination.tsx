import {useState} from "react";
import {IUsePaginationProps} from "../types";


const usePagination = ({contentPerPage, count}: IUsePaginationProps) => {
    //contentPerPage сколько элементов должно отображаться за один раз на странице
    //count длина массива

    const [page, setPage] = useState<number>(1);
    const pageCount = Math.ceil(count / contentPerPage);
    const lastContentIndex = page * contentPerPage;
    const firstContentIndex = lastContentIndex - contentPerPage;

    function changePage(direction: boolean) {
        setPage(() => {
            if (direction) {
                if (page === pageCount) {
                    return page;
                }
                return page + 1;
            } else {
                if (page === 1) {
                    return page;
                }
                return page - 1;
            }
        });
    }

    function setPageSAFE(num: number) {
        if (num > pageCount) {
            setPage(pageCount);
        } else if (num < 1) {
            setPage(1);
        } else {
            setPage(num);
        }
    }

    return {
        totalPages: pageCount,
        nextPage: () => changePage(true),
        prevPage: () => changePage(false),
        setPage: setPageSAFE,
        firstContentIndex,
        lastContentIndex,
        page,
    };
};

export default usePagination;