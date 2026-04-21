import services from "../../services.js";
import { getContext } from "../../utils/context.js";

export const logAction = async (
    action: string,
    resource: string,
    resourceId?: string,
    oldVal?: any,
    newVal?: any
) => {
    const ctx = getContext();

    try {
        await services.pool.query(`
            INSERT INTO audit_logs 
            (user_id, action_type, resource_type, resource_id, old_value, new_value, ip_address, user_agent) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, 
            [ctx?.user_id || null, action, resource, resourceId || null, oldVal || null, newVal || null, ctx?.ip_address, ctx?.user_agent]);
    } catch (error) {
        console.error("Audit log failed: ", error);
    }
};