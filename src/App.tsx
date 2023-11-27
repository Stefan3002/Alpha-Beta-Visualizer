import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router";
import HomePage from "./components/HomePage/home-page";
import {useSelector} from "react-redux";
import {getModal} from "./utils/store/utils-store/utils-selectors";
import Modal from "./components/Modals/Modal/modal";
import Blur from "./components/Blur/blur";

function App() {

    const modal = useSelector(getModal)

    console.log(modal)
    return (
    <div className="App">
        {modal?.opened ? <><Blur /><Modal type={modal.type} /></> : null}
      <Routes>
        <Route path='' element={<HomePage />}>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
