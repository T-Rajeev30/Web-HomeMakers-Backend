import {
  createDishSchema,
  updateDishSchema,
} from "../validators/menu.schema.js";
import * as svc from "../services/menu.service.js";

export async function list(req, res, next) {
  try {
    res.json(await svc.listDishes(req.cookId));
  } catch (e) {
    next(e);
  }
}

export async function create(req, res, next) {
  try {
    const data = createDishSchema.parse(req.body);
    res.status(201).json(await svc.createDish(req.cookId, data));
  } catch (e) {
    next(e);
  }
}

export async function update(req, res, next) {
  try {
    const data = updateDishSchema.parse(req.body);
    res.json(await svc.updateDish(req.cookId, req.params.id, data));
  } catch (e) {
    next(e);
  }
}

export async function remove(req, res, next) {
  try {
    res.json(await svc.deleteDish(req.cookId, req.params.id));
  } catch (e) {
    next(e);
  }
}
