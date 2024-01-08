import './info-modal.css'
import {motion} from "framer-motion";
import Input from "../../Input/input";
import Button from "../../Button/button";
import {useDispatch, useSelector} from "react-redux";
import {getInfoModal, getModal} from "../../../utils/store/utils-store/utils-selectors";
import ValueSVG from '../../../utils/imgs/svgs/ValueSVG.svg'
import LevelSVG from '../../../utils/imgs/svgs/LevelSVG.svg'
import LeafSVG from '../../../utils/imgs/svgs/LeafSVG.svg'
import AlphaSVG from '../../../utils/imgs/svgs/AlphaSVG.svg'
import BetaSVG from '../../../utils/imgs/svgs/BetaSVG.svg'
import CloseSVG from '../../../utils/imgs/svgs/CloseSVG.svg'
import {setInfoModal, setModal} from "../../../utils/store/utils-store/utils-actions";
import {getSettings} from "../../../utils/general-logic";
import {AnimatePresence} from "framer-motion";
import {nodeValueAnimate, nodeValueExit, nodeValueParams} from "../../Transition/transition-params";
import Transition from "../../Transition/transition";
const InfoModal = () => {
    const dispatch = useDispatch()
    const nodeInfo = useSelector(getInfoModal).content
    const settings = getSettings()
    const closeInfoModals = () => {
        dispatch(setInfoModal({
            opened: false,
            content: undefined
        }))
    }

    if(nodeInfo)
    if(!nodeInfo.info)
    return (
        <div className='modal info-modal'>
            <div className="info-modal-header modal-header">
                <h2>Node information</h2>
                <img className='icon-svg' onClick={closeInfoModals} src={CloseSVG} />
            </div>
            <div className="modal-content">
                <div className="piece-info">
                    <img className='icon-svg' src={ValueSVG} alt=""/>
                    <AnimatePresence mode='wait'>
                        {nodeInfo?.value ?
                            // This is actually a de-optimization of REACT re-rendering
                            // Because here I want to Remount the component, so Framer JS
                            // can run its magic
                            <Transition keyName={`node-value-${nodeInfo?.value}`} type='value' exit={nodeValueExit} animate={nodeValueAnimate} initial={nodeValueParams}>
                            {nodeInfo?.value}
                            </Transition>
                            : <p key='undefined-value'>-</p>}
                    </AnimatePresence>
                </div>
                <div className="piece-info">
                    <img className='icon-svg' src={LevelSVG} alt=""/>
                    <AnimatePresence mode='wait'>
                        <Transition keyName={`node-level-${nodeInfo?.level}`} type='value' exit={nodeValueExit} animate={nodeValueAnimate} initial={nodeValueParams}>
                            {nodeInfo?.level}
                        </Transition>
                    </AnimatePresence>
                </div>
                <div className="piece-info">
                    <img className='icon-svg' src={LeafSVG} alt=""/>
                    <AnimatePresence mode='wait'>
                        <Transition keyName={`node-level-${nodeInfo?.leaf ? 'true' : 'false'}`} type='value' exit={nodeValueExit} animate={nodeValueAnimate} initial={nodeValueParams}>
                            {nodeInfo?.leaf ? 'true' : 'false'}
                        </Transition>
                    </AnimatePresence>
                </div>
            </div>
            <div className="alpha-beta-info">
                {nodeInfo.alpha ? <div className="piece-info">
                    <img className='icon-svg' src={AlphaSVG} alt=""/>
                    <AnimatePresence mode='wait'>
                        <Transition keyName={`node-level-${nodeInfo?.alpha}`} type='value' exit={nodeValueExit} animate={nodeValueAnimate} initial={nodeValueParams}>
                            {nodeInfo?.alpha}
                        </Transition>
                    </AnimatePresence>
                </div> : null}
                {nodeInfo.beta ? <div className="piece-info">
                    <img className='icon-svg' src={BetaSVG} alt=""/>
                    <AnimatePresence mode='wait'>
                        <Transition keyName={`node-level-${nodeInfo?.beta}`} type='value' exit={nodeValueExit} animate={nodeValueAnimate} initial={nodeValueParams}>
                            {nodeInfo?.beta}
                        </Transition>
                    </AnimatePresence>
                </div> : null}
            </div>
        </div>
    )
    else
        return (
            <div className='modal info-modal'>
                <div className="info-modal-header modal-header">
                    <h2>Help</h2>
                    <img className='icon-svg' onClick={closeInfoModals} src={CloseSVG} />
                </div>
                <div className="works-modal-content">
                    <h3>{nodeInfo.info}</h3>
                    <ol>
                        <li>Click on the canvas to create nodes.</li>
                        <li>Click on leaf nodes to give them a value.</li>
                        <li>Hover over nodes to see information about them.</li>
                        <li>Change the settings: speed and pause on big algo steps.</li>
                        <li>Start the algorithm.</li>
                        <li>Watch the algorithm run.</li>
                    </ol>
                </div>
            </div>
        )
    else
        return <></>
}
export default InfoModal