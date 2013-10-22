/**
* @author Saad Shams :: saad@muizz.com
* */

puremvc.define(
{
    name: 'view.mediators.FormMediator',
    parent: puremvc.Mediator,
    
    constructor: function(component) {
        puremvc.Mediator.call(this, this.constructor.NAME, component);
    }
},
{
    /* Instance Methods and variables */
    onRegister: function() { 
        this.viewComponent.addEventListener(view.components.Form.INSERT, Delegate.create(this, this.insertHandler));
        this.viewComponent.addEventListener(view.components.Form.UPDATE, Delegate.create(this, this.updateHandler));
        this.noteProxy = this.facade.retrieveProxy(model.NoteProxy.NAME);      
    },

//Handlers Functions
    insertHandler: function(event) {
        var noteProxy = this.facade.retrieveProxy(model.NoteProxy.NAME);        
        noteProxy.insert(event.body, Delegate.create(this, this.insertSuccess), Delegate.create(this, this.insertFail));       
    },

    updateHandler: function(event) {
        this.noteProxy.update(event.body, Delegate.create(this, this.insertSuccess), Delegate.create(this, this.updateFail));       
    },  
//Success callbacks
    insertSuccess: function() {
        console.log('insert or update success');
		this.viewComponent.resetFormHandler(); 
        this.facade.sendNotification(ApplicationFacade.REFRESH_DATA);
    }, 

    selectSuccess: function(t, r) {
        this.viewComponent.renderData(r);                
    }, 
//Fails callbacks
    insertFail: function() {
        alert('Something broke! to Insert');
    },

    updateFail: function() {
        alert('Something broke! to Update');
    },    
    /**
    * Notification List of it's Interests
    * @return {Array}
    */
    listNotificationInterests: function() {
        return [
            ApplicationFacade.EDIT_NOTE
        ];
    },
            
    handleNotification: function(notification) {
        switch(notification.getName()) {
            case ApplicationFacade.EDIT_NOTE:
                this.noteProxy.selectByID(notification.getBody(), Delegate.create(this, this.selectByIDSuccess), Delegate.create(this, this.selectByIDFail));
				break;
        }
    },

    selectByIDSuccess:function(t,r){
        this.viewComponent.editNoteHandler(r.rows.item(0));
    },
    
    selectByIDFail:function(t,e){
        alert('Something broke ' + e.message);
    }
},
{
    /* Static methods and variables */
    NAME: "FormMediator"
}
);