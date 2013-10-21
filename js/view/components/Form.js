/**
* @author Saad Shams :: saad@muizz.com
* */

puremvc.define(
{
    name: "view.components.Form",
    parent: view.components.TagComponent,

    /**
    * @constructor
    * @extends {view.components.TagObject}
    * @param (Object) elementID
    */
   
    constructor: function(elementID) {        
        view.components.TagComponent.call(this, document.getElementById(elementID));
		this.form = document.getElementById("form");
		this.chapter = document.getElementById("chapter");
		this.note = document.getElementById("note");
		this.insert = document.getElementById("insert");
		this.update = document.getElementById("update");
        this.note_id = document.getElementById("note_id");				
        this.addEventHandler(this.insert, events.MouseEvent.CLICK, Delegate.create(this, this.insertHandler));   
        this.addEventHandler(this.update, events.MouseEvent.CLICK, Delegate.create(this, this.updateHandler)); 
        
    }
},
{  
    /* Instance Methods and variables */	
    insertHandler: function(event) {
        if(this.note.value == "" || this.chapter.value == ""){
            alert("Please enter the text of the note or select a Chapter"); 
        } else {
            noteVO = {note: this.note.value, chapter: this.chapter.value};
            this.dispatchEvent(new view.components.Event(this.constructor.INSERT, event.target, noteVO)); 
        } 
		this.form.reset();       
        return;
	},
	
    updateHandler: function(event) {      
        if(this.note.value == "" || this.chapter.value == ""){
            alert("Please enter the text of the note or select a Chapter"); 
        } else {
            var noteVO  = {id : this.note_id.value, note : this.note.value, chapter : this.chapter.value};            
            this.dispatchEvent(new view.components.Event(this.constructor.UPDATE, event.target, noteVO));
        }
        this.form.reset();
        CSS.removeClass(this.insert, "hidden");
        CSS.addClass(this.update, "hidden");
		return;
    },
	
	editNoteHandler: function(note){
        CSS.addClass(this.insert, "hidden");
		CSS.removeClass(this.update, "hidden");
        this.note_id.value = note.id;
        this.chapter.options[note.chapter].selected = 'selected';   
        this.note.value = note.note; 
        return;
    }
}, 
{   
    /* Static methods and variables */
    INSERT: "insert",
    UPDATE: "update"
    //Custom type event name for dispatching events to it's Mediator (FieldsMediator)    
}
);
