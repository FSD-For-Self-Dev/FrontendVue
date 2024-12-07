import { defineStore } from 'pinia';

export type Notification = {
    id: number;
    type: 'error' | 'info';
    text: string;
};

interface NotificationsStore {
    pk: number;
    messages: Notification[];
}

export const useNotificationsStore = defineStore('message', {
    state: (): NotificationsStore => ({
        pk: 0,
        messages: [],
    }),
    actions: {
        addNewMessage(message: Omit<Notification, 'id'>) {
            this.messages.push({
                id: this.pk,
                ...message,
            });
            this.pk += 1;
        },
        deleteMessageById(id: number) {
            this.messages = this.messages.filter(
                (message) => message.id !== id,
            );
        },
    },
});
