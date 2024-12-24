export type SidebarItemType = SidebarSingleItemType[]

export type SidebarSingleItemType = {
    title: string,
    url: string,
    items: ItemType[]
}

export type ItemType = {
    title: string,
    url: string,
}