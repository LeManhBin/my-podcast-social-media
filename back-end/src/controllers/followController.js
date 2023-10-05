import { pool } from "../config/connectDatabase";
import db from "../models";

export const fetchGetFollower = async (req, res) => {
  try {
    const { userId } = req.params;
    const [row] = await pool.query(
      `SELECT follows.id as id, users.id as userId, users.name, users.email, users.nickName FROM follows INNER JOIN users ON follows.userId = users.id WHERE follows.follower = ?`,
      [userId]
    );
    const formattedResult = row.map((r) => ({
      id: r.id,
      user: {
        id: r.userId,
        name: r.name,
        email: r.email,
        nickName: r.nickName,
      },
    }));
    res.status(200).json({
      data: formattedResult,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const fetchGetFollowing = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).json({
        status: 400,
        message: "Bad request",
      });
    }
    const [row] = await pool.query(
      `SELECT follows.id as id, users.id as userId, users.name, users.email, users.nickName FROM follows INNER JOIN users ON follows.userId = users.id WHERE follows.following = ?`,
      [userId]
    );
    const formattedResult = row.map((r) => ({
      id: r.id,
      user: {
        id: r.userId,
        name: r.name,
        email: r.email,
        nickName: r.nickName,
      },
    }));
    res.status(200).json({
      data: formattedResult,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const fetchToggleFollow = async (req, res) => {
  try {
    const { userId, followerId } = req.body;
    if (!userId || !followerId) {
      return res.status(200).json({
        status: 400,
        message: "bad request",
      });
    }
    const isFollow = await db.Follow.findOne({
      where: { userId: userId, follower: followerId },
    });
    if (isFollow) {
      await db.Follow.destroy({
        where: { userId: userId, follower: followerId },
      });
      return res.status(200).json({
        status: 200,
        message: "Un follow success",
      });
    } else {
      await db.Follow.create({
        userId: userId,
        follower: followerId,
      });
      await db.Follow.create({
        userId: followerId,
        following: userId,
      });
      return res.status(200).json({
        status: 200,
        message: "follow success",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
