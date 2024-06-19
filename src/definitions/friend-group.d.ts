import type { User } from '@/definitions';
import type { Writable } from 'svelte/store';

export type FriendGroup = {
  name: string;
  admin: number | null;
  description: string;
  id?: number;
  users?: User[];
};

export type FriendGroupContextValue = {
  getFriendGroups: () => Promise<void>;
  friendGroups: Writable<FriendGroup[] | null>;
  friendGroupsLoading: Writable<boolean>;
  getFriendGroup: (id: number) => Promise<void>;
  friendGroup: Writable<FriendGroup | null>;
  friendGroupLoading: Writable<boolean>;
  deleteFriendGroup: (id: number) => Promise<void>;
  deleteFriendGroupLoading: Writable<boolean>;
};
