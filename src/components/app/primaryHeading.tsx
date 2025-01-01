import React from 'react'
type Props = {
    heading: string,
    subHeading?: string,
    children?: React.ReactNode
}

export default function PrimaryHeading({ heading, subHeading, children }: Props) {
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-start justify-center">
                <p className="text-2xl font-bold">{heading}</p>
                {
                    subHeading && <p className="text-sm text-muted-foreground">{subHeading}</p>
                }
            </div>
            {children}
        </div>
    )
}
