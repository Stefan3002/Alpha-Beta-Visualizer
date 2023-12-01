import './info-modal.css'
import Input from "../../Input/input";
import Button from "../../Button/button";
import {useSelector} from "react-redux";
import {getModal} from "../../../utils/store/utils-store/utils-selectors";
import ValueSVG from '../../../utils/imgs/svgs/ValueSVG.svg'
import LevelSVG from '../../../utils/imgs/svgs/LevelSVG.svg'
import LeafSVG from '../../../utils/imgs/svgs/LeafSVG.svg'
const InfoModal = () => {

    const nodeInfo = useSelector(getModal).content

    return (
        <div className='modal info-modal'>
            <div className="modal-header">
                <h2>Node information</h2>
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
        </div>
    )
}
export default InfoModal