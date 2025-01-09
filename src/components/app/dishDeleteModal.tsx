'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { useInvalidateQueries } from "@/hooks/use-query-invalidate"
import { SelectedRestaurant } from "@/store/recoil/restAtom"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import React from 'react'
import { useRecoilValue } from "recoil"
import { toast } from "sonner"
export default function DishDeleteModal({
  id,
  name,
  open,
  categoryId,
  setOpen
}: {
  id: string,
  name: string,
  open: boolean,
  categoryId: string,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {

  const rest = useRecoilValue(SelectedRestaurant)
  const invalidateQueries = useInvalidateQueries()
  const { isPending, mutate } = useMutation({
    mutationKey: ["delete-dish", id],
    mutationFn: async () => {
      await axios.delete(`api/v1/dish/delete?dishId=${id}`)
    },
    onSuccess: () => {
      toast.success(`${name} deleted.`, { id: "dish-delete" });
      invalidateQueries(["dishes", rest?.id, categoryId])
      setOpen(false)
    },
    onError: () => {
      toast.error("Error occured while deleting the dish", { id: "dish-delete" })
      setOpen(false)
    }
  })


  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure you want to delete this item?</AlertDialogTitle>
          <AlertDialogDescription className='text-sm'>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => {
              toast.loading("Deleting the dish", { id: "dish-delete" })
              mutate()
            }}
          >
            Confirm Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
