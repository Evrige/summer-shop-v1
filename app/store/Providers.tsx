"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import {QueryClientProvider} from "@tanstack/react-query";
import {QueryClient} from "@tanstack/query-core";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
const queryClient = new QueryClient({
	defaultOptions:{
		queries:{
			refetchOnWindowFocus: false
		}
	}
})

export function Providers({ children }: { children: React.ReactNode }) {
	return <Provider store={store}><QueryClientProvider client={queryClient}>{children}  <ReactQueryDevtools initialIsOpen={false} /></QueryClientProvider></Provider>;
}