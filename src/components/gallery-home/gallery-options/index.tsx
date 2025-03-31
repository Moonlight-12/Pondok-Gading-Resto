import { AmbienceOptions } from "./ambience-options";
import { DrinkOptions } from "./drink-options";
import { FoodOptions } from "./food-options";

export function GalleryOptions() {
    return (
        <div className="relative w-full min-h-screen">
            <FoodOptions />
            <DrinkOptions />
            <AmbienceOptions />
        </div>
    );
}