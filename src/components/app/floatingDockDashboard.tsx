'use client'
import React, { useRef, useState } from 'react'
import { motion, MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { FloatingDockItems } from '@/lib/config'
import { LinkItem } from '@/types/optionsProvider'

export default function FloatingDockDashboard() {
    const mouseX = useMotionValue(Infinity)
    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="absolute bottom-4 inset-x-0 mx-auto border px-4 py-2 rounded-full w-fit h-[60px] flex items-center justify-between gap-4">
            {
                FloatingDockItems.map((item) => {
                    return <IconContainer mouseX={mouseX} key={item.link} item={item} />
                })
            }
        </motion.div>
    )
}



function IconContainer({
    item,
    mouseX
}: {
    item: LinkItem,
    mouseX: MotionValue
}) {

    const pathname = usePathname();
    const isActive = pathname === item.link;
    const [hovered, setHovered] = useState<boolean>(false)
    const ref = useRef<HTMLDivElement | null>(null)
    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
        return val - bounds.x - (bounds.width / 2)
    })
    const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])
    const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])
    const widthIconTransform = useTransform(distance, [-150, 0, 150], [20, 40, 20])
    const heightIconTransform = useTransform(distance, [-150, 0, 150], [20, 40, 20])

    const width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12
    })
    const height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12
    })
    const widthIcon = useSpring(widthIconTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12
    })
    const heightIcon = useSpring(heightIconTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12
    })


    return <Link
        href={item.link}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
    >
        <motion.div
            ref={ref}
            style={{
                width,
                height,
            }}
            className={cn("h-14 w-14 p-2 flex items-center justify-center rounded-full border relative", isActive ? "border-2  border-purple-500" : "")}>
            {
                hovered && <motion.div
                    initial={{
                        opacity: 0,
                        y: 10,
                        x: "-50%"
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        x: "-50%"
                    }}
                    exit={{
                        opacity: 0,
                        y: 2,
                        x: "-50%"
                    }}
                    transition={{
                        duration: 0.2
                    }}
                    className='absolute left-1/2 -translate-x-1/2 -top-8 rounded-full px-3 py-1 border text-xs whitespace-pre bg-background w-fit'>{item.label}</motion.div>
            }
            <motion.div
                style={{
                    width: widthIcon,
                    height: heightIcon
                }}
                className='flex items-center justify-center'>
                <item.icon strokeWidth={1} />
            </motion.div>
        </motion.div>
    </Link>
}