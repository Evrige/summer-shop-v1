import {ImProfile} from "react-icons/im";
import {FiLogOut} from "react-icons/fi";
import {MdLocalShipping} from "react-icons/md";
export const dropDownMenuHeader = [
	{
		icon: <ImProfile className="mr-1.5"/>,
		title: "Мій Профіль",
		link: "/user/profile"
	},
	{
		icon: <MdLocalShipping className="mr-1.5"/>,
		title: "Мой закази",
		link: "/user/orders"
	},
	{
		icon: <FiLogOut className="mr-1.5"/>,
		title: "Вийти",
		link: "/login",
		type: "br"
	},
]


