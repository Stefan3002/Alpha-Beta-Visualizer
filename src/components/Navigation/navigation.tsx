import './navigation.css'
import Button from "../Button/button";
import {solveMinMaxFront} from "../../utils/min-max-logic";
import {useRef} from "react";
import {Node} from "../../utils/data-structures";
import {setModal} from "../../utils/store/utils-store/utils-actions";
import {useDispatch} from "react-redux";
const Navigation = () => {
    const rootNode = useRef<Node>(new Node())
    const dispatch = useDispatch()
    const startMinMax = async () => {
        await solveMinMaxFront(rootNode.current)
    }

    const openSettings = () => {
        dispatch(setModal({
            opened: true,
            type: 'settings',
            content: undefined
        }))
        return {};
    }

    return (
        <nav className='navigation'>
            <h1>Visualizer</h1>
            <ul>
                <li>Min Max</li>
                <li>Alpha Beta Pruning</li>
                <li>Expecti-Max</li>
            </ul>
            <Button callback={openSettings} text='Settings' />
            <Button callback={startMinMax} text='Start' />
        </nav>
    )
}
export default Navigation