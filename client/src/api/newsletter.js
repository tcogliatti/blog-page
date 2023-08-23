import { ENV } from "../utils";

export class Newsletter {
    baseApi = ENV.BASE_API;

    async createNewesletter(accessToken, data) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.NEWSLETTER}`;
            const params = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                body: data,
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 201)
                throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }

    async getNewesletter(accessToken, page = 1, limit = 10) {

        try {
            const pageFilter = `page=${page}`;
            const limitFilter = `limit=${limit}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.NEWSLETTER}?${pageFilter}&${limitFilter}`;

            const params = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200)
                throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }
    async deleteNewesletter(accessToken, idMenu) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.NEWSLETTER}/${idMenu}`;
            const params = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }

            const response = await fetch(url, params);
            const results = await response.json();

            if (response.status !== 200)
                throw results;

            return results;
        } catch (error) {
            throw error;
        }
    }

    async registerEmail(email) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.NEWSLETTER}`;
            const params = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200)
                throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }
}