import PatientService from "../services/PatientService";
import adapter from "../adapters/PatientAdapter";

const store = {
    state: {
        patients: null,
        selectedPatient: null
    },
    getters: {
        patients(state) {
            return state.patients;
        },
        selectedPatient(state) {
            return state.selectedPatient;
        }
    },
    mutations: {
        SET_PATIENTS(state, patients) {
            state.patients = patients;
        },
        PUSH_PATIENT(state, patient) {
            state.patients.push(patient);
        },
        SET_SELECTED_PATIENT(state, patient) {
            state.selectedPatient = patient;
        },
        DELETE_PATIENT(state, patient_id) {
            const index = state.patients.findIndex(patient => patient.patient_id === patient_id);
            state.patients.splice(index, 1);
        },
        EDIT_PATIENT(state, edited) {
            const index = state.patients.findIndex(patient => patient.patient_id === edited.patient_id);
            Object.assign(state.patients[index], edited);
        }
    },
    actions: {
        async findAllPatients({commit, dispatch}) {
            try {
                const patients = await PatientService.findAll();
                commit("SET_PATIENTS", patients.map((patient) => adapter.toDisplay(patient)));
            } catch (error) {
                dispatch("clearLoadingState");
                dispatch("setError", error);
                dispatch("setErrorMessage", "Os pacientes não puderam ser encontrados");
                dispatch("setErrorModal", true);
            }
        },
        async findPatientById({commit, dispatch}, id) {
            try {
                const patient = await PatientService.findById(id);
                commit("SET_SELECTED_PATIENT", adapter.toDisplay(patient));
            } catch (error) {
                dispatch("clearLoadingState");
                dispatch("setError", error);
                dispatch("setErrorMessage", "O paciente não pôde ser encontrado");
                dispatch("setErrorModal", true);
            }
        },
        async savePatient({commit, dispatch}, patient) {
            try {
                const saved = await PatientService.post(adapter.toApi(patient));
                commit("PUSH_PATIENT", adapter.toDisplay(saved));
            } catch (error) {
                dispatch("clearLoadingState");
                dispatch("setError", error);
                dispatch("setErrorMessage", "O paciente não pôde ser salvo(na plataforma)");
                dispatch("setErrorModal", true);
            }
        },
        async editPatient({commit, dispatch}, {id, patient}) {
            try {
                const edited = await PatientService.patch(id, adapter.toApi(patient));
                commit("EDIT_PATIENT", adapter.toDisplay(edited));
            } catch (error) {
                dispatch("clearLoadingState");
                dispatch("setError", error);
                dispatch("setErrorMessage", "O paciente não pôde ser editado");
                dispatch("setErrorModal", true);
            }
        },
        async deletePatientById({commit, dispatch}, id) {
            try {
                await PatientService.deleteById(id);
                commit("DELETE_PATIENT", id);
            } catch (error) {
                dispatch("clearLoadingState");
                dispatch("setError", error);
                dispatch("setErrorMessage", "O paciente não pôde ser deletado");
                dispatch("setErrorModal", true);
            }
        }
        ,
        setSelectedPatient({commit}, patient) {
            commit("SET_SELECTED_PATIENT", patient);
        }
    }
}

export default store;