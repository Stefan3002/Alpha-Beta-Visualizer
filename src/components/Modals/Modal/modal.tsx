import './modal.css'
import {FC} from "react";
import SettingsModal from "../SettingsModal/settings-modal";

type propsType = {
    type: string
}
const Modal: FC<propsType> = ({type}) => {
    switch (type){
        case 'settings':
            return <SettingsModal />
        default:
            return <> </>
    }

}
export default Modal