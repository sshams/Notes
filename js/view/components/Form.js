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
		this.formUI = document.getElementById("form");
		this.chapterUI = document.getElementById("chapter");
		this.noteUI = document.getElementById("note");
		this.insertButtonUI = document.getElementById("insert");
		this.updateButtonUI = document.getElementById("update");				
        this.addEventHandler(this.insertButtonUI, events.MouseEvent.CLICK, Delegate.create(this, this.insertHandler));   
        this.addEventHandler(this.updateButtonUI, events.MouseEvent.CLICK, Delegate.create(this, this.updateHandler)); 
        
    }
},
{
    idnote: null,
    /* Instance Methods and variables */	
    insertHandler: function(event) {
        if(this.noteUI.value == "" || this.chapterUI.value == ""){
            alert("Please enter the text of the note or select a Chapter"); 
        } else {
            noteVO = {note: this.noteUI.value, chapter: this.chapterUI.value};
            this.dispatchEvent(new view.components.Event(this.constructor.INSERT, event.target, noteVO)); 
        } 
		this.formUI.reset();       
        return;
	},
	
    updateHandler: function(event) {      
        if(this.noteUI.value == "" || this.chapterUI.value == ""){
            alert("Please enter the text of the note or select a Chapter"); 
        } else {
            var noteVO  = {id : this.idnote, note : this.noteUI.value, chapter : this.chapterUI.value};            
            this.dispatchEvent(new view.components.Event(this.constructor.UPDATE, event.target, noteVO));
        }
        this.formUI.reset();
        CSS.removeClass(this.insertButtonUI, "hidden");
        CSS.addClass(this.updateButtonUI, "hidden");
		return;
    },
	
	editNoteHandler: function(note){      
        CSS.addClass(this.insertButtonUI, "hidden");
		CSS.removeClass(this.updateButtonUI, "hidden");
        this.idnote = note.id;
        this.chapterUI.options[note.chapter].selected = 'selected';   
        this.noteUI.value = note.note; 
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
