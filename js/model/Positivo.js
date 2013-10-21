puremvc.define(
{
    name: 'model.Positivo',
    parent: puremvc.Proxy
},
{
    
},
{
    NAME: 'Positivo',

    getPositivo: function(){
        try {
            if(window.openDatabase) {
               return window.openDatabase('Positivo', '1.0', 'A Test Database', 10 * 1024 * 1024);
            } else if(openDatabase) {
                return openDatabase('Positivo', '1.0', 'A Test Database', 10 * 1024 * 1024);
            } else {
                return undefined;
            } 
        } catch(e) {
            return undefined;
        }
    }

}
);
