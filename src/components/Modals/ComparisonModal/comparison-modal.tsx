import './comparison-modal.css'
import ValueSVG from "../../../utils/imgs/svgs/ValueSVG.svg";
import LevelSVG from "../../../utils/imgs/svgs/LevelSVG.svg";
import NodeSVG from "../../../utils/imgs/svgs/NodeSVG.svg";
import {useSelector} from "react-redux";
import {getModal} from "../../../utils/store/utils-store/utils-selectors";
const ComparisonModal = () => {

    const data = useSelector(getModal).content

    return (
        <div className='modal info-modal'>
            <div className="modal-header">
                <h2>Algorithm Step</h2>
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
                        <p>Level: {data.father?.level}</p>
                    </div>
                    <div className="node-info">
                        <img className='icon-svg' src={NodeSVG} alt=""/>
                        <p>Comparison node (child)</p>
                        <p>Value: {data.node?.value}</p>
                        <p>Level: {data.node?.level}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default ComparisonModal