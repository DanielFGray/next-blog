import * as React from 'react'

export default function DarkToggle({ changeDarkMode, darkMode }: {
  changeDarkMode: React.Dispatch<React.SetStateAction<boolean>>
  darkMode: boolean
}): JSX.Element {
  return (
    <div
      className={`
        fixed
        bottom-0
        right-0
        flex
        items-center
        justify-around
        rounded-full
        w-20
        h-20
        m-3
        bg-black
        bg-opacity-50
      `}
    >
      <button
        type="button"
        onClick={() => changeDarkMode(s => !s)}
        aria-pressed={darkMode ? 'true' : 'false'}
        className={`
          border-2
          border-transparent
          ${darkMode ? 'bg-coolGray-600' : 'bg-gray-200'}
          flex-shrink-0
          focus:outline-none
          focus:ring-1
          focus:ring-offset-1
          focus:ring-white
          h-6
          inline-flex
          relative
          rounded-full
          w-11
      `}
      >
        <span className="sr-only">change visual theme</span>
        <span
          aria-hidden="true"
          className={`
            bg-white
            duration-300
            ease-in-out
            h-5
            inline-block
            pointer-events-none
            ring-0
            rounded-full
            shadow
            transform
            transition-transform
            ${darkMode ? 'translate-x-5' : 'translate-x-0'}
            w-5
        `}
        />
      </button>
    </div>
  )
}
