


var State = function(old) {

    
   
     
    this.turn = "";

   

    this.oMovesCount = 0;



    this.result = "still running";



    this.board = [];


    if(typeof old !== "undefined") {

        var len = old.board.length;
        this.board = new Array(len);
        for(var itr = 0 ; itr < len ; itr++) {
            this.board[itr] = old.board[itr];
        }

        this.oMovesCount = old.oMovesCount;
        this.result = old.result;
        this.turn = old.turn;
      
    }


    this.advanceTurn = function() {
        this.turn = this.turn === "X" ? "O" : "X";

    }



    this.emptyCells = function() {
        var indxs = [];
        for(var itr = 0; itr < 9 ; itr++) {
            if(this.board[itr] === "E") {
                indxs.push(itr);
            }
        }
        return indxs;
    }



    this.isTerminal = function() {
        var B = this.board;

        //check rows
        for(var i = 0; i <= 6; i = i + 3) {
            if(B[i] !== "E" && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
                this.result = B[i] + "-won"; //update the state result
                return true;
            }
        }

        //check columns
        for(var i = 0; i <= 2 ; i++) {
            if(B[i] !== "E" && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
                this.result = B[i] + "-won"; //update the state result
                return true;
            }
        }

        //check diagonals
        for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
            if(B[i] !== "E" && B[i] == B[i + j] && B[i + j] === B[i + 2*j]) {
                this.result = B[i] + "-won"; //update the state result
                return true;
            }
        }
//for a drawn game
        var available = this.emptyCells();
        if(available.length == 0) {
            //the game is draw
            this.result = "draw"; //update the state result
            return true;
        }
        else {
            return false;
        }
    };

};


var Game = function(autoPlayer) {


    this.ai = autoPlayer;


    this.currentState = new State();


    this.currentState.board = ["E", "E", "E",
                               "E", "E", "E",
                               "E", "E", "E"];

    this.currentState.turn = "X"; //X plays first


    this.status = "beginning";

    this.advanceTo = function(_state) {
        this.currentState = _state;
        if(_state.isTerminal()) {
            this.status = "ended";

            if(_state.result === "X-won")
                //X won
                ui.switchViewTo("won");
            else if(_state.result === "O-won")
                //X lost
                ui.switchViewTo("lost");
            else
                //it's a draw
                ui.switchViewTo("draw");
        }
        else {
            //the game is still running

            if(this.currentState.turn === "X") {
                ui.switchViewTo("human");
            }
            else {
                ui.switchViewTo("robot");

                //notify the AI player its turn has come up
                this.ai.notify("O");
            }
        }
    };

    /*
      starts the game
     */
    this.start = function() {
        if(this.status = "beginning") {
            //invoke advanceTo with the initial state
            this.advanceTo(this.currentState);
            this.status = "running";
        }
    }

};


Game.score = function(_state) {
    if(_state.result === "X-won"){
        // the x player won
        return 10 - _state.oMovesCount;
    }
    else if(_state.result === "O-won") {
        //the x player lost
        return - 10 + _state.oMovesCount;
    }
    else {
        //it's a draw
        return 0;
    }
}
