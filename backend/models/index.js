const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config');
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Workspace = sequelize.define('Workspace', {
    name: DataTypes.STRING,
    amenities: DataTypes.TEXT,
    rules: DataTypes.TEXT,
    photo: DataTypes.STRING
});

const Booking = sequelize.define('Booking', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    workspaceId: {
        type: DataTypes.INTEGER,
        references: {
            model: Workspace,
            key: 'id'
        }
    },
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE
});

User.hasMany(Booking);
Workspace.hasMany(Booking);

sequelize.sync();

module.exports = { User, Workspace, Booking, sequelize };
