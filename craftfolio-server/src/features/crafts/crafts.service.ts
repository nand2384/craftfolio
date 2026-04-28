import services from "../../services.js";

/**
 * Saves or updates a craft draft
 */
export const saveCraft = async (userId: number, craftData: any) => {
    const { craft_id, template_id, craft_name, data, links } = craftData;

    // We store as a combined object
    const combinedData = { data, links };

    if (craft_id) {
        // UPDATE existing
        const query = `
            UPDATE crafts
            SET craft_data = $1, craft_name = $2, updated_at = NOW()
            WHERE craft_id = $3 AND user_id = $4
            RETURNING *;
        `;
        const result = await services.pool.query(query, [combinedData, craft_name, craft_id, userId]);
        return result.rows[0];
    } else {
        // INSERT new
        const newId = await services.utils.generateId(30);
        const query = `
            INSERT INTO crafts (craft_id, user_id, template_id, craft_name, craft_data)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const result = await services.pool.query(query, [newId, userId, template_id, craft_name, combinedData]);
        return result.rows[0];
    }
};

/**
 * Fetches all crafts for a specific user
 */
export const getUserCrafts = async (userId: number) => {
    const query = `
        SELECT 
            c.craft_id, 
            c.craft_name, 
            c.template_id, 
            c.craft_data, 
            c.created_at, 
            c.updated_at,
            t.name as template_name, 
            t.thumbnail as template_thumbnail
        FROM crafts c
        JOIN templates t ON c.template_id = t.template_id
        WHERE c.user_id = $1
        ORDER BY c.updated_at DESC;
    `;
    const result = await services.pool.query(query, [userId]);

    if (result.rowCount === 0) {
        return { success: true, data: [] };
    }

    if(!result) {
        return { success: false, message: "Error fetching crafts" }
    }

    const crafts = result.rows.map((craft: any) => {
        const { craft_data, ...rest } = craft;
        const parsedData = typeof craft_data === 'string'
            ? JSON.parse(craft_data)
            : craft_data;

        return {
            ...rest,
            data: parsedData?.data || {},
            links: parsedData?.links || {}
        };
    });

    return { success: true, data: crafts };
};