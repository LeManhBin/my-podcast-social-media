export interface user {
    id: number,
    name: string,
    email: string,
    nickName: string,
    avatar: string,
    summary: string,
    birthDay: string,
    createdAt: string,
    updatedAt: string
}

export interface category {
    id: number,
    name: string,
    createdAt: string,
    updatedAt: string
}

export interface post {
    id: number
    userId: number,
    categoryId: number,
    image: string,
    description: string,
    void: string,
    createdAt: string,
    updatedAt: string
}