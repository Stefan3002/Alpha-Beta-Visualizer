import './blur.css'
import {useDispatch} from "react-redux";
import {setErrorModal, setInfoModal, setModal} from "../../utils/store/utils-store/utils-actions";
const Blur = () => {
    const dispatch = useDispatch()
    const closeModals = () => {
        dispatch(setModal({
            opened: false,
            type: undefined,
            content: undefined
        }))
        dispatch(setErrorModal({
            opened: false,
            content: undefined
        }))
        // dispatch(setInfoModal({
        //     opened: false,
        //     content: undefined
        // }))
    }

    return (
        <div onClick={closeModals} className='blur'>

        </div>
    )
}
export default Blur