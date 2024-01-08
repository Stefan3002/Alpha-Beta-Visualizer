import './comparison-modal.css'
import ValueSVG from "../../../utils/imgs/svgs/ValueSVG.svg";
import LevelSVG from "../../../utils/imgs/svgs/LevelSVG.svg";
import NodeSVG from "../../../utils/imgs/svgs/NodeSVG.svg";
import {useDispatch, useSelector} from "react-redux";
import {getModal} from "../../../utils/store/utils-store/utils-selectors";
import AlphaSVG from "../../../utils/imgs/svgs/AlphaSVG.svg";
import BetaSVG from "../../../utils/imgs/svgs/BetaSVG.svg";
import CloseSVG from "../../../utils/imgs/svgs/CloseSVG.svg";
import {setInfoModal, setModal} from "../../../utils/store/utils-store/utils-actions";
import Transition from "../../Transition/transition";
import {nodeValueAnimate, nodeValueExit, nodeValueParams} from "../../Transition/transition-params";
import {AnimatePresence} from "framer-motion";
const ComparisonModal = () => {
    const dispatch = useDispatch()
    const data = useSelector(getModal).content
    const closeModals = () => {
        dispatch(setModal({
            opened: false,
            type: undefined,
            content: undefined
        }))
    }

    return (
        <div className='modal comparison-modal'>
            <div className="modal-header">
                <h2>Algorithm Step</h2>
                <img className='icon-svg' onClick={closeModals} src={CloseSVG} />
            </div>
            <div className="modal-content comparison-modal-content">
                <div className='comparison-group'>
                    <div className="piece-info">
                        <img className='icon-svg' src={ValueSVG} alt=""/>
                        <AnimatePresence mode='wait'>
                            {data.value ?
                                // This is actually a de-optimization of REACT re-rendering
                                // Because here I want to Remount the component, so Framer JS
                                // can run its magic
                                <Transition keyName={`node-value-${data.value}`} type='value' exit={nodeValueExit} animate={nodeValueAnimate} initial={nodeValueParams}>
                                    {data.value}
                                </Transition>
                                : <p key='undefined-value'>-</p>}
                        </AnimatePresence>
                    </div>
                    <div className="piece-info">
                        <img className='icon-svg' src={LevelSVG} alt=""/>
                        <AnimatePresence mode='wait'>
                            <Transition keyName={`node-level-${data.level}`} type='value' exit={nodeValueExit} animate={nodeValueAnimate} initial={nodeValueParams}>
                                {data.level}
                            </Transition>
                        </AnimatePresence>
                    </div>
                </div>

                <div className='comparison-group'>
                    <div className="node-info">
                        <img className='icon-svg' src={NodeSVG} alt=""/>
                        <p>Current node (father)</p>
                        <div className="piece-info piece-info-centered">
                            <p>Value:</p>
                            <AnimatePresence mode='wait'>
                                {data.father?.value ?
                                    // This is actually a de-optimization of REACT re-rendering
                                    // Because here I want to Remount the component, so Framer JS
                                    // can run its magic
                                    <Transition keyName={`node-value-${data.father?.value}`} type='value'
                                                exit={nodeValueExit} animate={nodeValueAnimate}
                                                initial={nodeValueParams}>
                                        {data.father?.value}
                                    </Transition>
                                    : <p key='undefined-value'>-</p>}
                            </AnimatePresence>
                        </div>


                        {window.location.pathname === '/alpha-beta-pruning' &&
                            <div className="alpha-beta-info">
                                <div className="piece-info">
                                    <img className='icon-svg' src={AlphaSVG} alt=""/>
                                    <p>{data?.father.alpha}</p>
                                </div>
                                <div className="piece-info">
                                    <img className='icon-svg' src={BetaSVG} alt=""/>
                                    <p>{data?.father.beta}</p>
                                </div>
                            </div>}
                        <div className="piece-info piece-info-centered">
                            <img className='icon-svg' src={LevelSVG} alt=""/>
                            <AnimatePresence mode='wait'>
                                <Transition keyName={`node-level-${data.father?.level}`} type='value'
                                            exit={nodeValueExit}
                                            animate={nodeValueAnimate} initial={nodeValueParams}>
                                    {data.father?.level}
                                </Transition>
                            </AnimatePresence>
                        </div>

                    </div>
                    <div className="node-info">
                        <img className='icon-svg' src={NodeSVG} alt=""/>
                        <p>Comparison node (child)</p>

                        <div className="piece-info piece-info-centered">
                            <p>Value:</p>
                            <AnimatePresence mode='wait'>
                                {data.node?.value ?
                                    // This is actually a de-optimization of REACT re-rendering
                                    // Because here I want to Remount the component, so Framer JS
                                    // can run its magic
                                    <Transition keyName={`node-value-${data.node?.value}`} type='value'
                                                exit={nodeValueExit} animate={nodeValueAnimate}
                                                initial={nodeValueParams}>
                                        {data.node?.value}
                                    </Transition>
                                    : <p key='undefined-value'>-</p>}
                            </AnimatePresence>
                        </div>

                        {window.location.pathname === '/alpha-beta-pruning' &&
                            <div className="alpha-beta-info">
                                <div className="piece-info">
                                    <img className='icon-svg' src={AlphaSVG} alt=""/>
                                    <p>{data?.node.alpha}</p>
                                </div>
                                <div className="piece-info">
                                    <img className='icon-svg' src={BetaSVG} alt=""/>
                                    <p>{data?.node.beta}</p>
                                </div>
                            </div>
                        }
                        <div className="piece-info piece-info-centered">
                            <img className='icon-svg' src={LevelSVG} alt=""/>
                            <AnimatePresence mode='wait'>
                                <Transition keyName={`node-level-${data.node?.level}`} type='value' exit={nodeValueExit}
                                            animate={nodeValueAnimate} initial={nodeValueParams}>
                                    {data.node?.level}
                                </Transition>
                            </AnimatePresence>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}
export default ComparisonModal