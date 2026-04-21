import { Request, Response, NextFunction } from "express";
import { contextStorage, RequestContext } from "../utils/context.js";

export const contextMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const forwardedFor = req.headers["x-forwarded-for"];
    let ip: string | undefined;

    if (forwardedFor) {
        ip = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor.split(",")[0];
    } else {
        ip = req.socket.remoteAddress || req.ip;
    }

    // Standardize loopback addresses
    if (ip === "::1" || ip === "::ffff:127.0.0.1") {
        ip = "127.0.0.1";
    }

    const context: RequestContext = {
        ip_address: ip || undefined,
        user_agent: (req.headers['user-agent'] as string) || undefined,
        user_id: null
    };

    contextStorage.run(context, () => next());
};