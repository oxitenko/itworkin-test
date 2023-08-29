import styles from "./Table.module.css";
import {useSelector} from "react-redux";
import {RootState} from "../../index";
import Pagination from "../Pagination/Pagination";
import usePagination from "../../hooks/usePagination";
import React, {useState} from "react";
import {ITableProps} from "../../types";


const Table = ({apiSelected}: ITableProps) => {

    const data = useSelector((state: RootState) => apiSelected === "locations" ? state.location.location : state.character.character);

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

    // Достаем ключи из данных для таблицы
    const keys = Array.from(new Set(data.flatMap(item => Object.keys(item))));
    // Проверка по типу данных для правильного отображения в таблице
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

    //Создаем конфиг для сортировки
    const [sortConfig, setSortConfig] = useState({key: '', order: ''});
    //Хэндлер сортировки: по возрастанию если ключи разные, по убыванию если ключи одинаковые
    const handleSort = (key: string) => {
        let order = 'ascending';
        if (sortConfig.key === key && sortConfig.order === 'ascending') {
            order = 'descending';
        }
        setSortConfig({key, order});
    };
    //Сортировка: получаем ключи объекта для сравнения, сравниваем ключи для сортировки по возрастанию и убыванию
    const sortedVisibleData = data
        .slice(firstContentIndex, lastContentIndex)
        .sort((a, b) => {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];

            if (aValue < bValue) {
                return sortConfig.order === 'ascending' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.order === 'ascending' ? 1 : -1;
            }
            return 0;
        });

    return (
        <>
            <div className={styles.container}>
                <div className={styles.head}>
                    <ul className={styles.row}>
                        {
                            keys.map((item) =>
                                (<li key={item} className={styles.cell}>
                                    {item}
                                    <button
                                        onClick={() => handleSort(item)}
                                        className={sortConfig.key === item && sortConfig.order === 'ascending'
                                            ? `${styles.button} ${styles.descending}`
                                            : `${styles.button} ${styles.ascending}`
                                        }>
                                    </button>
                                </li>))}
                    </ul>
                </div>
                <div className={styles.body}>
                    {
                        sortedVisibleData.map((item) => (
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