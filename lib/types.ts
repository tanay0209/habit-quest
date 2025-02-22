export type User = {
    id: string,
    username: string,
    email: string,
    categoryCount: number
    categoryMax: number
    categories: Category[]
    coins: number
}

export type Category = {
    id: string,
    icon: string,
    name: string
}