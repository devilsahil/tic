
var ui = {};


ui.intialControlsVisible = true;


ui.robotFlickeringHandle = 0;


ui.currentView = "";


ui.startRobotFlickering = function() {
    ui.robotFlickeringHandle = setInterval(function() {
        $("#robot").toggleClass('robot');
    }, 500);
};


ui.stopRobotFlickering = function() {
    clearInterval(ui.robotFlickeringHandle);
};


ui.switchViewTo = function(turn) {

   
    function _switch(_turn) {
        ui.currentView = "#" + _turn;
        $(ui.currentView).fadeIn("fast");

        if(_turn === "ai")
            ui.startRobotFlickering();
    }

    if(ui.intialControlsVisible) {
        
        ui.intialControlsVisible = false;

        $('.intial').fadeOut({
            duration : "slow",
            done : function() {
                _switch(turn);
            }
        });
    }
    else {
        
        $(ui.currentView).fadeOut({
            duration: "fast",
            done: function() {
                _switch(turn);
            }
        });
    }
};


ui.insertAt = function(indx, symbol) {
    var board = $('.cell');
    var targetCell = $(board[indx]);

    if(!targetCell.hasClass('occupied')) {
        targetCell.html(symbol);
        targetCell.css({
            color : symbol == "X" ? "green" : "red"
        });
        targetCell.addClass('occupied');
    }
}
