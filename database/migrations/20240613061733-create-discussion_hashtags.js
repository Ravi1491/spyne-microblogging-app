/* eslint-disable prettier/prettier */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('discussion_hashtags', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      discussion_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'discussions',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      hashtag_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'hashtags',
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
    await queryInterface.dropTable('discussion_hashtags');
  },
};

