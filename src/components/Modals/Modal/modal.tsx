import './modal.css'
import {FC} from "react";
import SettingsModal from "../SettingsModal/settings-modal";
import InputModal from "../InputModal/input-modal";
import InfoModal from "../InfoModal/info-modal";
import ComparisonModal from "../ComparisonModal/comparison-modal";

type propsType = {
    type: string
}
const Modal: FC<propsType> = ({type}) => {
    switch (type){
        case 'settings':
            return <SettingsModal />
        case 'input':
            return <InputModal />
        case 'info':
            return <InfoModal />
        case 'comparison':
            return <ComparisonModal />
        default:
            return <> </>
    }

}
export default Modal