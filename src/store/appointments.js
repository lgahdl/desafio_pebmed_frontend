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
        async findAllAppointments({commit, dispatch}) {
            try {
                const appointments = await AppointmentService.findAll();
                commit("SET_APPOINTMENTS", appointments.map((appointment) => adapter.toDisplay(appointment)));
            } catch (error) {
                dispatch("clearLoadingState");
                dispatch("setError", error);
                dispatch("setErrorMessage", "As consultas não puderam ser encontradas");
                dispatch("setErrorModal", true);
            }
        },
        async findAppointmentById({commit, dispatch}, id) {
            try {
                const appointment = await AppointmentService.findById(id);
                commit("SET_SELECTED_APPOINTMENT", adapter.toDisplay(appointment));
            } catch (error) {
                dispatch("clearLoadingState");
                dispatch("setError", error);
                dispatch("setErrorMessage", "A consulta não pôde ser encontrada!");
                dispatch("setErrorModal", true);
            }
        },
        async saveAppointment({commit, dispatch}, appointment) {
            try {
                const saved = await AppointmentService.post(adapter.toApi(appointment));
                commit("PUSH_APPOINTMENT", adapter.toDisplay(saved));
            } catch (error) {
                dispatch("clearLoadingState");
                dispatch("setError", error);
                dispatch("setErrorMessage", "A consulta não pôde ser registrada");
                dispatch("setErrorModal", true);
            }
        },
        async editAppointment({commit, dispatch}, {id, appointment}) {
            try {
                const edited = await AppointmentService.patch(id, adapter.toApi(appointment));
                commit("EDIT_APPOINTMENT", adapter.toDisplay(edited));
            } catch (error) {
                dispatch("clearLoadingState");
                dispatch("setError", error);
                dispatch("setErrorMessage", "A consulta não pôde ser editada");
                dispatch("setErrorModal", true);
            }
        },
        async deleteAppointmentById({commit, dispatch}, id) {
            try {
                await AppointmentService.deleteById(id);
                commit("DELETE_APPOINTMENT", id);
            } catch (error) {
                dispatch("clearLoadingState");
                dispatch("setError", error);
                dispatch("setErrorMessage", "A consulta não pôde ser deletada.");
                dispatch("setErrorModal", true);
            }
        },
        setSelectedAppointment({commit}, appointment) {
            commit("SET_SELECTED_APPOINTMENT", appointment);
        }
    }
}

export default store;