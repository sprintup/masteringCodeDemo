var myModule = {
    name: 'Ray',
    getName: function() {
        return console.log(this.name);
    }
};

myModule.getName();

var someName = myModule.getName.bind
someName();