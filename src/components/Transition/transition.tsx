import './transition.css'

import {FC, ReactNode} from "react";
import {motion} from "framer-motion";
import {exitAnimationComparison, finalAnimationComparison, initialAnimationComparison} from "./transition-params";

type propsType = {
    children: ReactNode,
    type: 'error' | 'info' | 'value' | 'comparison',
    initial?: {},
    animate?: {},
    exit?: {},
    keyName?: string
}
const initialAnimation = {
    y: -100,
    opacity: 0
}
const finalAnimation = {
    y: 0,
    opacity: 100
}
const exitAnimation = {
    y: 100,
    opacity: 0
}


const initialAnimationInfo = {
    y: 100,
    opacity: 0
}
const finalAnimationInfo = {
    y: 0,
    opacity: 100
}
const exitAnimationInfo = {
    y: 100,
    opacity: 0
}

const Transition: FC<propsType> = ({keyName, initial, animate, exit, children, type}) => {
    switch (type){
        case 'error':
            return (
                <motion.div key='error-modal' initial={initialAnimation}
                            animate={finalAnimation}
                            exit={exitAnimation}
                            className='transition-error transition'>
                    {children}
                </motion.div>
            )
        case 'info':
            return (
                <motion.div key='info-modal' initial={initialAnimationInfo}
                            animate={finalAnimationInfo}
                            exit={exitAnimationInfo}
                            className='transition transition-info'>
                    {children}
                </motion.div>
            )
        case 'value':
            return (
                <motion.p key={keyName} initial={initial}
                          animate={animate}
                          exit={exit}
                          className='node-value'>
                    {children}
                </motion.p>
            )
        case 'comparison':
            return (
                <motion.div key={keyName} initial={initialAnimationComparison}
                          animate={finalAnimationComparison}
                          exit={exitAnimationComparison}
                          className='comarison-modal-animation'>
                    {children}
                </motion.div>
            )
        default:
            return <></>
    }

}
export default Transition