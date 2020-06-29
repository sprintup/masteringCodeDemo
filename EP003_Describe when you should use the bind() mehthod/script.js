
/*
Example 1: Below the 'this' keyword on line 8 gets reassigned from 'Ray' on line 6 to 'Bob' on line 14. 
*/
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
Example 2: Unbound example 
*/
//var name = 'frank';
var someName = myModule.getName; // Defining it like so means 'this' keyword is bound to entire window, because you're referencing the function within the module, but not the module itself. By uncommenting the global variable with the value 'frank' above, you can see it's bound to the window. 
someName(); // _window_ or 'frank'

// Guard against this by defining what the keyword 'this' is. 
var someName = myModule.getName.bind(myModule); // binding the getName method to myModule itself. This assures when you're passing 'this' to someName, it's getting the correct context. Above, a new object with name: 'Bob' is an example of passing a new context. 
someName(); // Ray

/*
Example 3: Dangers of unbound methods
*/

// https://github.com/planetoftheweb/vueinterface/blob/master/process/App.vue line 73-82
var example3 = {
    computed: {
        searchedApts: function() {
        return this.theAppointments.filter(function(item) { // the value of 'this' on this line is the value of searchedApts
            return (
            (item.petName.toLowerCase().match(this.searchTerms.toLowerCase())) || // the value of 'this' on this line might not have right context, because of seperate return statement
            (item.petOwner.toLowerCase().match(this.searchTerms.toLowerCase())) ||
            (item.aptNotes.toLowerCase().match(this.searchTerms.toLowerCase()))
            )
        }.bind(this)); // which is why we bind the value of 'this' here, passing 'this' which is the 'computed' method context. Without this context, the function would be unbound and could accidentally be referenced directly, invoking the wrong context like Example 2. If the method was invoked with the wrong context, then the nested return statements might not have the correct search terms. 
        } //searchedApts
    }
};

/*
Example 4: passing arguments to bind
*/
// 'this' is easier to understand by adding 'execution context' after to summarize what it's referring to. You can use .bind() to predefine the value of the keyword 'this,' therefor passing it whatever we want to pre-define, perhaps how a method works. Otherwise, the value of 'this' changes depending on the context. 
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind

const originalContext = {
    x: 42,
    getX: function(){
        return this.x;
    }
};

const unboundGetX = originalContext.getX;
console.log(unboundGetX()); //The function gets invoked at the global scope
//expected output: undefined

//const boundGetX = unboundGetX.bind(originalContext); // this is how to bind to the originalContext
//console.log(boundGetX());
//expected output: 42

var count = 0; 
var log = function(message){
    console.log('log: ',count," | ",message);
    count++;
}; 

log('before');
var newContext = {x:35};
const boundGetX = unboundGetX.bind(newContext, log('inside'), log(originalContext.x));
console.log(boundGetX());
log('after');
/*
log:  0  |  before
log:  1  |  inside      // arguments are functions executed
log:  2  |  42
35                      // prior to the newContext being bound to 'this'
log:  3  |  after
*/

// This shows how different contexts can be passed to different functions, thus detatching some properties (42) and attaching new ones (35). In fact, 'this' can be reassigned more than once. 

var contexty = {x: 52};
const newFunction = unboundGetX.bind(contexty); //bind creates a new function with this keyword set to provided value (contexty)
console.log(newFunction()); // 52

// AND the value can be anged
contexty.x = 64;
console.log(newFunction()); // 64

// In fact, the original context can be duplicated more than once as well. 
var finalUnboundContext = originalContext.getX;
var finalBoundContext = finalUnboundContext.bind(contexty);
log(finalBoundContext()); // log: 4 | 52

/* 
Example 5: So we make the logger into a service
*/
var service = {
  count : 100,
  serviceName: "count",
  log : function(){console.log(this.serviceName," service:", this.count); this.count++}
}
service.log(); // count service: 100
service.log(); // count service: 101

// Reassign service function context to window
var windowService = service;
windowService.log(); // count service: 5

windowService.serviceName = "window level";
windowService.log(); // window level service: 103

// when the function is bound to the window it's count value is overwritten but the serviceName is not, because it doesn't exist as a global variable
var windowBindFunction = windowService.log.bind();
windowBindFunction(); // undefined " service:" 5

console.log("------", log("how to set undefined to value of Ray from myModule.name"));

var raysService = windowService.log.bind(myModule);
console.log(windowService.serviceName); // window level 
console.log(myModule.name); // Ray
console.log(raysService.name); // bound log

console.log("------",log("trying to assign a value in the service to the value from the context"));

// myModule does not have a count or serviceName properties

var intermediateContext = myModule; // the new shape has to be initialized prior to being passed as argument in order for it to be registered
var raysService1 = windowService.log.bind(intermediateContext, (
    ()=>{
        intermediateContext.serviceName = myModule.name; // value of 'Ray' from new context
        intermediateContext.count = count; // window level count, not object level (windowService = 100+)
    })());
raysService1(); // Ray service: 8
/*
Example 6: Nested objects
*/
const nestedObject = {
    zap : function(){console.log('zap!')},
    count : 1000
}
var wrapperContext = {
    windowLevel : window, // count in 10s
    objectLevel : windowService, // count in 100s
    nestedObjectLevel : nestedObject // count in 1000s
}
var newWrapperLevelFunction = windowService.log.bind(wrapperContext.nestedObjectLevel); //switch from windowLevel, objectLevel, nestedObjectLevel to see the differences in count
newWrapperLevelFunction(); // undefined " service:" 1000
