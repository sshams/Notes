/**
* @author Saad Shams :: saad@muizz.com
* */

puremvc.define(
{
    name: 'view.mediators.NotesMediator',
    parent: puremvc.Mediator,
    
    constructor: function(component) {
        puremvc.Mediator.call(this, this.constructor.NAME, component);

    }
},
{
    /* Instance Methods and variables */
    noteProxy: null,
	chapterActive: null,

    onRegister: function() {		
        this.noteProxy = this.facade.retrieveProxy(model.NoteProxy.NAME);
        this.viewComponent.addEventListener(view.components.Notes.DELETE, Delegate.create(this, this.deleteHandler));
		this.viewComponent.addEventListener(view.components.Notes.FILTER, Delegate.create(this, this.filterHandler));
		this.viewComponent.addEventListener(view.components.Notes.CLEAR, Delegate.create(this, this.clearHandler));  		
    },

    //Handlers Functions
    refreshHandler: function() {         
        this.noteProxy.selectAll(Delegate.create(this, this.selectSuccess), Delegate.create(this, this.selectFail));                  
    },	
	
    filterHandler: function(event) {
		if(event){
			this.chapterActive = event.body.num;
		}
		if(this.chapterActive!=null){
        	this.noteProxy.filter(this.chapterActive,Delegate.create(this, this.selectSuccess), Delegate.create(this, this.selectFail));                  
		}
    },
	
	clearHandler: function(event) {      
        this.noteProxy.clear(Delegate.create(this, this.clearSuccess), Delegate.create(this, this.clearFail));       
    },

    //Success callbacks 
    selectSuccess: function(t, r) {
        this.viewComponent.renderData(r);                
    },

    clearSuccess: function() {          
       this.facade.sendNotification(ApplicationFacade.REFRESH_DATA);                  
    },

    deleteSuccess: function() {
        this.filterHandler();                      
    },    

    //Fails callbacks
	clearFail: function(t, e) {
        alert('Something broke with Clear');
    },
 
    selectFail: function(t, e) {
        alert('countRows: ' + e.message);
    }, 

    deleteFail: function() {
        alert('Something Wrong!! to delete');
    }, 
    
    /**
    * Notification List of it's Interests
    * @return {Array}
    */
    listNotificationInterests: function() {
        return [
            ApplicationFacade.REFRESH_DATA,
            ApplicationFacade.DELETE_NOTE			        
        ];
    },
            
    handleNotification: function(notification) {
        switch(notification.getName()) {
            case ApplicationFacade.REFRESH_DATA:
        		this.noteProxy.filter(this.chapterActive,Delegate.create(this, this.selectSuccess), Delegate.create(this, this.selectFail));		
                break;
            case ApplicationFacade.DELETE_NOTE:
                this.noteProxy.delete(notification.getBody(), Delegate.create(this, this.deleteSuccess), Delegate.create(this, this.deleteFail));                  
                break;        
        }
    }
},
{
    /* Static methods and variables */
    NAME: "NotesMediator"
}
);