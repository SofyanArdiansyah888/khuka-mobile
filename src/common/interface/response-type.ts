export interface ResponseListType<T> {
    data: T
    links: {
        first: string | null,
        last: string | null,
        prev: string | null,
        next: string | null,
    },
    meta: {
        current_page: number,
        from: number,
        last_page: number,
        links: {
            url: string | null,
            label: string,
            active: boolean
        }[]
    }
}