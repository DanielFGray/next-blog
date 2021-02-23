import React from 'react'

export default function Card({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      <div
        className={`
          flex
          flex-col
          justify-around
          flex-1
          p-6
          bg-white
          rounded-lg
          bg-gradient-to-br
          from-white
          to-gray-200
          dark:bg-gray-800
          dark:from-gray-800
          dark:to-gray-900
          dark:text-white
        `}
      >
        {children}
      </div>
    </div>
  )
}
