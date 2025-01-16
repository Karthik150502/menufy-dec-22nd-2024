"use client"

import React from 'react'
import { Button } from '../ui/button'
import { useRecoilState } from 'recoil'
import { DeleteItemActive } from '@/store/recoil/itemDeleteActiveAtom'
import { Trash, X } from 'lucide-react'
import ConfirmModal from './confirmModal'


type Props = {
    onSelectAll: () => void,
    allSelect: boolean,
    onCancel: () => void,
    onDelete: () => void,
    noOfItems: number
}

export default function DeleteItemActiveToggle({ noOfItems, onSelectAll, allSelect, onCancel, onDelete }: Props) {

    const [deleteItemActive, setDeleteItemActive] = useRecoilState(DeleteItemActive);
    return (
        <div className='flex items-center justify-center gap-2'>
            {
                deleteItemActive && <div className="flex items-center justify-center gap-2">
                    <ConfirmModal label="Are you sure?" description={`Delete ${noOfItems} items? The action can't be undone`} onConfirmAction={onDelete} onConfirmVariant={"destructive"}>
                        <Button variant={"destructive"} size={"sm"} className="text-xs">
                            Delete selected Items
                        </Button>
                    </ConfirmModal>
                    <Button variant={"outline"} onClick={() => {
                        onSelectAll()
                    }} size={"sm"} className="text-xs">
                        {allSelect ? "Unselect All" : "Select All"}
                    </Button>
                </div>
            }
            {
                deleteItemActive ? <Button variant={"outline"} onClick={() => {
                    setDeleteItemActive(false)
                    onCancel()
                }} size={"sm"} className="text-xs">
                    <div className='flex items-center justify-center gap-2'>
                        <X size={18} strokeWidth={1.5} />
                        <span>Cancel</span>
                    </div>
                </Button> : <Button variant={"outline"} onClick={() => {
                    setDeleteItemActive(true)
                }} size={"sm"} className="text-xs">
                    <div className='flex items-center justify-center gap-2'>
                        <Trash className="stroke-red-500" size={18} strokeWidth={1.5} />
                        <span>Delete Dishes</span>
                    </div>
                </Button>
            }
        </div>
    )
}
