import React from 'react'
type Props = {
    heading: string,
    subHeading?: string
}

export default function PrimaryHeading({ heading, subHeading }: Props) {
    return (
        <div className="flex flex-col justify-start w-full">
            <p className="text-2xl font-bold">{heading}</p>
            {
                subHeading && <p className="text-sm text-muted-foreground">{subHeading}</p>
            }
        </div>
    )
}
