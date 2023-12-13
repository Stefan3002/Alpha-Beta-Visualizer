import './navigation.css'
import Button from "../Button/button";
import {solveMinMaxFront, useMinMaxAlgo} from "../../utils/min-max-logic";
import {useEffect, useRef, useState} from "react";
import {Node} from "../../utils/data-structures";
import {setModal} from "../../utils/store/utils-store/utils-actions";
import {useDispatch} from "react-redux";
import QuestionSVG from '../../utils/imgs/svgs/QuestionSVG.svg'
const Navigation = () => {
    const rootNode = useRef<Node>(new Node())
    const dispatch = useDispatch()
    const initMinMax = useMinMaxAlgo()
    useEffect(() => {
        (async () => {
            const root = await initMinMax()
            rootNode.current = root
        })()
    }, [])
    const [info, setInfo] = useState('')

    useEffect(() => {
        if(info)
            dispatch(setModal({
                type: 'comparison',
                opened: true,
                content: info
            }))
    }, [info])


    const startMinMax = async () => {
        await solveMinMaxFront(rootNode.current, setInfo)
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
            <div className="nav-buttons">
                <Button callback={openSettings} text='Settings' />
                <Button callback={startMinMax} text='Start' />
                <img onClick={() => {
                    dispatch(setModal({
                            opened: true,
                            type: 'info',
                            content: {
                                info: 'How does this work?'
                            }
                        }
                    ))
                }} src={QuestionSVG} className='icon-svg' alt=""/>
            </div>
        </nav>
    )
}
export default Navigation