
var AIAction = function(pos) {

    this.movePosition = pos;

 
    this.minimaxVal = 0;


    this.applyTo = function(state) {
        var next = new State(state);


        next.board[this.movePosition] = state.turn;

        if(state.turn === "O")
            next.oMovesCount++;

        next.advanceTurn();

        return next;
    }
};


AIAction.ASCENDING = function(firstAction, secondAction) {
    if(firstAction.minimaxVal < secondAction.minimaxVal)
        return -1; 
    else if(firstAction.minimaxVal > secondAction.minimaxVal)
        return 1; 
    else
        return 0; 
}


AIAction.DESCENDING = function(firstAction, secondAction) {
    if(firstAction.minimaxVal > secondAction.minimaxVal)
        return -1; 
    else if(firstAction.minimaxVal < secondAction.minimaxVal)
        return 1; 
    else
        return 0; 
}



var AI = function(level) {

  
    var levelOfIntelligence = level;

   
    var game = {};

   
    function minimaxValue(state) {
        if(state.isTerminal()) {
           
            return Game.score(state);
        }
        else {
            var stateScore; 

            if(state.turn === "X")
            
                stateScore = -1000;
            else
           
                stateScore = 1000;

            var availablePositions = state.emptyCells();

            
            var availableNextStates = availablePositions.map(function(pos) {
                var action = new AIAction(pos);

                var nextState = action.applyTo(state);

                return nextState;
            });

            
            availableNextStates.forEach(function(nextState) {
                var nextScore = minimaxValue(nextState);
                if(state.turn === "X") {
                    
                    if(nextScore > stateScore)
                        stateScore = nextScore;
                }
                else {
                    
                    if(nextScore < stateScore)
                        stateScore = nextScore;
                }
            });

            return stateScore;
        }
    }

   

    function takeAMasterMove(turn) {
        var available = game.currentState.emptyCells();

       
        var availableActions = available.map(function(pos) {
            var action =  new AIAction(pos); //create the action object
            var next = action.applyTo(game.currentState); //get next state by applying the action

            action.minimaxVal = minimaxValue(next); //calculate and set the action's minmax value

            return action;
        });

        
        if(turn === "X")
        
            availableActions.sort(AIAction.DESCENDING);
        else
       
            availableActions.sort(AIAction.ASCENDING);


       
        var chosenAction = availableActions[0];
        var next = chosenAction.applyTo(game.currentState);

        ui.insertAt(chosenAction.movePosition, turn);

        game.advanceTo(next);
    }


    
    this.plays = function(_game){
        game = _game;
    };

    
    this.notify = function(turn) {
        switch(levelOfIntelligence) {
           

            case "master": takeAMasterMove(turn); break;
        }
    };
};
