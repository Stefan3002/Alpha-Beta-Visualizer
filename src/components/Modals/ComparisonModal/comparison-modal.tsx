import './comparison-modal.css'
import ValueSVG from "../../../utils/imgs/svgs/ValueSVG.svg";
import LevelSVG from "../../../utils/imgs/svgs/LevelSVG.svg";
import LeafSVG from "../../../utils/imgs/svgs/LeafSVG.svg";
import {useSelector} from "react-redux";
import {getModal} from "../../../utils/store/utils-store/utils-selectors";
const ComparisonModal = () => {

    const data = useSelector(getModal).content

    return (
        <div className='modal info-modal'>
            <div className="modal-header">
                <h2>Algorithm Step</h2>
            </div>
            <div className="modal-content">
                <div className="piece-info">
                    <img className='icon-svg' src={ValueSVG} alt=""/>
                    <p>{data}</p>
                </div>
            </div>
        </div>
    )
}
export default ComparisonModal