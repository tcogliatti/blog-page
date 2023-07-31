import { ENV } from "../utils";

export class User {
    baseApi = ENV.BASE_API;

    async getMe(tokenAccess) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.USER_ME}`;
            const params = {
                headers: {
                    Authorization: `Bearer ${tokenAccess}`
                }
            }
            const response = await fetch(url, params);
            const result = await response.json();

            if(response.status !== 200) throw result;
            
            return result;

        } catch (error) {
            throw error;
        }
    }
}