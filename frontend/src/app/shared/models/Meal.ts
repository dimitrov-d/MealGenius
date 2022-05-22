export class Meal {
    _id: string;
    imageURL: string;
    ingredients: Ingredient[];
    name: string;
    steps: string[];
    timers: number[];
    type: string
}

export class Ingredient {
    name: string;
    quantity: string;
    type: string;
    checked: boolean;
}