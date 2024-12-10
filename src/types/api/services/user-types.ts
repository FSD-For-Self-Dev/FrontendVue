import type { UserDto } from '@/dto/user.dto';
import type { AxiosPromise } from 'axios';

export type User = {
  getUser: (locale?: string) => AxiosPromise<Record<string, string>>;
  patchUser: (data: UserDto, locale?: string) => AxiosPromise<Record<string, string>>;
  deleteUser: () => AxiosPromise<Record<string, string>>;
};
