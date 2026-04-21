import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import services from "../../services.js";

passport.use(
    new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    scope: ["profile", "email"]
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0].value;
        if (!email) {
            return done(new Error("No email found in Google profile"), undefined);
        }

        const userResult = await services.pool.query("SELECT * FROM users WHERE email = $1", [email]);
        
        if (userResult.rowCount !== 0) {
            const user = userResult.rows[0];
            const token = services.utils.generateJwtToken(user.user_id, email, user.role_id);
            
            // Audit: Google Login
            await services.audit.logAction('LOGIN_SUCCESS', 'auth', user.user_id.toString(), undefined, { method: 'google' });
            
            return done(null, { user, token } as any);
        }

        // New user creation
        const user_id = await services.utils.generateId(10);
        const first_name = profile.name?.givenName || "User";
        const last_name = profile.name?.familyName || "";
        const avatar_url = profile.photos?.[0].value || "";
        const google_id = profile.id;
        const role_id = 1; // Default user Id

        const newUserResult = await services.pool.query(
            "INSERT INTO users (user_id, email, first_name, last_name, avatar_url, google_id, provider, role_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [user_id, email, first_name, last_name, avatar_url, google_id, "google", role_id]
        );

        const newUser = newUserResult.rows[0];
        const token = services.utils.generateJwtToken(newUser.user_id, email, newUser.role_id);
        
        // Audit: Google Register
        await services.audit.logAction('USER_REGISTER', 'users', user_id.toString(), undefined, { method: 'google' });
        
        return done(null, { user: newUser, token } as any);
    } catch (error: any) {
        console.error("Google Auth Error:", error);
        await services.audit.logAction('LOGIN_FAILURE', 'auth', undefined, undefined, { method: 'google', error: error.message });
        return done(error, null);
    }
}));

passport.serializeUser((data: any, done) => {
    // We store the full { user, token } object in the session
    done(null, data);
});

passport.deserializeUser((data: any, done) => {
    // Retrieve the full object back from the session
    done(null, data);
});