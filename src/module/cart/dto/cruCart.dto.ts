import { CartProduct } from "src/database/models/cart.model";

export class CreateUpdateCartDto {
    readonly user_id: number;

    readonly product: CartProduct;
}