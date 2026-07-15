import {
  createOrderSchema,
  updateOrderStatusSchema,
  listOrdersSchema,
} from "../validators/order.schema.js";
import * as svc from "../services/order.service.js";

export async function create(req, res, next) {
  try {
    const data = createOrderSchema.parse(req.body);
    const order = await svc.createOrder(req.user, data);
    res.status(201).json(order);
  } catch (e) {
    next(e);
  }
}

export async function mine(req, res, next) {
  try {
    const q = listOrdersSchema.parse(req.query);
    res.json(await svc.listCustomerOrders(req.user.id, q));
  } catch (e) {
    next(e);
  }
}

export async function cookList(req, res, next) {
  try {
    const q = listOrdersSchema.parse(req.query);
    res.json(await svc.listCookOrders(req.cookId, q));
  } catch (e) {
    next(e);
  }
}

export async function cookUpdateStatus(req, res, next) {
  try {
    const { status } = updateOrderStatusSchema.parse(req.body);
    res.json(await svc.updateOrderStatus(req.cookId, req.params.id, status));
  } catch (e) {
    next(e);
  }
}
