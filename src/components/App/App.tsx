import React, {useEffect, useState} from 'react';
import Table from "../Table/Table";
import {useDispatch, useSelector} from "react-redux";
import {getLocationFetch} from "../../redux/locationState";
import {getCharacterFetch} from "../../redux/characterState";
import ApiSelector from "../ApiSelector/ApiSelector";
import {RootState} from "../../index";
import Loader from "../Loader/Loader";

function App() {

    const dispatch = useDispatch();
    const [apiSelected, setApiSelected] = useState<string>("locations");

    const locationLoad = useSelector((state: RootState) => state.location.isLoading);
    const characterLoad = useSelector((state: RootState) => state.character.isLoading);

    const selectLocations = (): void => {
        dispatch(getLocationFetch());
        setApiSelected("locations")
    }

    const selectCharacters = (): void => {
        dispatch(getCharacterFetch());
        setApiSelected("characters")
    }

    useEffect(() => {
        dispatch(getLocationFetch());
    }, [dispatch])

    return (
       locationLoad || characterLoad ?
        <Loader/> :
        <main>
            <ApiSelector apiSelected={apiSelected} selectLocations={selectLocations} selectCharacters={selectCharacters}/>
            <Table apiSelected={apiSelected}/>
        </main>
    );
}

export default App;
