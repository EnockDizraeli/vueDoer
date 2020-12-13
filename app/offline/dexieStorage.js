define(['Dexie'],
(Dexie) =>  {
    let DATABASE_NAME = "vueDoer_1.0";

    const database = (() => {
        let dbName = DATABASE_NAME;
        let db = new Dexie(dbName, {});
        db.version(1).stores({
            projects: 'id, color, name, created',
            tasks: 'id, name, created, projectID, completed'
        });

        /**Create some default projects (In the future this data should come from a JSON file)**/
        db.on('populate', () => {
            db.projects.add({id: 'default0', name: 'Family', color: 'green', created: (new Date()).getTime() });
            db.projects.add({id: 'default1', name: 'In Basket', color: 'grey', created: (new Date()).getTime()});

            db.projects.add({id: 'default2', name: 'Build a wine cellar', color: 'red', created: (new Date()).getTime()});
            db.tasks.add({
                id : createID(10),
                created : (new Date()).getTime(),
                completed : false,
                projectID: 'default2',
                name: 'Check the room for leaks.'
            });
            db.tasks.add({
                id : createID(10),
                created : (new Date()).getTime(),
                completed : false,
                projectID: 'default2',
                name: 'Install vapour barrier.'
            });
            db.tasks.add({
                id : createID(10),
                created : (new Date()).getTime(),
                completed : false,
                projectID: 'default2',
                name: 'Seal the concrete floor'
            });
        });

        
        db.open();
        return db;
    })();

    function clear(){
        database.delete();
        Dexie.delete(DATABASE_NAME);
    };
    
    database.clear = clear;
    return database;
});