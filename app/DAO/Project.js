define(['DAO/Base'],
(BaseDAO) => {
    class projectDAO extends BaseDAO{
        constructor(){
            super();
            this.tableName = 'projects';
        }
    }

    return projectDAO;
});