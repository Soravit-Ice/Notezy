
module.exports = (sequelize , DataTypes) =>{
    
    

    const Folder = sequelize.define("Folder" , {

        folderId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nameFolder: {
            type : DataTypes.STRING,
            allowNull: false,
        },
        countNote: {
            type : DataTypes.INTEGER,
            defaultValue: 0,

        },
        userId:{
            type : DataTypes.INTEGER,
            allowNull: false,
        }

    });



    return Folder;
}