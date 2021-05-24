import GenderEnum from "../enums/GenderEnum";
import moment from 'moment';
import appointmentAdapter from "./AppointmentAdapter";

export default class PatientAdapter {

    static toDisplay(api) {
        let patient = {};
        patient.patient_id = api.patient_id;
        patient.name = api.name;
        patient.gender = GenderEnum[api.gender];
        patient.height = api.height;
        patient.weight = api.weight;
        patient.phone_number = api.phone_number;
        patient.birthday = new Date(api.birthday.split("T")[0]).toLocaleDateString("pt-BR", {timeZone: "UTC"});
        patient.created_at = api.created_at;
        patient.updated_at = api.updated_at;
        patient.appointments = api.appointments && api.appointments.map((appointment) => appointmentAdapter.toDisplay(appointment));
        return patient;
    }

    static toApi(display) {
        let patient = {};
        patient.patient_id = display.patient_id;
        patient.name = display.name;
        patient.gender = Object.keys(GenderEnum).find(key => GenderEnum[key] === display.gender);
        patient.height = display.height;
        patient.weight = display.weight;
        patient.phone_number = display.phone_number;
        patient.birthday = moment(display.birthday, "DD/MM/YYYY").format("YYYY-MM-DD");
        patient.created_at = display.created_at;
        patient.updated_at = display.updated_at;
        patient.appointments = display.appointments;
        return patient;
    }

}