import './navigation.css'
import Button from "../Button/button";
import {running, solveMinMaxFront, useMinMaxAlgo} from "../../utils/min-max-logic";
import {useEffect, useRef, useState} from "react";
import {AlphaBetaNode, errorType, levels, Node, stepAlphaDataType, stepDataType} from "../../utils/data-structures";
import {setErrorModal, setInfoModal, setModal} from "../../utils/store/utils-store/utils-actions";
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
    let [error, setError] = useState<errorType>(undefined)

    useEffect(() => {
        if(info)
            dispatch(setModal({
                type: 'comparison',
                opened: true,
                content: info
            }))
    }, [info])

    useEffect(() => {
        if(error) {
            // Trim the date from the error!
            const trimIndex = error.indexOf('+++')
            error = error.substring(0, trimIndex)
            dispatch(setInfoModal(
                {
                    content: undefined,
                    opened: false
                }
            ))
            dispatch(setModal(
                {
                    type: undefined,
                    content: undefined,
                    opened: false
                }
            ))
            dispatch(setErrorModal({
                content: error,
                opened: true,
            }))
        }
    }, [error])

    const startAlgo = async () => {
        switch (window.location.pathname) {
            case '/':
                if(!running)
                await solveMinMaxFront(rootNode.current, setInfo, setError)
                break
            case '/alpha-beta-pruning':
                if(!running)
                // @ts-ignore
                await solveAlphaBetaFront(rootNode.current, setInfo, setError)
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
    const resetAlgo = () => {
        window.location.reload()
    }

    return (
        <nav className='navigation'>
            <h1>Min Max Visualizer</h1>
            <img onClick={() => {
                dispatch(setInfoModal({
                        opened: true,
                        content: {
                            info: 'How does this work?'
                        }
                    }
                ))
            }} src={QuestionSVG} className='icon-svg' alt=""/>
            <ul className='algorithms'>
                <Link to='/'>
                    <li className={window.location.pathname === '/' ? 'active-link' : undefined}>Min Max</li>
                </Link>
                <Link to='/alpha-beta-pruning'>
                    <li className={window.location.pathname === '/alpha-beta-pruning' ? 'active-link' : undefined}>Alpha
                        Beta Pruning
                    </li>
                </Link>
                {/*<li>Expecti-Max</li>*/}
            </ul>
            <div className="nav-buttons">
                <Button callback={openSettings} text='Settings'/>
                <Button classN='continue' text='Next step'/>
            </div>
            <Button callback={startAlgo} text='Start'/>
            <Button callback={resetAlgo} text='Reset'/>

            {/*<p>{alphaInfo? alphaInfo.alpha : null}</p>*/}
            {/*<p>{alphaInfo? alphaInfo.beta : null}</p>*/}
            {/*<p className='continue'>Next step</p>*/}
        </nav>
    )
}
export default Navigation
