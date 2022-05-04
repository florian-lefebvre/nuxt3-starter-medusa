import { CookieRef } from "#app";
import { ComputedRef, Ref } from "vue";

type Options = {
    key: string;
    state: { [key: string]: Ref<any> };
    exclude?: string[];
};

export const useStoreStorage = ({ key, state, exclude = [] }: Options) => {
    const initCookie = useCookie<boolean>(`${key}:initialized`);

    // Check if all excluded keys are valid
    for (const e of exclude) {
        if (!Object.keys(state).includes(e)) {
            throw `useStoreStorage: exclude key "${e}" does not exist in state`;
        }
    }

    // Setup cookies: based on all state keys except excluded ones
    const cookies: { [key: string]: CookieRef<any> } = {};
    for (const k of Object.keys(state).filter((k) => !exclude.includes(k))) {
        const value = state[k];
        const cookie = useCookie<typeof value>(`${key}:${k}`);
        cookies[k] = cookie;
    }

    // Watch for changes in state and update cookies
    const handler = () => {
        for (const [k, v] of Object.entries(cookies)) {
            v.value = state[k].value;
        }
    };
    watch([...Object.values(state)], handler);

    const load = () => {
        for (const [k, v] of Object.entries(cookies)) {
            state[k].value = v.value;
        }
    };

    const reset = () => {
        for (const cookie of [...Object.values(cookies), initCookie]) {
            cookie.value = undefined;
        }
    };

    const init = () => {
        if (initCookie.value) {
            load();
        } else {
            handler();
            initCookie.value = true;
        }
    };

    return { load, reset, init };
};
