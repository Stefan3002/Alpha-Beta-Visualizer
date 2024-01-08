import './home-page-alpha-beta-pruning.css'
import Navigation from "../Navigation/navigation";
import Canvas from "../Canvas/canvas";
import {canvasDimensions} from "../../utils/painting-general-logic";
const HomePageAlphaBetaPruning = () => {
    return (
        <div className='wrapper home-page'>
            <Navigation />
            <div className="main-app">
                <h2>Alpha Beta Pruning</h2>
                <Canvas height={`${canvasDimensions.height}px`} width={`${canvasDimensions.width}px`} />
            </div>
        </div>
    )
}
export default HomePageAlphaBetaPruning