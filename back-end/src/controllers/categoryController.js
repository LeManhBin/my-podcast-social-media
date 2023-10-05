import db from "../models";

export const getAllCategory = async (req, res) => {
  try {
    const categories = await db.Category.findAll();
    res.status(200).json({
      status: 200,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await db.Category.create({
      name: name,
    });
    res.status(200).json({
      status: 200,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { idCategory } = req.params;
    const category = await db.Category.findByPK(idCategory);
    if (!category) {
      return res.status(404).json({
        status: 404,
        message: "Category not found",
      });
    }
    const deleteCategory = await db.Category.destroy({
      where: { id: idCategory },
    });
    res.status(200).json({
      status: 200,
      data: deleteCategory,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { idCategory } = req.params;
    const { name } = req.body;
    const category = await db.Category.findByPK(idCategory);
    if (!category) {
      return res.status(404).json({
        status: 404,
        message: "Category not found",
      });
    }
    const updateCategory = await db.Category.update(
      { name: name },
      { where: { id: idCategory } }
    );
    res.status(200).json({
      status: 200,
      data: updateCategory,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
