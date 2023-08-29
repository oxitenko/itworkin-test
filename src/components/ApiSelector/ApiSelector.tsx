import styles from "./ApiSelector.module.css"
import React, {useState} from "react";
import {IApiSelectorProps} from "../../types";



const ApiSelector = ({selectLocations, selectCharacters, apiSelected}: IApiSelectorProps) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleApiChange = (selectedValue: string): void => {
        if (selectedValue === 'locations') {
            selectLocations();
        } else if (selectedValue === 'characters') {
            selectCharacters();
        }
    };

    const handleToggle = (): void => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (selectedValue: string): void => {
        handleApiChange(selectedValue);
        handleToggle();
    };

    return (
        <div className={styles.container}>
            <div className={styles.selector} onClick={handleToggle}>
                {apiSelected === 'locations' ? 'Locations' : 'Characters'}
            </div>
            <ul className={isOpen ? `${styles.dropdown} ${styles.open}` : `${styles.dropdown}`}>
                <li className={styles.option} onClick={() => handleItemClick('locations')}>Locations</li>
                <li className={styles.option} onClick={() => handleItemClick('characters')}>Characters</li>
            </ul>
        </div>
    );
};

export default ApiSelector;