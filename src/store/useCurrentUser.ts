import type { User } from '@/definitions';
import { writable, get } from 'svelte/store';

export const useCurrentUser = () => {
  const storedUser = localStorage.getItem('user');
  const user = writable<User | null>(null);

  if (storedUser) {
    user.set(JSON.parse(storedUser));
  }

  return {
    currentUser: {
      subscribe: user.subscribe,
      set: (value: User) => {
        localStorage.setItem('user', JSON.stringify(value));
        user.set(value);
      },
      get: (): User | null => get(user)
    }
  };
};
