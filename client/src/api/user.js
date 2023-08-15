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

            if (response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }


    async createUser(tokenAccess, data) {
        try {
            /*
                esto es porque la info que va en el body no es un JSON 
                si no un multipart form que contiene la imagen del avatar
            */
            const formData = new FormData();

            // le manda al objeto form data las claves y valores que recibe de data
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });

            if (data.fileAvatar)
                formData.append("avatar", data.fileAvatar);

            const url = `${this.baseApi}/${ENV.API_ROUTES.USER}`;
            const params = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${tokenAccess}`
                },
                body: formData,
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

    async getUsers(tokenAccess, active = undefined) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.USERS}?active=${active}`;
            const params = {
                headers: {
                    Authorization: `Bearer ${tokenAccess}`
                }
            }
            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }

    async updateUser(tokenAccess, idUser, userData) {
        try {
            if(!userData.password)
                delete userData.password;

            const formData = new FormData();

            Object.keys(userData).forEach((key) => {
                formData.append(key, userData[key]);
            });

            if (userData.fileAvatar)
                formData.append("avatar", userData.fileAvatar);

            const url = `${this.baseApi}/${ENV.API_ROUTES.USER}/${idUser}`;
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${tokenAccess}`
                },
                body: formData,
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

    async deleteUser(tokenAccess, idUser) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.USER}/${idUser}`;
            const params = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${tokenAccess}`
                },
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200)
                throw result;

            return result;
            
        } catch (error) {
            throw(error);
        }
    }
}