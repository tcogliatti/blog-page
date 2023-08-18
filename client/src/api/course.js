import { ENV } from "../utils";


export class Course {
    baseApi = ENV.BASE_API;

    async getCourses(params) {
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limitFilter = `limit=${params?.limit || 10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.COURSE}?${pageFilter}&${limitFilter}`;

            const response = await fetch(url);
            const result = await response.json();

            if (response.status !== 200)
                throw result;

            return result;

        } catch (error) {
            throw error;
        }
    }
    async createCourse(accessToken, data) {
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

            if (data.file)
                formData.append("miniature", data.file);

            const url = `${this.baseApi}/${ENV.API_ROUTES.COURSE}`;
            const params = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`
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

    async updateCourse(accessToken, idCourse, data) {
        try {
          
            const formData = new FormData();

            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });

            if (data.file)
                formData.append("miniature", data.file);

            const url = `${this.baseApi}/${ENV.API_ROUTES.COURSE}/${idCourse}`;
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}`
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

    async deleteCourse(accessToken, idCourse){
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.COURSE}/${idCourse}`;
            const params = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }

            const response = await fetch(url, params);
            const results = await response.json();

            if(response.status !== 200)
                throw results;

            return results;
        } catch (error) {
            throw error;
        }
    }
}