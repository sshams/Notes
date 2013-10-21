/**
* @author Saad Shams :: saad@muizz.com
* Commands resides in the controller section of the system, and are used are for
* system wide operations, like system startup, retrieving a proxy, fetching data, 
* and passing on to View Tier (Mediators/Components) for display of data. 
* Commands are instantiated on the notification and execute function gets called.
* */

puremvc.define(
{
    name: "controller.StartupCommand",
    parent: puremvc.SimpleCommand
},
{
     /**
     * @param {Object} notification
     * Instance created and execute function called upon Startup Notification
	 * TagComponents are instaniated, view.components.Scroller and view.components.Menu
	 * Registers Mediators ScrollerMediator and MenuMediator for these TagComponents
	 * Any dispatch of custom events that requires change in the other part of the system,
	 * are handled by their respective mediators. That's the main core of the system.
     */
    
    execute: function(notification) {
        this.facade.registerProxy(new model.Positivo());
        this.facade.registerProxy(new model.InitProxy());
        this.facade.registerProxy(new model.NoteProxy());


        this.facade.registerMediator(new view.mediators.FormMediator(new view.components.Form("form")));
        this.facade.registerMediator(new view.mediators.NotesMediator(new view.components.Notes("notes")));
        
        var initProxy = this.facade.retrieveProxy(model.InitProxy.NAME);
        var noteProxy = this.facade.retrieveProxy(model.NoteProxy.NAME); 



       


    }
}
);
