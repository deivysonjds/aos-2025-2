
const getTasksModel = (sequelize, { DataTypes }) => {
  const Message = sequelize.define("tarefa", {
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    concluida: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false
    }

  });

  Message.associate = (models) => {
    Message.belongsTo(models.User);
  };

  return Message;
};

export default getTasksModel;
