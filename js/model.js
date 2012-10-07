
var N_SQUARES_X = 7;
var N_SQUARES_Y = 6;
var EMPTY_SQUARE=0;
var PLAYER_A=1;
var PLAYER_B=2;

//--------------------------------------------
// CLASS BOARD
//--------------------------------------------

var Board =function(){
    this.nSquaresX=N_SQUARES_X;
    this.nSquaresY=N_SQUARES_Y;
    this.array=new Array();
    
    // INIT
    for(var i=0;i<this.nSquaresX;i++){
    	this.array[i]=new Array();
		for(var j=0;j<this.nSquaresY;j++){
	    	this.array[i][j]=EMPTY_SQUARE;
		}  
    }
}

Board.prototype ={
    nSquaresX: N_SQUARES_X,
    nSquaresY: N_SQUARES_Y,
    array:new Array(),
 
    
    addChip: function(column,player){
    	if(column < 0 || column >= this.nSquaresX){
	    	throw "Invalid column number";
    	}
    	if(player <= 0){
	    	throw "Invalid player";
    	}
    	
    	var squarePosition = this.nSquaresY - 1;
    	for(var j=0;j<this.nSquaresY && squarePosition == (this.nSquaresY - 1);j++){
	    	if( this.array[column][j] != EMPTY_SQUARE ){
		    	squarePosition = j-1;
	    	}
    	}
    	
    	if(squarePosition < 0){
    		//column is full
	    	return squarePosition;
    	}
    	
    	this.array[column][squarePosition] = player;
    	return squarePosition;
    }
    ,
    connect4:function(){
	   for(var i=0;i<this.nSquaresX;i++){
    		for(var j=0;j<this.nSquaresY;j++){
    			if(this.array[i][j] != EMPTY_SQUARE){
	    			var array = null;
	    			array = this.connect4rec(0,i,j,1,0,this.array[i][j]);//UP
	    			if( array != null){ return array; } 
	    			array = this.connect4rec(0,i,j,1,1,this.array[i][j]);//UP RIGHT
	    			if( array != null){ return array; } 
	    			array = this.connect4rec(0,i,j,0,1,this.array[i][j]);//RIGHT
	    			if( array != null){ return array; } 
	    			array = this.connect4rec(0,i,j,-1,1,this.array[i][j]);//DOWN RIGHT
	    			if( array != null){ return array; } 
	    			array = this.connect4rec(0,i,j,-1,0,this.array[i][j]);//DOWN
	    			if( array != null){ return array; } 
	    			array = this.connect4rec(0,i,j,-1,-1,this.array[i][j]);//DOWN LEFT
	    			if( array != null){ return array; } 
	    			array = this.connect4rec(0,i,j,0,-1,this.array[i][j]);//LEFT
	    			if( array != null){ return array; } 
	    			array = this.connect4rec(0,i,j,1,-1,this.array[i][j]);//UP LEFT
	    			if( array != null){ return array; } 
	    			
    			}
	    	}  
		}	
		return null;    
    }
    ,
    connect4rec:function(depth,x,y,directionX,directionY,player){
    	
    	if( x < 0 || y < 0 || x >= this.nSquaresX || y >= this.nSquaresY ){
	    	return null;
    	}
    	
    	if( this.array[x][y] == player ){	
    		if(depth == 3){
    			// CONNECT4!
    			return [[x,y]];
	    	} else {
	    		var ret = this.connect4rec(depth+1,x+directionX,y+directionY,directionX,directionY,player);
	    		if(ret != null){
	    			ret.push([x,y])
		    		return ret;
	    		}
	    	}
	    	
    	}
    	return null;
    		    
    }
}



//--------------------------------------------
// CLASS GAME
//--------------------------------------------

var Game =function(){
	this.connect4=null;
	this.board=new Board();
	this.turn=PLAYER_A;
}
Game.prototype ={
	connect4:null,
	board:new Board(),
	turn:PLAYER_A,
	/**
		if cant move will return -1;
	*/
	move: function(column){
		// Is game over?
		if( this.connect4 == null ){
			var row=this.board.addChip(column,this.turn);
			if(row >= 0 ){
				this.connect4=this.board.connect4();
					
				if(this.connect4 == null){
					//if no one has win yet	
					if( this.turn == PLAYER_A){
						this.turn = PLAYER_B;
					} else{
						this.turn = PLAYER_A;
					}
				}
			
			}
			return row;
		}
		return -1;
	}
}
