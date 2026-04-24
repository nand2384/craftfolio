import type { RegisterUserData, LoginUserData } from "../../services.js";
import services from "../../services.js";
import bcrypt from "bcrypt";
import { getContext } from "../../utils/context.js";
import dotenv from "dotenv";
dotenv.config();

const SALT_ROUNDS = 10;

export const registerUser = async (userData: RegisterUserData) => {
    const { first_name, last_name, email, password } = userData;
    const user_id = await services.utils.generateId(10);
    const role_id = 1;
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    try {
        const checkIfRegistered = await services.pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if(checkIfRegistered.rowCount !== 0) {
            return { success: false, error: "You already have an account, please login instead." };
        }

        const newUser = await services.pool.query(`INSERT INTO users (user_id, role_id, email, password_hash, first_name, last_name)
            VALUES ($1, $2, $3, $4, $5, $6)`, [user_id, role_id, email, password_hash, first_name, last_name]);

        if(!newUser) return { success: false, error: "Something went wrong, please try again later." };

        if(newUser.rowCount == 0) return { success: false, error: "Something went wrong, please try again later." };

        // Update context & log the registration
        const context = getContext();
        if (context) context.user_id = user_id;
        
        await services.audit.logAction('USER_REGISTER', 'users', user_id.toString());

        const jwt = services.utils.generateJwtToken(user_id as number, email, role_id);

        return { success: true, jwt, role_id, userData: { first_name, last_name, email } };
    } catch (error: any) {
        await services.audit.logAction('USER_REGISTER_FAILURE', 'auth', undefined, undefined, { email, error: error.message });
        return { success: false, error: error };
    }
};

export const loginUser = async (userData: LoginUserData) => {
    const { email, password } = userData;
    
    try {
        const getData = await services.pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        const data = getData.rows[0];
        const password_hash = data.password_hash;
        const comparePassword = await bcrypt.compare(password, password_hash);

        if(!comparePassword) {
            await services.audit.logAction('LOGIN_FAILURE', 'auth', undefined, undefined, { email, reason: 'Invalid password' });
            return { success: false, error: "Invalid credentials" };
        }

        // Update context & log the login
        const context = getContext();
        if (context) context.user_id = data.user_id;

        await services.audit.logAction('LOGIN_SUCCESS', 'auth', data.user_id.toString());

        const jwt = services.utils.generateJwtToken(data.user_id, email, data.role_id);

        return { success: true, jwt, role_id: data.role_id, userData: { first_name: data.first_name, last_name: data.last_name, email, avatar_url: data.avatar_url || "" }};
    } catch (error: any) {
        await services.audit.logAction('LOGIN_FAILURE', 'auth', undefined, undefined, { email, error: error.message });
        return { success: false, error: error };
    }
};

export const setPassword = async (user_id: string, password: string) => {
    try {
        const password_hash = await bcrypt.hash(password, SALT_ROUNDS);
        const result = await services.pool.query(
            "UPDATE users SET password_hash = $1 WHERE user_id = $2 RETURNING *",
            [password_hash, user_id]
        );

        if (result.rowCount === 0) {
            return { success: false, error: "User not found" };
        }

        await services.audit.logAction('PASSWORD_UPDATE', 'users', user_id.toString(), undefined, { method: 'set_password' });

        return { success: true };
    } catch (error: any) {
        console.error("Set Password Error:", error);
        await services.audit.logAction('PASSWORD_UPDATE_FAILURE', 'users', user_id.toString(), undefined, { error: error.message });
        return { success: false, error: error.message };
    }
};