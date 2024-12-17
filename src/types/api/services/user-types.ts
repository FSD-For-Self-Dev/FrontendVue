import type { UserDto } from '@/dto/user.dto';
import type { AxiosPromise } from 'axios';

export type User = {
  getUser: () => AxiosPromise<Record<string, string>>;
  patchUser: (data: UserDto) => AxiosPromise<Record<string, string>>;
  deleteUser: () => AxiosPromise<Record<string, string>>;
};
