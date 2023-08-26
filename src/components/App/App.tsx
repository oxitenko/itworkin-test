import React, {useEffect} from 'react';
import './App.css';
import Table from "../Table/Table";
import {useDispatch} from "react-redux";
import {getLocationFetch} from "../../redux/locationState";
import {getCharacterFetch} from "../../redux/characterState";

function App() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLocationFetch());
        dispatch(getCharacterFetch());
    },[dispatch])

  return (
    <main className="App">
      <Table/>
    </main>
  );
}

export default App;
