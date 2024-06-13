/* eslint-disable prettier/prettier */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('discussion_likes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      type: {
        type: Sequelize.ENUM('LIKE', 'DISLIKE'),
        allowNull: false,
      },
      entity_type: {
        type: Sequelize.ENUM('DISCUSSION', 'COMMENT'),
        allowNull: false,
      },
      discussion_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'discussions',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      comment_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'comments',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('discussion_likes');
  },
};

