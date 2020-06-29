var myModule = {
    name: 'Ray',
    getName: function() {
        return console.log(this.name); // this here in normal context means myModule
    }
};

myModule.getName();

var someName = myModule.getName.bind({name:'Bob'}); //calling method in module
someName(); 
/*
    Ray
    Bob
*/