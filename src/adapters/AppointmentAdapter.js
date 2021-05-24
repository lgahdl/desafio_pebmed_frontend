import moment from "moment";

export default class AppointmentAdapter {

    static toDisplay(api) {
        let appointment = {};
        appointment.appointment_id = api.appointment_id;
        console.log(appointment);
        appointment.date = new Date(api.date.split("T")[0]).toLocaleDateString("pt-BR", {timeZone: "UTC"});
        appointment.time = new Date(api.date).toLocaleTimeString("pt-BR", {timeZone: "UTC"}).split(" ")[0];
        appointment.patient_id = api.patient_id;
        appointment.annotations = api.annotations;
        appointment.created_at = api.created_at;
        appointment.updated_at = api.updated_at;
        appointment.patient = api.patient;
        return appointment;
    }

    static toApi(display) {
        let appointment = {};
        appointment.appointment_id = display.appointment_id;
        appointment.date = moment(display.date, "DD/MM/YYYY").format("YYYY-MM-DD") + "T" + display.time + "+0000";
        appointment.patient_id = display.patient_id;
        appointment.annotations = display.annotations;
        appointment.created_at = display.created_at;
        appointment.updated_at = display.updated_at;
        appointment.patient = display.patient;
        return appointment;
    }

}