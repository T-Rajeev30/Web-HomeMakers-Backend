import { listSchema, decisionSchema } from "../validators/admin.schema.js";
import * as svc from "../services/admin.service.js";

export async function listCooks(req, res, next) {
  try {
    const q = listSchema.parse(req.query);
    res.json(await svc.listCooks(q));
  } catch (e) {
    next(e);
  }
}

export async function cookDetail(req, res, next) {
  try {
    res.json(await svc.getCookDetail(req.params.id));
  } catch (e) {
    next(e);
  }
}

export async function decide(req, res, next) {
  try {
    const body = decisionSchema.parse(req.body);
    res.json(await svc.decideCook(req.params.id, req.user.id, body));
  } catch (e) {
    next(e);
  }
}
