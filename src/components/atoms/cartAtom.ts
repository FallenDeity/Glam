import { atom } from "recoil";

import { Product } from "@/lib/hooks/getProducts";

export interface CartProduct extends Product {
	quantity: number;
}

export const cartAtom = atom<CartProduct[]>({
	key: "cartAtom",
	default: [],
});
