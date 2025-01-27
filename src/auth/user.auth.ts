import jwt from "jsonwebtoken";

export function verifyJwtToken(token: string): string | undefined{
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET || '999')
        // console.log(JSON.parse(JSON.stringify(decoded)).user_id)
        return JSON.parse(JSON.stringify(decoded)).user_id
    } catch (error) {
        console.log(error)
        return undefined
    }
}
