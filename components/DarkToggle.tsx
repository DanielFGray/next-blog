import * as React from 'react'

export default function DarkToggle({
  changeDarkMode,
  darkMode,
}: {
  changeDarkMode: React.Dispatch<React.SetStateAction<boolean>>
  darkMode: boolean
}): JSX.Element {
  return (
    <button
      type="button"
      onClick={() => changeDarkMode(s => ! s)}
      aria-pressed={darkMode ? 'true' : 'false'}
      className={`
        ${darkMode ? 'bg-coolGray-600' : 'bg-gray-200'}
        -top-1
        relative
        inline-flex
        flex-shrink-0
        h-6
        border-2
        border-transparent
        rounded-full
        cursor-pointer
        w-11
        focus:outline-none
        focus:ring-1
        focus:ring-offset-1
        focus:ring-white
      `}
    >
      <span className="sr-only">change visual theme</span>
      <span
        aria-hidden="true"
        className={`
          inline-block
          w-5
          h-5
          bg-white
          rounded-full
          shadow
          pointer-events-none
          ${darkMode ? 'translate-x-5' : 'translate-x-0'}
          ring-0
          transform
        `}
      />
    </button>
  )
}
