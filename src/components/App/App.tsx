import React, {useEffect, useState} from 'react';
import './App.css';
import Table from "../Table/Table";
import {useDispatch} from "react-redux";
import {getLocationFetch} from "../../redux/locationState";
import {getCharacterFetch} from "../../redux/characterState";
import ApiSelector from "../ApiSelector/ApiSelector";

function App() {

    const dispatch = useDispatch();
    const [apiSelected, setApiSelected] = useState<string>("locations");

    const selectLocations = () => {
        dispatch(getLocationFetch());
        setApiSelected("locations")
    }

    const selectCharacters = () => {
        dispatch(getCharacterFetch());
        setApiSelected("characters")
    }

    useEffect(() => {
        dispatch(getLocationFetch());
    }, [dispatch])

    return (
        <main className="App">
            <ApiSelector apiSelected={apiSelected} selectLocations={selectLocations} selectCharacters={selectCharacters}/>
            <Table apiSelected={apiSelected}/>
        </main>
    );
}

export default App;
