"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Lấy danh sách các người dùng và danh mục
    const users = await queryInterface.sequelize.query("SELECT id FROM Users;");
    const categories = await queryInterface.sequelize.query(
      "SELECT id FROM Categories WHERE id IN (1, 2);"
    );

    const demoPosts = [];

    // Tạo 20 bài viết mẫu cho người dùng
    for (let i = 0; i <= 50; i++) {
      const randomUserId =
        users[0][Math.floor(Math.random() * users[0].length)];

      demoPosts.push({
        userId: i,
        categoryId: 1,
        image: "1696314195366.png",
        description: `Description for Post ${i}`,
        sound: `1696313665029.mp3`,
        status: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Thêm dữ liệu mẫu vào bảng Posts
    await queryInterface.bulkInsert("Posts", demoPosts, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa tất cả dữ liệu mẫu trong bảng Posts
    await queryInterface.bulkDelete("Posts", null, {});
  },
};
