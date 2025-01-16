"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { useRecoilValue } from "recoil"
import { SelectedRestaurant } from "@/store/recoil/restAtom";
import { QRCode } from "react-qrcode-logo";
import { Env } from "@/lib/config";
import { Preview, print } from 'react-html2pdf';
import TooltipWrapper from "./tooltipWrapper";
import { Download } from "lucide-react";
export default function QrCodeDialog() {

    const rest = useRecoilValue(SelectedRestaurant);

    return <Dialog>
        <DialogTrigger asChild>
            <Button variant={"outline"} size={"sm"}>Show QR Code</Button>
        </DialogTrigger>
        <DialogContent className="w-full">
            <DialogHeader>
                <DialogTitle>QR Code | {rest?.name}</DialogTitle>
            </DialogHeader>
            <Preview className="w-full py-2 flex items-center justify-center" id={"qr-code-element"}>
                <div className="w-full flex flex-col items-center justify-center gap-4 p-4">
                    <p className="text-xs">{rest?.name} | Scan for Menu</p>
                    <div className='bg-white p-2'>
                        <QRCode
                            // logoPadding={5}
                            // logoImage={"https://lh3.googleusercontent.com/Skyrdo9OUfXzZ-1N-jdhGbmpkx6G7r9QYfA3p6EKhb0u9ES4cZD9Z9C92BxM3A9VyLgHJHB7ALTPOlIfJxVLrpzYrLzPIUZsQX9mD4U"}
                            value={`${Env.APP_URL}/view/${rest?.id}`}
                        />
                    </div>
                </div>
            </Preview>

            <div className="w-full flex items-centyer justify-end px-4">
                <TooltipWrapper content={"Download QR Code"}>
                    <Button variant={"outline"} size={"icon"} onClick={() => {
                        print(`QR Code - ${rest?.name}`, 'qr-code-element')
                    }}>
                        <Download size={18} />
                    </Button>
                </TooltipWrapper>
            </div>
        </DialogContent>
    </Dialog>

}
