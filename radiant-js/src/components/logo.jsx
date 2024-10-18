import { clsx } from 'clsx'
import {nesbahLogo} from '../images/logos/nesbahLogo.png';
export function Logo({ className }) {
    return (
        <img
            src={nesbahLogo}
            alt="Logo"
            className={clsx(className, 'h-9')}
        />
    )
}

export function Mark({ className }) {
    return (
        <img
            src="../../images/logos/nesbahLogo.png"
            alt="Mark"
            className={clsx(className, 'h-9')}
        />
    )
}
