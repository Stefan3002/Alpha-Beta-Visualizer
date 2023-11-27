import './input.css'
import {FC, useState} from "react";

type propsType = {
    placeholder: string,
    value?: string
}

const Input: FC<propsType> = ({value, placeholder}) => {
    const [inputValue, setInputValue] = useState(value)

    return (
        <input value={inputValue} onChange={(newValue) => setInputValue(newValue.target.value)} placeholder={placeholder} className='input'>

        </input>
    )
}
export default Input