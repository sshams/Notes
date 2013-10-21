/**
* @author Saad Shams :: saad@muizz.com
* */

puremvc.define(
{
    name: "view.components.Notes",
    parent: view.components.TagComponent,

    /**
    * @constructor
    * @extends {view.components.TagObject}
    * @param (Object) elementID
    */
    template:null,
    constructor: function(elementID) {
        view.components.TagComponent.call(this, document.getElementById(elementID));
        this.template = document.getElementById("notesTemplate").innerHTML;
		this.addEventHandler(document.getElementById("filter"), events.InputEvent.CHANGE, Delegate.create(this, this.filterHandler));
		this.addEventHandler(document.getElementById("clear"), events.MouseEvent.CLICK, Delegate.create(this, this.clearHandler));
    }
},
{
    /* Instance Methods and variables */
    renderData: function(data){ 
        var view = {"notes":[], "chapter" : this.chapter ,"note": this.note};
        for(var i = 0; i<data.rows.length; i++) { 
            view.notes.push({"id" : data.rows.item(i).id, "chapter" : data.rows.item(i).chapter, "note" : data.rows.item(i).note});            
        }
        this.element.innerHTML  = Mustache.render(this.template, view);
    },
	
	filterHandler: function(){
		var chapter = {num :document.getElementById("filter").value};	
		this.dispatchEvent(new view.components.Event(this.constructor.FILTER, event.target, chapter));
    },
	
	clearHandler: function(){
        this.dispatchEvent(new view.components.Event(this.constructor.CLEAR, event.target));
    }
}, 
{   
    /* Static methods and variables */
    UPDATE: "update" ,
    DELETE: "delete",
    REFRESH: "refresh",
	FILTER: "filterone",
    CLEAR: "clear"
    //Custom type event name for dispatching events to it's Mediator (FieldsMediator)
    
}
);