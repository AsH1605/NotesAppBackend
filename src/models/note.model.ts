import {User} from './user.model'

export interface Note{
    id: number;
    title: string;
    user_id: number;
    content: string;
    created_at: Date;
    last_updated_at: Date;
}