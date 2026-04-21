import { AsyncLocalStorage } from "node:async_hooks";

export type RequestContext = {
    user_id?: number | null;
    ip_address?: string;
    user_agent?: string;
};

export const contextStorage = new AsyncLocalStorage<RequestContext>();

export const getContext = () => contextStorage.getStore();