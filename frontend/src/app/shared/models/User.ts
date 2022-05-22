import { Allergen } from "./Allergen";
import { Diet } from "./Diet";

export class User {
    _id: string;
    allergens: Allergen[];
    diet: Diet;
    email: string;
    name: string;
    password: string;
}