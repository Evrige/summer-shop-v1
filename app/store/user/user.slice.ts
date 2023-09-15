import {EnumSaveData, IInitialState} from "@/app/store/user/user.interface";
import {createSlice} from "@reduxjs/toolkit";
import {checkAuth, login, logout, registration} from "@/app/store/user/user.actions";
import {getStorageLocal} from "@/app/utils/local-storage";

const initialState: IInitialState = {
	user : getStorageLocal(EnumSaveData.user),
	isLoading: false,
	isLogin: false,
	message: ""
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(registration.pending, (state) => {
			state.isLoading = true
		})
		.addCase(registration.fulfilled, (state, action) => {
			// @ts-ignore
			state.message = (action.payload && action.payload.errors && action.payload.errors[0] && action.payload.errors[0].message) || "success"

			state.isLoading = false
		})
		.addCase(registration.rejected, (state) => {
			state.isLoading = false
			state.user = null
		})

			.addCase(login.pending, (state) => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user
				state.isLogin = true
				// @ts-ignore
				state.message = (action.payload && action.payload.errors && action.payload.errors[0] && action.payload.errors[0].message) || "success"
			})
			.addCase(login.rejected, (state) => {
				state.isLoading = false
				state.user = null
			})

			.addCase(logout.fulfilled, (state) => {
				state.isLoading = false
				state.user = null
				state.isLogin = false
			})

			.addCase(checkAuth.fulfilled, (state, action) => {
				state.user = action.payload.user
				state.isLogin = true
			})
	}
})

export const selectUser = (state:any ) => state