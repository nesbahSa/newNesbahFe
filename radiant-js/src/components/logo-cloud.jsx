import { clsx } from 'clsx'

export function LogoCloud({ className }) {
    return (
        <div className={`mt-12 ${className}`}>
            <div className="grid grid-cols-2 gap-8 sm:flex sm:justify-center sm:space-x-36">
                <img src="/partner-logo/emirates.png" alt="Logo 1" className="h-14 w-auto mx-auto sm:mx-0" />
                <img src="/partner-logo/FAB.jpeg" alt="Logo 2" className="h-20 w-auto mx-auto sm:mx-0" />
                <img src="/partner-logo/geidea.jpg" alt="Logo 3" className="h-16 w-auto mx-auto sm:mx-0" />
                <img src="/partner-logo/LazyWait.png" alt="Logo 4" className="h-10 w-auto mx-auto sm:mx-0" />
            </div>
        </div>
    );
}
