import http from "./HttpClient";

const ref = "appointments";

export default class AppointmentService {
    
    static async findById(id) {
        const address = [ref, id].join("/")
        const response = await http.get(address);
        return response.data;
    }

    static async findAll() {
        const response = await http.get(ref);
        return response.data;
    }

    static async post(appointment) {
        const response = await http.post(ref, appointment);
        return response.data
    }

    static async patch(id, appointment) {
        const address = [ref, id].join("/");
        const response = await http.patch(address, appointment);
        return response.data;
    }

    static async deleteById(id) {
        const address = [ref, id].join("/");
        const response = await http.delete(address);
        return response.data;
    }

}