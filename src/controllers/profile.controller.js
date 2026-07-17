import { getMyProfile } from "../services/profile.service.js";

export async function me(req, res, next) {
  try {
    res.json(await getMyProfile(req.cookId));
  } catch (e) {
    next(e);
  }
}
