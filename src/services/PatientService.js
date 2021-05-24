import http from "./HttpClient";

const ref = "patients";

export default class PatientService {

    static async findById(id) {
        const address = [ref, id].join("/")
        const response = await http.get(address);
        return response.data;
    }

    static async findAll() {
        const response = await http.get(ref);
        return response.data;
    }

    static async post(patient) {
        const response = await http.post(ref, patient);
        return response.data
    }


    static async patch(id, patient) {
        const address = [ref, id].join("/");
        const response = await http.patch(address, patient);
        return response.data;
    }

    static async deleteById(id) {
        const address = [ref, id].join("/");
        const response = await http.delete(address);
        return response.data;
    }
}
