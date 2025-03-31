import { AmbienceOptions } from "./ambience-options";
import { DrinkOptions } from "./drink-options";
import { FoodOptions } from "./food-options";
import Link from "next/link";

export function GalleryOptions() {
  return (
    <div className="relative w-full min-h-screen">
      <Link href={"/gallery/food-gallery"}>
        <FoodOptions />
      </Link>
      <DrinkOptions />
      <Link href={"/gallery/ambience-gallery"}>
        <AmbienceOptions />
      </Link>
    </div>
  );
}
