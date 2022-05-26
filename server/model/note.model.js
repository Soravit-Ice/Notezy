module.exports = (sequelize , DataTypes) =>{

    const Notezy = sequelize.define("Notezy" , {

        noteId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type : DataTypes.STRING,
            allowNull: false,
        },
        information: {
            type : DataTypes.STRING,
            allowNull: false,

        },
        userId:{
            type : DataTypes.INTEGER,
            allowNull: false,
        },

        folderId:{
            type : DataTypes.INTEGER,
            allowNull: false,
        }
    });

    return Notezy;
}