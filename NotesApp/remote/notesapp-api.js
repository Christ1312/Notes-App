const BASE_URL = 'https://notes-api.dicoding.dev/v2';

class NotesApi {
    static async getNotes() {
        return fetch(`${BASE_URL}/notes`)
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    return Promise.reject(new Error('Something went wrong'))
                }
            })
            .then((responseJson) => {
                const { data } = responseJson;
                return data;
            })
    }
    static async getNotes() {
        return fetch(`${BASE_URL}/notes`)
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    return Promise.reject(new Error('Something went wrong'))
                }
            })
            .then((responseJson) => {
                const { data } = responseJson;
                return data;
            })
    }
    static async addNotes() {
        return fetch(`${BASE_URL}/notes/archived`)
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    return Promise.reject(new Error('Something went wrong'))
                }
            })
            .then((responseJson) => {
                const { data } = responseJson;
                return data;
            })
    }
    static async deleteNotes() {
        return fetch(`${BASE_URL}/notes/{note_id}`)
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    return Promise.reject(new Error('Something went wrong'))
                }
            })
            .then((responseJson) => {
                const { data } = responseJson;
                return data;
            })
    }
}

export default NotesApi;