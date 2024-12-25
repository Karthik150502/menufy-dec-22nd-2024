'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React from 'react'

export default function DishDeleteModal({
  id
}: {
  id: number
}) {
  return (
    <Popover>
      <PopoverTrigger>Delete</PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>

  )
}
