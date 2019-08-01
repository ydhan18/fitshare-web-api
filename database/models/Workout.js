const connection = require('../connection')
const { Sequelize } = connection

const Workout = connection.define(
    'workout',
    {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            notEmpty: true
        },
        slug: {
            type: Sequelize.STRING
        },
        forkedFrom: {
            type: Sequelize.STRING
        }
    },
    {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        }
    }
)

Workout.addHook('beforeCreate', (workout, options) => {
    workout.slug = workout.name.replace(/[\W_]+/g, '-').toLowerCase()
})

module.exports = Workout
