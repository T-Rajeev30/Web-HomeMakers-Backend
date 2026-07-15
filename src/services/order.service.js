import { Order } from "../models/Order.js";
import { Dish } from "../models/Dish.js";
import { Cook } from "../models/Cook.js";

const CANCELABLE = ["pending"];
const TRANSITIONS = {
  pending: ["preparing", "rejected"],
  preparing: ["ready"],
  ready: ["completed"],
};

export async function createOrder(customer, data) {
  const cook = await Cook.findOne({ _id: data.cookId, status: "approved" });
  if (!cook) throw Object.assign(new Error("Cook not found"), { status: 404 });

  const dishIds = data.items.map((i) => i.dishId);
  const dishes = await Dish.find({
    _id: { $in: dishIds },
    cookId: data.cookId,
    available: true,
  });
  const dishMap = new Map(dishes.map((d) => [d._id.toString(), d]));

  const items = data.items.map((i) => {
    const dish = dishMap.get(i.dishId);
    if (!dish)
      throw Object.assign(new Error(`Dish ${i.dishId} not available`), {
        status: 400,
      });
    return { dishId: dish._id, name: dish.name, price: dish.price, qty: i.qty };
  });

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return Order.create({
    cookId: data.cookId,
    customerId: customer.id,
    customerPhone: customer.phone,
    customerName: data.customerName || null,
    items,
    total,
    deliveryAddress: data.deliveryAddress,
    notes: data.notes,
  });
}

export async function listCustomerOrders(customerId, { page, limit }) {
  const filter = { customerId };
  const [items, total] = await Promise.all([
    Order.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Order.countDocuments(filter),
  ]);
  return { items, total, page, limit };
}

export async function listCookOrders(cookId, { status, page, limit }) {
  const filter = { cookId, ...(status ? { status } : {}) };
  const [items, total] = await Promise.all([
    Order.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Order.countDocuments(filter),
  ]);
  return { items, total, page, limit };
}

export async function updateOrderStatus(cookId, orderId, status) {
  const order = await Order.findOne({ _id: orderId, cookId });
  if (!order)
    throw Object.assign(new Error("Order not found"), { status: 404 });

  const allowed = TRANSITIONS[order.status] || [];
  if (!allowed.includes(status)) {
    throw Object.assign(
      new Error(`Cannot move order from ${order.status} to ${status}`),
      { status: 409 },
    );
  }

  order.status = status;
  await order.save();
  return order;
}
