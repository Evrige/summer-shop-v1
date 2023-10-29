import * as userActions from './user/user.actions'
import {filterSlice} from "@/app/store/filter/filter.slice";
export const rootActions = {
	...userActions,
	...filterSlice.actions
}