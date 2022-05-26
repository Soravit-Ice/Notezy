
module.exports = (sequelize , DataTypes) =>{
    const Users = sequelize.define("UserAuth" , {

        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstname: {
            type : DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type : DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type : DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type : DataTypes.STRING,
            allowNull: false,

        },
        phone:{
            type : DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        token: {
            type : DataTypes.STRING,
            allowNull: false,
            defaultValue: "token"
        },
        comfirm:{
            type : DataTypes.BOOLEAN,
            dafaultValue: false
        }
    } ,{
        initialAutoIncrement: 3000,
      });

    return Users;
}