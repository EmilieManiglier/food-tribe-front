import { toast } from '@zerodevx/svelte-toast';

export const displayToast = (
  status: 'success' | 'error' | 'warning',
  message: string
) => {
  toast.push(message, {
    classes: [`custom-${status}-toaster`]
  });
};
