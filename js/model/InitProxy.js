
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
		this.database = model.Positivo.getPositivo();
		this.createTableNotes();	

	},

    createTableNotes: function() {            
        var createSQL = 'CREATE TABLE IF NOT EXISTS Notes (' +  
                            'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                            'note LONGTEXT,' +
                            'chapter INTEGER,' +
                            'timestamp TIMESTAMP' + ')';             
        if(!this.database){
            return undefined;                
        } else {                
            this.database.transaction(function (t) {
                t.executeSql( createSQL, [], function(t, r) {}, function(t, e) {
                    alert('fail create table Notes: ' + e.message);
                });
            });
        }        
    }

},
{
    NAME: 'InitProxy'

}
);