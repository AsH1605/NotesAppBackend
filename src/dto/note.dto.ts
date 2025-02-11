export interface CreateNoteRequest{
    title: string,
    content: string,
    latitude?: number,
    longitude?: number,
    address?: string,
}

export interface UpdateNoteRequest{
    title: string,
    content: string
}
