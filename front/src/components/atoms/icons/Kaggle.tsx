import React from 'react'

export const Kaggle = ({
  width = 32,
  height = 32,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <text
        x="50%"
        y="50%"
        fontSize="32"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#20BEFF"
      >
        k
      </text>
    </svg>
  )
}
