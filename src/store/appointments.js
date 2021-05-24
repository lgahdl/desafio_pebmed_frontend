import AppointmentService from "../services/AppointmentService";
import adapter from "../adapters/AppointmentAdapter";

const store = {
    state: {
        appointments: null,
        selectedAppointment: null
    },
    getters: {
        appointments(state) {
            return state.appointments;
        },
        selectedAppointment(state) {
            return state.selectedAppointment;
        }
    },
    mutations: {
        SET_APPOINTMENTS(state, appointments) {
            state.appointments = appointments;
        },
        PUSH_APPOINTMENT(state, appointment) {
            state.appointments.push(appointment);
        },
        SET_SELECTED_APPOINTMENT(state, appointment) {
            state.selectedAppointment = appointment;
        },
        DELETE_APPOINTMENT(state, appointment_id) {
            const index = state.appointments.findIndex(appointment => appointment.appointment_id === appointment_id);
            state.appointments.splice(index, 1);
        },
        EDIT_APPOINTMENT(state, edited) {
            const index = state.appointments.findIndex(appointment => appointment.appointment_id === edited.appointment_id);
            Object.assign(state.appointments[index], edited);
        }
    },
    actions: {
        async findAllAppointments({commit}) {
            const appointments = await AppointmentService.findAll();
            commit("SET_APPOINTMENTS", appointments.map((appointment) => adapter.toDisplay(appointment)));
        },
        async findAppointmentById({commit}, id) {
            const appointment = await AppointmentService.findById(id);
            commit("SET_SELECTED_APPOINTMENT", adapter.toDisplay(appointment));
        },
        async saveAppointment({commit}, appointment) {
            const saved = await AppointmentService.post(adapter.toApi(appointment));
            commit("PUSH_APPOINTMENT", adapter.toDisplay(saved));
        },
        async editAppointment({commit}, {id, appointment}) {
            const edited = await AppointmentService.patch(id, adapter.toApi(appointment));
            commit("EDIT_APPOINTMENT", adapter.toDisplay(edited));
        },
        async deleteAppointmentById({commit}, id) {
            await AppointmentService.deleteById(id);
            commit("DELETE_APPOINTMENT", id);
        },
        setSelectedAppointment({commit}, appointment) {
            commit("SET_SELECTED_APPOINTMENT", appointment);
        }
    }
}

export default store;