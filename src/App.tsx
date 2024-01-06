import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router";
import HomePage from "./components/HomePage/home-page";
import {useSelector} from "react-redux";
import {getModal} from "./utils/store/utils-store/utils-selectors";
import Modal from "./components/Modals/Modal/modal";
import Blur from "./components/Blur/blur";
import {getSettings} from "./utils/general-logic";
import HomePageAlphaBetaPruning from "./components/HomePageAlphaBetaPruning/home-page-alpha-beta-pruning";

function App() {

    const modal = useSelector(getModal)
    const settings = getSettings()

    return (
    <div className="App">
        {modal.opened ?
            modal.type !== 'info' && modal.type !== 'comparison' ?
            <>
                <Blur />
                <Modal type={modal.type} />
            </> :
            <>
                {modal?.content?.info || settings.waitOnUser ? <Blur /> : null}
                <Modal type={modal.type} />
            </>
            :
            null}
      <Routes>
        <Route path='' element={<HomePage />} />
        <Route path='alpha-beta-pruning' element={<HomePageAlphaBetaPruning />} />
      </Routes>
    </div>
  );
}

export default App;
