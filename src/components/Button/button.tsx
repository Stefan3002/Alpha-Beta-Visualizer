import './button.css'
import {FC} from "react";

type propsType = {
    text: string,
    callback?: () => {}
}
const Button: FC<propsType> = ({text, callback = () => {}}) => {
    return (
        <button className='button' onClick={callback}>
            {text}
        </button>
    )
}
export default Button