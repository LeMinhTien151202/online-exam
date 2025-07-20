export interface UserDto {
  user_id: number;
  roleId: number;
  userName: string;
  email: string;
  phone: string;
  password?: string;
  role?: RoleDto;
}
import { RoleDto } from './role.dto';
