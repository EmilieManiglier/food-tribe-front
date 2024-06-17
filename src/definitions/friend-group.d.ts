import type { User } from '@/definitions';
import type { Writable } from 'svelte/store';

export type FriendGroup = {
  id: number;
  name: string;
  admin: number;
  description?: string;
  users?: User[];
};

export type FriendGroupContextValue = {
  getFriendGroups: () => Promise<void>;
  friendGroups: Writable<FriendGroup[]>;
  friendGroupsLoading: Writable<boolean>;
};
