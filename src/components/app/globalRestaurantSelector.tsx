"use client"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { useMenufyOptions } from "@/providers/optionsProvider"
import { useRecoilState } from 'recoil'
import { SelectedRestaurant } from '@/store/recoil/restAtom'
import LoaderCmp from "./loader"
export function GlobalRestaurantSelc() {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("");
    const options = useMenufyOptions();
    const [label, setLabel] = useState("");
    const [selcRest, setSelcRest] = useRecoilState(SelectedRestaurant);

    useEffect(() => {
        if (selcRest && selcRest.id) {
            const { id, name } = selcRest
            setLabel(name)
            setValue(`${id}`)
        }
    }, [selcRest])

    const setSelectedRest = (id: number, name: string) => {
        window.localStorage.setItem("menufy/active-rest", `${id}:${name}`);
        setSelcRest({
            id, name
        })
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[95%] mx-auto justify-between"
                >
                    {label}
                    {
                        options?.restaurants ? <ChevronsUpDown className="opacity-50" /> : <LoaderCmp />
                    }
                </Button>

            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search Restaurant..." />
                    <CommandList>
                        <CommandEmpty>No Restaurant Info found.</CommandEmpty>
                        <CommandGroup>
                            {options?.restaurants && options.restaurants.map((rest) => (
                                <CommandItem
                                    key={rest.id}
                                    value={rest.name}
                                    onSelect={(currentValue) => {
                                        setOpen(false)
                                        console.log({
                                            currentValue,
                                            value
                                        })
                                        setValue(currentValue === value ? "" : currentValue)
                                        setSelectedRest(rest.id, rest.name)
                                    }}
                                >
                                    {rest.name}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === `${rest.id}` ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
