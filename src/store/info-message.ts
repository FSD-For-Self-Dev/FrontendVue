import { defineStore } from 'pinia';

export type InfoMessage = {
    id: number;
    type: 'error' | 'info';
    text: string;
};

interface InfoMessagesStore {
    pk: number;
    messages: InfoMessage[];
}

export const useInfoMessagesStore = defineStore('info-message', {
    state: (): InfoMessagesStore => ({
        pk: 0,
        messages: [],
    }),
    actions: {
        addNewMessage(message: Omit<InfoMessage, 'id'>) {
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
