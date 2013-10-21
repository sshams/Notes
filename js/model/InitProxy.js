
puremvc.define(
{
    name: 'model.InitProxy',
    parent: puremvc.Proxy,
    
    constructor: function(){
        puremvc.Proxy.call(this, this.constructor.NAME, null);
    }
},
{
	onRegister: function() {
		this.prepareDatabase();
	},

    prepareDatabase: function() {
            var database = model.Positivo.getPositivo();
            var createSQL = 'CREATE TABLE IF NOT EXISTS Notes (' +  
                                'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                                'note LONGTEXT,' +
                                'chapter INTEGER,' +
                                'timestamp TIMESTAMP' + ')';             
            if(!database){
                return undefined;                
            } else {                
                database.transaction(function (t) {
                    t.executeSql( createSQL, [], function(t, r) {}, function(t, e) {
                        alert('create table: ' + e.message);
                    });
                });
                return database;
            }
        
    }
},
{
    NAME: 'InitProxy'

}
);