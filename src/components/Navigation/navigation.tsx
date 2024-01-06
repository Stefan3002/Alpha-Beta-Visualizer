import './navigation.css'
import Button from "../Button/button";
import {solveMinMaxFront, useMinMaxAlgo} from "../../utils/min-max-logic";
import {useEffect, useRef, useState} from "react";
import {AlphaBetaNode, levels, Node, stepAlphaDataType, stepDataType} from "../../utils/data-structures";
import {setModal} from "../../utils/store/utils-store/utils-actions";
import {useDispatch} from "react-redux";
import QuestionSVG from '../../utils/imgs/svgs/QuestionSVG.svg'
import {Link} from "react-router-dom";
import {solveAlphaBetaFront, useAlphaBetaAlgo} from "../../utils/alpha-beta-logic";
import {type} from "os";
const Navigation = () => {
    const rootNode = useRef<Node | AlphaBetaNode>(window.location.pathname === '/' ? new Node() : new AlphaBetaNode())
    const dispatch = useDispatch()
    const initMinMax = useMinMaxAlgo()
    const initAlphaBeta = useAlphaBetaAlgo()
    useEffect(() => {
        (async () => {
            let root
            switch(window.location.pathname){
                case '/':
                    root = await initMinMax()
                    break
                case '/alpha-beta-pruning':
                    root = await initAlphaBeta()
                    break
                default:
                    root = await initMinMax()
            }
            rootNode.current = root
        })()
    }, [])
    const [info, setInfo] = useState<stepDataType>(null)
    const [alphaInfo, setAlphaInfo] = useState<stepAlphaDataType>(null)

    useEffect(() => {
        if(info)
            dispatch(setModal({
                type: 'comparison',
                opened: true,
                content: info
            }))
    }, [info])

    const startAlgo = async () => {
        switch (window.location.pathname) {
            case '/':
                await solveMinMaxFront(rootNode.current, setInfo)
                break
            case '/alpha-beta-pruning':
                console.log(rootNode.current instanceof AlphaBetaNode)
                // @ts-ignore
                await solveAlphaBetaFront(rootNode.current, setInfo, setAlphaInfo)
                break
        }

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
            <h1>Min Max Visualizer</h1>
            <ul className='algorithms'>
                <Link to='/'><li className={window.location.pathname === '/' ? 'active-link' : undefined}>Min Max</li></Link>
                <Link to='/alpha-beta-pruning'><li className={window.location.pathname === '/alpha-beta-pruning' ? 'active-link' : undefined}>Alpha Beta Pruning</li></Link>
                {/*<li>Expecti-Max</li>*/}
            </ul>
            <div className="nav-buttons">
                <Button callback={openSettings} text='Settings' />
                <Button callback={startAlgo} text='Start' />
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
            <Button classN='continue' text='Next step'/>
            <p>{alphaInfo? alphaInfo.alpha : null}</p>
            <p>{alphaInfo? alphaInfo.beta : null}</p>
            {/*<p className='continue'>Next step</p>*/}
        </nav>
    )
}
export default Navigation