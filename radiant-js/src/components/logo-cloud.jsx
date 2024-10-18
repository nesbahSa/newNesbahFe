import { clsx } from 'clsx'

export function LogoCloud({ className }) {
  return (
      <div
          className={clsx(
              className,
              'flex justify-between max-sm:mx-auto max-sm:max-w-md max-sm:flex-wrap max-sm:justify-evenly max-sm:gap-x-4 max-sm:gap-y-4',
          )}
      >
        <img
            alt="Nesbah Logo"
            src="../../images/logos/nesbahLogo.svg" // Updated path
            className="h-9 max-sm:mx-auto sm:h-8 lg:h-12"
        />
        {/* Repeat the same Nesbah logo if you want, or remove the extra logos */}
      </div>
  )
}
