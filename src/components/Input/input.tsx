import './input.css'
import {ChangeEvent, FC, useState} from "react";
import {getSettings, setSettings} from "../../utils/general-logic";

type propsType = {
    placeholder: string,
    value?: string,
    type?: 'text' | 'slider' | 'checkbox'
}

const Input: FC<propsType> = ({type = 'text', value, placeholder}) => {
    const [inputValue, setInputValue] = useState(value)

    const changeDelay = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
        const oldSettings = getSettings()
        setSettings({...oldSettings, delay: inputValue ? +inputValue : 700})
    }


    const changeWaitOnUser = (event: ChangeEvent<HTMLInputElement>) => {
        const waitOnUser = event.target.checked
        const oldSettings = getSettings()
        setSettings({...oldSettings, waitOnUser})

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
    if(type === 'checkbox')
        return (
            <div className='slider-input'>
                <p>{placeholder}</p>
                <input value={inputValue} onChange={changeWaitOnUser} type='checkbox'>

                </input>
            </div>

        )
    else
        return <></>
}
export default Input