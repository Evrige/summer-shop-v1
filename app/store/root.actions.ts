import * as userActions from './user/user.actions'
import * as productsActions from './products/products.actions'
export const rootActions = {
	...userActions, ...productsActions
}