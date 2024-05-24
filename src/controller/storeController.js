import asyncHandler from "express-async-handler";
import { Store } from "../model/index.js";

export const addStore = asyncHandler(async (_, res) => {
  const product = {
    storeName: "check Search",
    is_active: "yes",
  };

  try {
    const data = await Store.create(product);
    return res.status(200).json({
      data,
      status: 200,
      message: "store Added",
    });
  } catch (error) {
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("addStore", "Store"),
    });
  }
});

export const getStore = asyncHandler(async (_, res) => {
  try {
    const data = await Store.find();
    return res.status(200).json({
      data,
      status: 200,
      message: "store Added",
    });
  } catch (error) {
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("getStore", "Store"),
    });
  }
});

export const getSingleStore = asyncHandler(async (req, res) => {
  try {
    const data = await Store.findById(req.params.id);
    if (!data) {
      return res.status(200).json({ status: 400, message: "No store found" });
    } else {
      return res.status(200).json({
        data,
        status: 200,
        message: "store Added",
      });
    }
  } catch (error) {
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("getSingleStore", "Store"),
    });
  }
});
