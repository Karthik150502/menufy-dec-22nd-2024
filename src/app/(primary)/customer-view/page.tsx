import PrimaryHeading from '@/components/app/primaryHeading'
import QrCodeDialog from '@/components/app/qrCodeDialog'
import React from 'react'

export default function CustomerViewPage() {
    return (
        <div className="h-full flex-1 overflow-hidden relative flex flex-col gap-4 items-start justify-start">
            <PrimaryHeading heading='Customer View' >
                <QrCodeDialog />
            </PrimaryHeading>
            <div className="w-full flex flex-1 items-center justify-center gap-2">
            </div>
        </div>
    )
}
