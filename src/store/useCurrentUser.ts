import { isEmpty } from 'lodash';
import { writable, get } from 'svelte/store';

import type { User } from '@/definitions';

const storedUser: User = JSON.parse(localStorage.getItem('user') || '{}');
const user = writable<User | null>(isEmpty(storedUser) ? null : storedUser);

const currentUser = {
  subscribe: user.subscribe,
  set: (value: User | null) => {
    if (!value) {
      localStorage.removeItem('user');
    } else {
      localStorage.setItem('user', JSON.stringify(value));
    }
    user.set(value);
  },
  get: (): User | null => get(user)
};

export const useCurrentUser = () => {
  return {
    currentUser,
    initials: (): string => {
      const currentUser = get(user);
      if (currentUser) {
        const { firstname, lastname } = currentUser || {};
        return firstname?.[0]?.charAt(0) + lastname?.[0]?.charAt(0);
      }
      return '';
    }
  };
};
