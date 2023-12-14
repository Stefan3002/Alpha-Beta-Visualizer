import './input-modal.css'
import Input from "../../Input/input";
import Button from "../../Button/button";
import {FormEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getModal} from "../../../utils/store/utils-store/utils-selectors";
import {setNodeValue} from "../../../utils/painting-logic";
import {setModal} from "../../../utils/store/utils-store/utils-actions";
const InputModal = () => {
    const dispatch = useDispatch()
    const modalContent = useSelector(getModal).content
    const submitValue = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // @ts-ignore
        const value = event.target[0].value
        setNodeValue(modalContent, parseInt(value))

        dispatch(setModal({
            opened: false
        }))
    }

    return (
        <div className='modal input-modal'>
            <div className="modal-header">
                <h2>Enter a value for this node</h2>
            </div>
            <div className="modal-content">
                <form onSubmit={submitValue} action="" className='input-form'>
                    <Input value={modalContent?.value?.toString()} placeholder='Value' />
                    <Button text='Submit' />
                </form>
            </div>
        </div>
    )
}
export default InputModal