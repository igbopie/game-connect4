
var game=new Game();
var muttex=false;
var colIndex=0;

// SHOW TEST RESULTS
if(window.location.hash == "#test") {
  $("#test").slideDown();
} 

// CREATE BOARD
var boardUI = document.createElement('table');
for(var i=0;i<game.board.nSquaresY;i++){
	var rowUI = document.createElement('tr');
	for(var j=0;j<game.board.nSquaresX;j++){
		var squareUI = document.createElement('td');
		var holeUI = document.createElement('div');
		holeUI.className="hole";
		squareUI.appendChild(holeUI);
		rowUI.appendChild(squareUI);
	}  
	boardUI.appendChild(rowUI);
}

$("#board-table").html(boardUI);

// DETECT MOUSE TO MOVE CHIP
$("#board .wrapper").mousemove(function(e) {
	var leftpost=(e.pageX - $(this).offset().left) + $(window).scrollLeft();
	leftpost-=$(".chip").width()/2;
	var columnWidth=$("#board .wrapper").width()/game.board.nSquaresX;
	colIndex=Math.floor(leftpost/columnWidth);
	if(colIndex<0){
		colIndex=0;	
	}
	
	$(".chip.active").css("left",(colIndex*columnWidth)+(columnWidth/2)-($(".chip").width()/2));
});

// WHEN USER CLICKS
$("#board .wrapper").click(function(){
	if(!muttex){
		//Sometimes, when you click fast beetween animation it can create concurrency problems
		muttex=true;
		var destination=game.move(colIndex);
		
		// if move was possible
		if(destination >=0 ){
		
			var chip=$(".chip.active");
			var columnWidth=$("#board .wrapper").width()/game.board.nSquaresX;
		
			chip.css("left",(colIndex*columnWidth)+(columnWidth/2)-($(".chip").width()/2));
			chip.removeClass("active");
		
			chip.addClass("x"+colIndex);
			chip.addClass("y"+destination);
		
			var rowHeight=($("#board table").height())/game.board.nSquaresY;
			var finalHeight=rowHeight*destination+$("#board table").offset().top-$("#header").height();
			
			$(chip).animate(
				{top: '+='+finalHeight},
				{duration: 750,
				   easing: 'easeOutBounce',
				 complete: function() {
				 				if(game.connect4 == null){
							     	$("#board .wrapper").prepend('<div class="chip active player'+game.turn+'" style="display:none"></div>');
							     	$(".chip.active").css("left",chip.css("left"));
							     	$(".chip.active").slideDown(function(){muttex=false;});
						     	}else{
							     	for(var cell=0;cell<game.connect4.length;cell++){
								     	$(".chip.x"+game.connect4[cell][0]+".y"+game.connect4[cell][1]).addClass("win");
							     	}
							     	muttex=false;
						     	}
					     }
			});
			
		}else{
			muttex=false;
		}
		
	}
	
	
});

// Borrow from jquery ui plugin :)
$.extend($.easing,
{
    def: 'easeOutQuad',
    easeOutBounce: function (x, t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    }
});
