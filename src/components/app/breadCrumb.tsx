'use client'
import { usePathname } from 'next/navigation';
import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default function BreadCrumbHeader() {
    const pathname = usePathname();
    const paths = pathname === "/" ? [""] : pathname?.split("/")
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {paths.map((path, i) => {
                    const lastItem = i === paths.length - 1;
                    return <React.Fragment key={path}>
                        <BreadcrumbItem className="hidden md:block" >
                            {
                                lastItem ? <p className='cursor-pointer'>
                                    {path}
                                </p > : <BreadcrumbLink href={`/${path}`}>
                                    {path}
                                </BreadcrumbLink>
                            }

                        </BreadcrumbItem>
                        {!lastItem && <BreadcrumbSeparator className="hidden md:block" />}
                    </React.Fragment>
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
