import { DriverApi, DriverStats, PartnerDocs, PartnerListItem, PaymentApi, VerifyDocsPayload } from "@/Types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";




interface OrdersState {

  Logoutmessage: string | null;
  Logoutloading: boolean;
  LogoutSuccess: boolean;
  LogoutError: string | null;

  message: string | null;


  Loginloading: boolean;
  LoginSuccess: boolean;
  loginError: string | null;


  partners: PartnerListItem[];
  partnersLoading: boolean;
  partnersError: string | null;

  partnerDocs: PartnerDocs | null;
  partnerDocsLoading: boolean;
  partnerDocsError: string | null;

  verifyLoading: boolean;
  verifyError: string | null;


  driverStats: DriverStats | null;
  statsLoading: boolean;
  statsError: string | null;


  drivers: DriverApi[];
  driversLoading: boolean;
  driversError: string | null;


  //  driversActive: DriverApi[];
  isActiveLoading: boolean;
  toggleLoading: string | null;


  payments: PaymentApi[];
  loading: boolean;
  paymenterror: string | null;

  error: string | null;
}


const initialState: OrdersState = {

  Logoutmessage: null,
  message: null,
  Logoutloading: false,
  LogoutSuccess: false,
  LogoutError: null,


  Loginloading: false,
  LoginSuccess: false,
  loginError: null,

  partners: [],
  partnersLoading: false,
  partnersError: null,

  partnerDocs: null,
  partnerDocsLoading: false,
  partnerDocsError: null,

  driverStats: null,
  statsLoading: false,
  statsError: null,

  drivers: [],
  driversLoading: false,
  driversError: null,

  // driversActive: [],
  isActiveLoading: false,
  toggleLoading: null,

  verifyLoading: false,
  verifyError: null,

  payments: [],
  loading: false,
  paymenterror: null,

  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {

    loginRequest(state, action: PayloadAction<{ email: string }>) {
      state.Loginloading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess(state, action: PayloadAction<string>) {
      state.Loginloading = false;
      state.message = action.payload;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.Loginloading = false;
      state.error = action.payload;
    },



    logoutRequest(state) {
      state.Logoutloading = true;
      state.error = null;
    },
    logoutSuccess(state, action) {
      state.Logoutloading = false;
      state.message = action.payload;
    },
    logoutFailure(state, action) {
      state.Logoutloading = false;
      state.error = action.payload;
    },



    getPartnersRequest(state) {
      state.partnersLoading = true;
      state.partnersError = null;
    },
    getPartnersSuccess(state, action: PayloadAction<PartnerListItem[]>) {
      state.partnersLoading = false;
      state.partners = action.payload;
    },
    getPartnersFailure(state, action: PayloadAction<string>) {
      state.partnersLoading = false;
      state.partnersError = action.payload;
    },



    getPartnerDocsRequest(state, action: PayloadAction<string>) {
      state.partnerDocsLoading = true;
      state.partnerDocsError = null;
    },
    getPartnerDocsSuccess(state, action: PayloadAction<PartnerDocs>) {
      state.partnerDocsLoading = false;
      state.partnerDocs = action.payload;
    },
    getPartnerDocsFailure(state, action: PayloadAction<string>) {
      state.partnerDocsLoading = false;
      state.partnerDocsError = action.payload;
    },


    verifyPartnerDocsRequest(
      state,
      action: PayloadAction<{ partnerId: string; payload: VerifyDocsPayload }>
    ) {
      state.verifyLoading = true;
      state.verifyError = null;
    },
    verifyPartnerDocsSuccess(state) {
      state.verifyLoading = false;
    },
    verifyPartnerDocsFailure(state, action: PayloadAction<string>) {
      state.verifyLoading = false;
      state.verifyError = action.payload;
    },


    fetchDriverStatsRequest(state) {
      state.statsLoading = true;
    },
    fetchDriverStatsSuccess(state, action: PayloadAction<DriverStats>) {
      state.statsLoading = false;
      state.driverStats = action.payload;
    },
    fetchDriverStatsFailure(state, action: PayloadAction<string>) {
      state.statsLoading = false;
      state.statsError = action.payload;
    },


    fetchDriversRequest(state) {
      state.driversLoading = true;
    },
    fetchDriversSuccess(state, action: PayloadAction<DriverApi[]>) {
      state.driversLoading = false;
      state.drivers = action.payload;
    },
    fetchDriversFailure(state, action: PayloadAction<string>) {
      state.driversLoading = false;
      state.driversError = action.payload;
    },




    toggleDriverStatusRequest(
      state,
      action: PayloadAction<{ partnerId: string; isActive: boolean }>
    ) {
      state.toggleLoading = action.payload.partnerId;
    },
    toggleDriverStatusSuccess(
      state,
      action: PayloadAction<{ partnerId: string; isActive: boolean }>
    ) {
      const driver = state.drivers.find(
        (d) => d.id === action.payload.partnerId
      );

      if (driver) {
        driver.isActive = action.payload.isActive;
      }

      state.toggleLoading = null;
    },
    toggleDriverStatusFailure(state) {
      state.toggleLoading = null;
    },



    fetchPaymentsRequest(state) {
      state.loading = true;
    },
    fetchPaymentsSuccess(state, action: PayloadAction<PaymentApi[]>) {
      state.loading = false;
      state.payments = action.payload;
    },
    fetchPaymentsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.paymenterror = action.payload;
    },


  },

});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,

  logoutRequest,
  logoutSuccess,
  logoutFailure,

  getPartnersRequest,
  getPartnersSuccess,
  getPartnersFailure,

  getPartnerDocsRequest,
  getPartnerDocsSuccess,
  getPartnerDocsFailure,

  verifyPartnerDocsRequest,
  verifyPartnerDocsSuccess,
  verifyPartnerDocsFailure,

  fetchDriverStatsRequest,
  fetchDriverStatsSuccess,
  fetchDriverStatsFailure,

  fetchDriversRequest,
  fetchDriversSuccess,
  fetchDriversFailure,

  toggleDriverStatusRequest,
  toggleDriverStatusSuccess,
  toggleDriverStatusFailure,

  fetchPaymentsRequest,
  fetchPaymentsSuccess,
  fetchPaymentsFailure,
} = postSlice.actions;

export default postSlice.reducer;