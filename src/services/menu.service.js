import { Dish } from "../models/Dish.js";

export async function listDishes(cookId) {
  return Dish.find({ cookId }).sort({ createdAt: -1 }).lean();
}

export async function createDish(cookId, data) {
  return Dish.create({ cookId, ...data });
}

export async function updateDish(cookId, dishId, data) {
  const dish = await Dish.findOneAndUpdate(
    { _id: dishId, cookId },
    { $set: data },
    { new: true },
  );
  if (!dish) throw Object.assign(new Error("Dish not found"), { status: 404 });
  return dish;
}

export async function deleteDish(cookId, dishId) {
  const dish = await Dish.findOneAndDelete({ _id: dishId, cookId });
  if (!dish) throw Object.assign(new Error("Dish not found"), { status: 404 });
  return { deleted: true };
}
