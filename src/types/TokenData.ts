import { User } from "./User"

export type tokenData = {
    user: User,
    exp: number,
    iat: number
}