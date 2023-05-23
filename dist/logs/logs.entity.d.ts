import { User } from '../user/user.entity';
export declare class Logs {
    id: number;
    path: string;
    methods: string;
    data: string;
    result: string;
    user: User;
}
