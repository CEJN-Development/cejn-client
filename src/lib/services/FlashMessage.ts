import { FlashMessageStore } from "$lib/stores/FlashMessageStore";
import type { FlashMessage } from "$lib/types/FlashMessage";

export const setMessage = (message: FlashMessage): void => {
  const id = new Date().valueOf();
  const flashMessage: FlashMessage = {
    ...message,
    id,
  };

  FlashMessageStore.update((messages: FlashMessage[]) => [...messages, flashMessage]);

  setTimeout(() => {
    FlashMessageStore.update((messages: FlashMessage[]) => [...messages.filter(m => m.id != id)])
  }, 4000);
};

export const dismissMessage = (messageId: number): void => {
  FlashMessageStore.update((messages: FlashMessage[]) => [...messages.filter(m => m.id != messageId)])
};
