import { Profile } from './profile.entity';
import { Logs } from 'src/logs/logs.entity';
import { Roles } from 'src/roles/roles.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    age: number;
    profile: Profile;
    logs: Logs[];
    roles: Roles[];
}
