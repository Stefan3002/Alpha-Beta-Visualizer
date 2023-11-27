import './modal.css'
import {FC} from "react";
import SettingsModal from "../SettingsModal/settings-modal";
import InputModal from "../InputModal/input-modal";

type propsType = {
    type: string
}
const Modal: FC<propsType> = ({type}) => {
    switch (type){
        case 'settings':
            return <SettingsModal />
        case 'input':
            return <InputModal />
        default:
            return <> </>
    }

}
export default Modal