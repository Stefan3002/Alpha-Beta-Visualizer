import './info-modal.css'
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
                    {nodeInfo?.value ? <p>{nodeInfo?.value}</p> : <p>undefined</p>}
                </div>
                <div className="piece-info">
                    <img className='icon-svg' src={LevelSVG} alt=""/>
                    <p>{nodeInfo?.level}</p>
                </div>
                <div className="piece-info">
                    <img className='icon-svg' src={LeafSVG} alt=""/>
                    <p>{nodeInfo?.leaf ? 'true' : 'false'}</p>
                </div>
            </div>
            <div className="alpha-beta-info">
                {nodeInfo.alpha ? <div className="piece-info">
                    <img className='icon-svg' src={AlphaSVG} alt=""/>
                    <p>{nodeInfo?.alpha}</p>
                </div> : null}
                {nodeInfo.beta ? <div className="piece-info">
                    <img className='icon-svg' src={BetaSVG} alt=""/>
                    <p>{nodeInfo?.beta}</p>
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