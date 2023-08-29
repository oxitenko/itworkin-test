import styles from "./Pagination.module.css";
import {IPagination} from "../../types";

const Pagination = ({page, totalPages, prevPage, nextPage}: IPagination) => {
    return (
        <div className={styles.pagination}>
            <button onClick={prevPage} className={`${styles.button} ${styles.left}`} type="button"></button>
            <p className={styles.text}>{page} / {totalPages}</p>
            <button onClick={nextPage} className={`${styles.button} ${styles.right}`} type="button"></button>
        </div>
    );
};

export default Pagination;