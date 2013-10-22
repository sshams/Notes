
puremvc.define(
{
    name: 'model.NoteProxy',
    parent: puremvc.Proxy,
    
    constructor: function(){
        puremvc.Proxy.call(this, this.constructor.NAME, null);
    }
},
{
    database: null,

    onRegister: function() {
        this.database = model.Positivo.getPositivo();
    },

    selectByChapter: function(chapter, success, fail) {    
        var insertSQL = "SELECT * FROM Notes WHERE chapter = ?";           
        this.database.readTransaction(function (t) {
                t.executeSql(insertSQL, [chapter],success, fail);
        });
    },

    selectByID: function(id, success, fail) {    
        var insertSQL = "SELECT * FROM Notes WHERE id = ?";           
        this.database.readTransaction(function (t) {
                t.executeSql(insertSQL, [id], success, fail);
        });
    },    

    insert: function(noteVO, success, fail) {    
		var insertSQL = "INSERT INTO Notes (note, chapter, timestamp) VALUES (?,?,?)";
		var values = [noteVO.note, noteVO.chapter, new Date().getTime()];    
        this.database.transaction(function(t) {
			t.executeSql(insertSQL, values, success, fail);
		});
    },

    clear: function(success, fail) {    
        var insertSQL = "DELETE FROM Notes";           
        this.database.transaction(function (t) {
                t.executeSql(insertSQL, [],success, fail);
        });
    }, 

    update: function(noteVO, success, fail) {    
        var insertSQL = "UPDATE Notes SET note = ?, chapter = ? WHERE id = ?";

        var values = [noteVO.note, noteVO.chapter, noteVO.id];    
        this.database.transaction(function(t) {
            t.executeSql(insertSQL, values, success, fail);
        });
    },

    delete: function(id, success, fail) {    
        var insertSQL = "DELETE FROM Notes WHERE id = ?";           
        this.database.transaction(function (t) {
                t.executeSql(insertSQL, [id], success, fail);
        });
    }  
},
{
    NAME: 'NoteProxy'    
}
);