import './error-modal.css'
import Input from "../../Input/input";
import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getErrorModal, getInfoModal} from "../../../utils/store/utils-store/utils-selectors";
import CloseSVG from "../../../utils/imgs/svgs/CloseSVG.svg";
import {getSettings} from "../../../utils/general-logic";
import {setErrorModal, setInfoModal} from "../../../utils/store/utils-store/utils-actions";

type propsType = {

}

const ErrorModal: FC<propsType> = () => {
    const data = useSelector(getErrorModal).content

    const dispatch = useDispatch()

    const closeErrorModals = () => {
        dispatch(setErrorModal({
            opened: false,
            content: undefined
        }))
    }

    if(data)
        return (
            <div className='modal error-modal'>
                <div className="modal-header error-modal-header">
                    <h2>Error</h2>
                    <img className='icon-svg' onClick={closeErrorModals} src={CloseSVG} alt='Close'/>
                </div>
                <div className="modal-content error-modal-content">
                    <p className='error-generic'>Something went wrong!</p>
                    <p className='error-data'>{data}</p>
                </div>
            </div>
        )
    else
        return <></>
}
export default ErrorModal