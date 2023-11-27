import './canvas.css'
import {FC} from "react";
import Button from "../Button/button";

type propsType = {
    width: string
    height: string,
}
const Canvas: FC<propsType> = ({width, height}) => {
    return (
        <canvas width={width} height={height} id='canvas'>

        </canvas>
    )
}
export default Canvas