import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    showAddPropertyModal: boolean;
}

const initialState: ModalState = {
    showAddPropertyModal: false,
};

const propertyModalSlice = createSlice({
    name: "openPropertyModal",
    initialState,
    reducers: {
        openAddPropertyModal(state) {
            state.showAddPropertyModal = true;
        },
        closeAddPropertyModal(state) {
            state.showAddPropertyModal = false;
        },
        toggleAddPropertyModal(state) {
            state.showAddPropertyModal = !state.showAddPropertyModal;
        },
    },
});

export const { openAddPropertyModal, closeAddPropertyModal, toggleAddPropertyModal } = propertyModalSlice.actions;

export default propertyModalSlice;
