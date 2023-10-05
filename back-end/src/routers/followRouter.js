import express from "express";
import {
  fetchGetFollower,
  fetchGetFollowing,
  fetchToggleFollow,
} from "../controllers/followController";
const router = express.Router();

router.get("/follower/:userId", fetchGetFollower);
router.get("/following/:userId", fetchGetFollowing);
router.post("/toggle-follow", fetchToggleFollow);
export default router;
