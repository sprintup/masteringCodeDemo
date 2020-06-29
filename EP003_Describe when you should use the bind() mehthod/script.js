//Below the 'this' keyword on line 6 gets reassigned from 'Ray' on line 4 to 'Bob' online 12. 

var myModule = {
    name: 'Ray',
    getName: function() {
        return console.log(this.name); // this here in normal context means myModule.name = 'Ray'
    }
};

myModule.getName(); // Ray

var someName = myModule.getName.bind({name:'Bob'}); //calling getName method in module, but binding 'this' keyword to a new object with a property 'name' that equals 'Bob'
someName(); // Bob
/*
    Ray
    Bob
*/