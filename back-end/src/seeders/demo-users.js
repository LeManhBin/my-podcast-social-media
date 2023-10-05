"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const demoUsers = [];

    // Tạo 50 người dùng mẫu
    for (let i = 1; i <= 50; i++) {
      demoUsers.push({
        name: `User ${i}`,
        email: `user${i}@example.com`,
        password: "password123", // Hãy chú ý rằng cần mã hóa mật khẩu trong ứng dụng thực tế
        nickName: `Nickname${i}`,
        avatar: `avatar${i}.jpg`,
        summary: `Summary for User ${i}`,
        birthDay: new Date(`2000-01-01T00:00:00.000Z`),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Thêm dữ liệu mẫu vào bảng Users
    await queryInterface.bulkInsert("Users", demoUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa tất cả dữ liệu mẫu trong bảng Users
    await queryInterface.bulkDelete("Users", null, {});
  },
};
