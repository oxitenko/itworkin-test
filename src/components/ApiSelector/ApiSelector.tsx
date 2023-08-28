import styles from "./ApiSelector.module.css"
import React from "react";

interface IApiSelectorProps  {
    selectLocations: () => void;
    selectCharacters: () => void;
    apiSelected: string;
}

const ApiSelector = ({selectLocations, selectCharacters, apiSelected}: IApiSelectorProps) => {

    const handleApiChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        if (selectedValue === 'locations') {
            selectLocations();
        } else if (selectedValue === 'characters') {
            selectCharacters();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.custom}>
            <select name="api" id="api" defaultValue="Locations" onChange={handleApiChange} value={apiSelected}>
                <option value="locations" >Locations</option>
                <option value="characters">Characters</option>
            </select>
            </div>
        </div>
    );
};

export default ApiSelector;