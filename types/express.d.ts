import { JwtPayload } from '../path/to/jwt-payload.interface'; // Adjust the path as necessary

declare global {
    namespace Express {
        interface Request {
            keyStore?: any; // Replace `any` with the actual type of `keyStore` if available
            user?: JwtPayload;
            refreshToken?: string;
        }
    }
}
