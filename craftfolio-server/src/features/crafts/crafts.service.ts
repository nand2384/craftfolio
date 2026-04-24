import services from "../../services.js";

export const saveCraft = async (userId: number, craftData: any) => {
    const { craft_id, template_id, craft_name, data } = craftData;

    // If craft_id exists, we update. If not, we insert.
    if (craft_id) {
        const query = `
        UPDATE crafts
        SET craft_data = $1, craft_name = $2, updated_at = NOW()
        WHERE craft_id = $3 AND user_id = $4
        RETURNING *;
        `;
        const result = await services.pool.query(query, [JSON.stringify(data), craft_name, craft_id, userId]);
        return result.rows[0];
    } else {
        // Create a new craft
        const newId = await services.utils.generateId(22);
        const query = `
        INSERT INTO crafts (craft_id, user_id, template_id, craft_name, craft_data)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `;
        const result = await services.pool.query(query, [newId, userId, template_id, craft_name, JSON.stringify(data)]);
        return result.rows[0];
    }
};