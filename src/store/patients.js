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
        async findAllPatients({commit}) {
            const patients = await PatientService.findAll();
            commit("SET_PATIENTS", patients.map((patient) => adapter.toDisplay(patient)));
        },
        async findPatientById({commit}, id) {
            const patient = await PatientService.findById(id);
            commit("SET_SELECTED_PATIENT", adapter.toDisplay(patient));
        },
        async savePatient({commit}, patient) {
            const saved = await PatientService.post(adapter.toApi(patient));
            commit("PUSH_PATIENT", adapter.toDisplay(saved));
        },
        async editPatient({commit}, {id, patient}) {
            const edited = await PatientService.patch(id, adapter.toApi(patient));
            commit("EDIT_PATIENT", adapter.toDisplay(edited));
        },
        async deletePatientById({commit}, id) {
            await PatientService.deleteById(id);
            commit("DELETE_PATIENT", id);
        },
        setSelectedPatient({commit}, patient) {
            commit("SET_SELECTED_PATIENT", patient);
        }
    }
}

export default store;