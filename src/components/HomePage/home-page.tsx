import './home-page.css'
import {FC, useEffect, useRef} from "react";
import Header from "../Header/header";
import {initAlgo, solveMinMax, solveMinMaxFront} from "../../utils/min-max-logic";
import Input from "../Input/input";
import Button from "../Button/button";
import Canvas from "../Canvas/canvas";
import {canvasDimensions} from "../../utils/painting-logic";
import canvas from "../Canvas/canvas";
import {Node} from "../../utils/data-structures";
import Navigation from "../Navigation/navigation";
import {useDispatch} from "react-redux";
import {setModal} from "../../utils/store/utils-store/utils-actions";

type propsType = {

}
const HomePage: FC<propsType> = () => {
    const rootNode = useRef<Node>(new Node())
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const root = await initAlgo()
            rootNode.current = root
        })()
    }, [])



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