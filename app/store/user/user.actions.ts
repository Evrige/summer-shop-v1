import {createAsyncThunk} from "@reduxjs/toolkit";
import {IAuthResponse, ILoginData, IRegistrationData, IResponse} from "@/app/store/user/user.interface";
import {AuthService} from "@/app/service/auth/auth.service";
import {removeFromStorage} from "@/app/service/auth/auth.helper";
import {errorCatch} from "@/app/api/api.helper";

export const registration = createAsyncThunk<IResponse, IRegistrationData>(
	'auth/registration',
	async (data, thunkApi) =>{
		try {
			return await AuthService.Registration(data)
		} catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)

export const login = createAsyncThunk<IAuthResponse, ILoginData>(
	'auth/login',
	async (data, thunkApi) =>{
		try {
			return await AuthService.Login(data)
		} catch (e) {
			return thunkApi.rejectWithValue(e)
		}
	}
)

export const logout = createAsyncThunk('auth/logout', async () => {removeFromStorage()})

export const checkAuth = createAsyncThunk(
	'auth/checkAuth',
	async (_, thunkApi) => {
		try {
			return await AuthService.getNewTokens()
		} catch (e) {
			if (errorCatch(e) === 'jwt expired'){
				thunkApi.dispatch(logout())
			}

			return thunkApi.rejectWithValue(e)
		}
	}
)