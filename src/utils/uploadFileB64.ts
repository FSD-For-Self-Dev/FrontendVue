import { useBase64 } from '@vueuse/core';

export const uploadFile = async (target: HTMLInputElement) => {
    const files = target.files;

    if (files) {
        const file = files[0];
        const base64 = useBase64(file);
        return await base64.promise.value;
    }

    return '';
}
