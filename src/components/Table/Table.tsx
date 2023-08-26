import styles from "./Table.module.css";
import {useSelector} from "react-redux";
import {RootState} from "../../index";

const Table = () => {

    const location = useSelector((state: RootState) => state.location.location);
    const keys = Array.from(new Set(location.flatMap(item => Object.keys(item))));

    return (
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
                    location.map((item) => (
                        <ul key={item.id} className={styles.row}>
                            {
                                keys.map((key) => (
                                    <li key={key} className={styles.cell}>
                                        <p className={styles.text}>
                                            {item[key]}
                                        </p>
                                    </li>))}
                        </ul>))}
            </div>
        </div>
    );
};

export default Table;