import './header.css'
import {FC} from "react";
import Navigation from "../Navigation/navigation";

type propsType = {

}
const Header: FC<propsType> = () => {
    return (
        <header className='header'>
            <h1>Visualizer</h1>
            <Navigation />
        </header>
    )
}
export default Header