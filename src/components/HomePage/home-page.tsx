import './home-page.css'
import {FC} from "react";
import Canvas from "../Canvas/canvas";
import {canvasDimensions} from "../../utils/painting-logic";
import Navigation from "../Navigation/navigation";


type propsType = {

}
const HomePage: FC<propsType> = () => {

    return (
        <div className='wrapper home-page'>
            <Navigation />
            <div className="main-app">
                <Canvas height={`${canvasDimensions.height}px`} width={`${canvasDimensions.width}px`} />
            </div>
        </div>
    )
}
export default HomePage