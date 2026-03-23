import { PartnerDocs, PartnerListItem } from "@/Types/types";
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
  getPartnerDocsFailure
} = postSlice.actions;

export default postSlice.reducer;