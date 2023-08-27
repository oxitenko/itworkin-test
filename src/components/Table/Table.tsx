import styles from "./Table.module.css";
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import Pagination from "../Pagination/Pagination";
import usePagination from "../../hooks/usePagination";
import React from "react";

interface ITableProps {
    apiSelected: string;
}

const Table = ({apiSelected}: ITableProps) => {

    const data = useSelector((state: RootState) => apiSelected === "locations" ? state.location.location : state.character.character);

    const keys = Array.from(new Set(data.flatMap(item => Object.keys(item))));

    const renderTableCell = (value: any): React.ReactNode => {
        if (Array.isArray(value)) {
            return value.join(', ');
        } else if (typeof value === 'object' && value !== null) {
            return Object.values(value).map((subValue, index) => (
                <p key={index}>{renderTableCell(subValue)}</p>
            ));
        }
        return value;
    };

    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        totalPages,
    } = usePagination({
        contentPerPage: 15,
        count: data.length,
    });

    return (
        <>
            <div className={styles.container}>
                <div className={styles.head}>
                    <ul className={styles.row}>
                        {
                            keys.map((item) =>
                                (<li key={item} className={styles.cell}>{item}</li>))}
                    </ul>
                </div>
                <div className={styles.body}>
                    {
                        data.slice(firstContentIndex, lastContentIndex).map((item) => (
                            <ul key={item.id} className={styles.row}>
                                {
                                    keys.map((key) => (
                                        <li key={key} className={styles.cell}>
                                            <div className={styles.text}>
                                                {renderTableCell(item[key])}
                                            </div>
                                        </li>))}
                            </ul>))}
                </div>
                <Pagination page={page} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage}/>
            </div>

        </>
    );
};

export default Table;