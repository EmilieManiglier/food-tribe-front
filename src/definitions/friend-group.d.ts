import type { Writable } from 'svelte/store';

export type FriendGroup = {
  id: number;
  name: string;
  description?: string;
};

export type FriendGroupContextValue = {
  getFriendGroups: () => Promise<void>;
  friendGroups: Writable<FriendGroup[]>;
};
