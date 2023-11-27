import './input.css'
import {FC} from "react";

type propsType = {
    placeholder: string
}

const Input: FC<propsType> = ({placeholder}) => {
    return (
        <input placeholder={placeholder} className='input'>

        </input>
    )
}
export default Input