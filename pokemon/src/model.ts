class Pokemon {
    id: number
    name: string
    type: string
    url: string

    constructor(id: number, name: string, type: string, url:string) {
        this.id = id
        this.name = name
        this.type = type
        this.url = url
    }
}

export {Pokemon}