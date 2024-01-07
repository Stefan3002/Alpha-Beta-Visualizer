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
                        <p>{data.value}</p>
                    </div>
                    <div className="piece-info">
                        <img className='icon-svg' src={LevelSVG} alt=""/>
                        <p>{data.level}</p>
                    </div>
                </div>

                <div className='comparison-group'>
                    <div className="node-info">
                        <img className='icon-svg' src={NodeSVG} alt=""/>
                        <p>Current node (father)</p>
                        <p>Value: {data.father?.value}</p>
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
                        <p>Level: {data.father?.level}</p>
                    </div>
                    <div className="node-info">
                        <img className='icon-svg' src={NodeSVG} alt=""/>
                        <p>Comparison node (child)</p>
                        <p>Value: {data.node?.value}</p>
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
                        <p>Level: {data.node?.level}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default ComparisonModal