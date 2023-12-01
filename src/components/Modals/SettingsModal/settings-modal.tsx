import './settings-modal.css'
import Input from "../../Input/input";
import Button from "../../Button/button";
import {useState} from "react";
const SettingsModal = () => {

    const [delay, setDelay] = useState(500)

    return (
        <div className='modal settings-modal'>
            <div className="modal-header">
                <h2>Settings</h2>
            </div>
            <div className="modal-content">
                <Input value='700' type='slider' placeholder='Delay'/>
            </div>
        </div>
    )
}
export default SettingsModal