import './input.css'
import {ChangeEvent, FC, useState} from "react";
import {getSettings, setSettings} from "../../utils/general-logic";

type propsType = {
    placeholder: string,
    value?: string,
    type?: 'text' | 'slider'
}

const Input: FC<propsType> = ({type = 'text', value, placeholder}) => {
    const [inputValue, setInputValue] = useState(value)

    const changeDelay = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
        const oldSettings = getSettings()
        setSettings({...oldSettings, delay: inputValue ? +inputValue : 700})
    }


    if(type === 'text')
        return (
            <input value={inputValue} onChange={(newValue) => setInputValue(newValue.target.value)} placeholder={placeholder} className='input'>

            </input>
        )
    else
        if(type === 'slider')
            return (
                <div className='slider-input'>
                    <p>{placeholder}</p>
                    <p>{inputValue}</p>
                    <input value={inputValue} min='100' max='3000' type='range' onChange={changeDelay} className='input'>

                    </input>
                </div>

            )
    else
        return <></>
}
export default Input