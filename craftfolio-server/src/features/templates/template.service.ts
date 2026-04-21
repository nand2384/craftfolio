import pool from "../../config/db.js";
import services from "../../services.js";

export const getAllTemplates = async (includeInactive = false) => {
    // Joining with value_master to get the profession name/slug
    const query = `
        SELECT 
            t.template_id, 
            t.name, 
            t.description, 
            t.thumbnail, 
            t.blueprint_key, 
            t.is_active,
            LOWER(COALESCE(v.value_name, '')) as profession_slug
        FROM templates t
        LEFT JOIN value_master v ON t.profession_id = v.value_id
        ${includeInactive ? '' : 'WHERE t.is_active = true'}
        ORDER BY t.template_id ASC
    `;
    const result = await pool.query(query);
    return result.rows;
};

export const getTemplateById = async (id: string) => {
    const query = `SELECT * FROM templates WHERE template_id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

export const addTemplate = async (templateData: any) => {
    const { 
        name, 
        description, 
        blueprint_key, 
        thumbnail, 
        profession_id,
        is_active
    } = templateData;
    
    // Use the JS utility (ID 21 for templates as you just defined)
    const newId = await services.utils.generateId(21);
    
    // Insert into database
    const result = await pool.query(
        `INSERT INTO templates (template_id, profession_id, name, description, thumbnail, blueprint_key, is_active) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [
            newId, 
            profession_id, 
            name, 
            description, 
            thumbnail, 
            blueprint_key, 
            is_active ?? true // Default to true so it shows up immediately
        ]
    );
    
    return result.rows[0];
};
