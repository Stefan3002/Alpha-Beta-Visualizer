import './button.css'
import {FC} from "react";

type propsType = {
    text: string,
    callback?: () => {},
    classN?: string
}
const Button: FC<propsType> = ({classN, text, callback = () => {}}) => {
    return (
        <button className={`button ${classN}`} onClick={callback}>
            {text}
        </button>
    )
}
export default Button