import type { IdGeneratorData } from "../types.js";
import pool from "../config/db.js";

export const generateId = async (id: number) => {
  try {
    const variableData: IdGeneratorData[] = [
      { id: 10, table: "users", column: "user_id" },
      { id: 21, table: "templates", column: "template_id" },
      { id: 30, table: "crafts", column: "craft_id" },
    ];

    const currentVariableData: IdGeneratorData | undefined = variableData.find((data) => data.id == id);

    if (!currentVariableData) {
      throw new Error(`Invalid ID prefix: ${id}`);
    }

    let uniqueId: number = 0;
    let isUnique = false;

    while (!isUnique) {
      const tempId = Math.floor(100000 + Math.random() * 900000);
      uniqueId = Number(`${currentVariableData.id}${tempId}`);

      const result = await pool.query(`SELECT * FROM ${currentVariableData.table} WHERE ${currentVariableData.column} = $1`, [uniqueId]);

      if (result.rowCount === 0) {
        isUnique = true;
      }
    };

    return uniqueId;

  } catch (error) {
    console.log("Error generating id: ", error);
    throw new Error("Error generating id");
  }
};
