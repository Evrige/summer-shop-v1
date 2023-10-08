import {useTypedSelector} from "@/app/hooks/useTypedSelector";

export const useProducts = () => useTypedSelector((state) => state.Product);