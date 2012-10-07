

test( "Test board", function() {
	var b=new Board();
	deepEqual( b.array,[[0,0,0,0,0,0],
					[0,0,0,0,0,0],
					[0,0,0,0,0,0],
					[0,0,0,0,0,0],
					[0,0,0,0,0,0],
					[0,0,0,0,0,0],
					[0,0,0,0,0,0]], "Board array is initialized" );
	
	throws(function(){b.addChip(-1,1)},"Invalid column validation");	
	throws(function(){b.addChip(N_SQUARES_X,1)},"Invalid column validation");
	throws(function(){b.addChip(1,-1)},"Invalid player validation");
	
	//-----------------------------------------
	// Add chip test
	//-----------------------------------------
	ok(b.addChip(0,PLAYER_A) == N_SQUARES_Y-1);
	deepEqual( b.array,[[0,0,0,0,0,PLAYER_A],
					[0,0,0,0,0,0],
					[0,0,0,0,0,0],
					[0,0,0,0,0,0],
					[0,0,0,0,0,0],
					[0,0,0,0,0,0],
					[0,0,0,0,0,0]], "AddChip error" );
					
	
	ok(b.addChip(0,PLAYER_B) == N_SQUARES_Y-2);
	deepEqual( b.array,[[0,0,0,0,PLAYER_B,PLAYER_A],
					[0,0,0,0,0,0],
					[0,0,0,0,0,0],
					[0,0,0,0,0,0],
					[0,0,0,0,0,0],
					[0,0,0,0,0,0],
					[0,0,0,0,0,0]], "AddChip error" );
					
	ok(b.addChip(0,PLAYER_A) == N_SQUARES_Y-3);
	ok(b.addChip(0,PLAYER_B) == N_SQUARES_Y-4);
	ok(b.addChip(0,PLAYER_A) == N_SQUARES_Y-5);
	ok(b.addChip(0,PLAYER_B) == N_SQUARES_Y-6);
	deepEqual( b.array,[[PLAYER_B,PLAYER_A,PLAYER_B,PLAYER_A,PLAYER_B,PLAYER_A],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0]], "AddChip error" );
					
	//Last row	
	ok(b.addChip(N_SQUARES_X-1,PLAYER_A) == N_SQUARES_Y-1);
	ok(b.addChip(N_SQUARES_X-1,PLAYER_B) == N_SQUARES_Y-2);
	ok(b.addChip(N_SQUARES_X-1,PLAYER_A) == N_SQUARES_Y-3);
	ok(b.addChip(N_SQUARES_X-1,PLAYER_B) == N_SQUARES_Y-4);
	ok(b.addChip(N_SQUARES_X-1,PLAYER_A) == N_SQUARES_Y-5);
	ok(b.addChip(N_SQUARES_X-1,PLAYER_B) == N_SQUARES_Y-6);
	deepEqual( b.array,[[PLAYER_B,PLAYER_A,PLAYER_B,PLAYER_A,PLAYER_B,PLAYER_A],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[PLAYER_B,PLAYER_A,PLAYER_B,PLAYER_A,PLAYER_B,PLAYER_A]], "AddChip error" );


	//throws(},"Valid add chip");	
	ok(b.addChip(N_SQUARES_X-1,PLAYER_B) < 0 ,"Column is full");
	deepEqual( b.array,[[PLAYER_B,PLAYER_A,PLAYER_B,PLAYER_A,PLAYER_B,PLAYER_A],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[PLAYER_B,PLAYER_A,PLAYER_B,PLAYER_A,PLAYER_B,PLAYER_A]], "AddChip error" );
						
						
	//-----------------------------------------
	//	Connect 4 
	//-----------------------------------------	
	ok(b.addChip(N_SQUARES_X-2,PLAYER_A) == N_SQUARES_Y-1);
	ok(b.addChip(N_SQUARES_X-3,PLAYER_A) == N_SQUARES_Y-1);
	ok(b.addChip(N_SQUARES_X-4,PLAYER_A) == N_SQUARES_Y-1);
	deepEqual( b.array,[[PLAYER_B,PLAYER_A,PLAYER_B,PLAYER_A,PLAYER_B,PLAYER_A],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[0,0,0,0,0,PLAYER_A],
						[0,0,0,0,0,PLAYER_A],
						[0,0,0,0,0,PLAYER_A],
						[PLAYER_B,PLAYER_A,PLAYER_B,PLAYER_A,PLAYER_B,PLAYER_A]], "AddChip error" );
	
	ok(b.connect4() != null,"Connect 4!");
	deepEqual( b.connect4(),[[6,5],[5,5],[4,5],[3,5]],"Connect 4!");
	
	b=new Board();			
	
	ok(b.addChip(0,PLAYER_A) == N_SQUARES_Y-1);
	ok(b.addChip(0,PLAYER_A) == N_SQUARES_Y-2);
	ok(b.addChip(0,PLAYER_A) == N_SQUARES_Y-3);
	ok(b.addChip(0,PLAYER_A) == N_SQUARES_Y-4);
	deepEqual( b.array,[[0,0,PLAYER_A,PLAYER_A,PLAYER_A,PLAYER_A],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0]], "AddChip error" );
	
	ok(b.connect4() != null,"Connect 4!");
	deepEqual( b.connect4(),[[0,5],[0,4],[0,3],[0,2]],"Connect 4!");
	
	
	b=new Board();			
	
	b.addChip(0,PLAYER_A);
	
	b.addChip(1,PLAYER_B);
	b.addChip(1,PLAYER_A);
	
	b.addChip(2,PLAYER_A);
	b.addChip(2,PLAYER_B);
	b.addChip(2,PLAYER_A);
	
	b.addChip(3,PLAYER_B);	
	b.addChip(3,PLAYER_A);
	b.addChip(3,PLAYER_B);
	b.addChip(3,PLAYER_A);
	
	deepEqual( b.array,[[0,0,0,0,0,PLAYER_A],
						[0,0,0,0,PLAYER_A,PLAYER_B],
						[0,0,0,PLAYER_A,PLAYER_B,PLAYER_A],
						[0,0,PLAYER_A,PLAYER_B,PLAYER_A,PLAYER_B],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0]], "AddChip error" );
	
	ok(b.connect4() != null,"Connect 4!");
	deepEqual( b.connect4(),[[3,2],[2,3],[1,4],[0,5]],"Connect 4!");
	
	
	b=new Board();			
	
	b.addChip(3,PLAYER_A);
	
	b.addChip(2,PLAYER_B);
	b.addChip(2,PLAYER_A);
	
	b.addChip(1,PLAYER_A);
	b.addChip(1,PLAYER_B);
	b.addChip(1,PLAYER_A);
	
	b.addChip(0,PLAYER_B);	
	b.addChip(0,PLAYER_A);
	b.addChip(0,PLAYER_B);
	b.addChip(0,PLAYER_A);
	
	deepEqual( b.array,[[0,0,PLAYER_A,PLAYER_B,PLAYER_A,PLAYER_B],
						[0,0,0,PLAYER_A,PLAYER_B,PLAYER_A],
						[0,0,0,0,PLAYER_A,PLAYER_B],
						[0,0,0,0,0,PLAYER_A],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0],
						[0,0,0,0,0,0]], "AddChip error" );
	
	ok(b.connect4() != null,"Connect 4!");
	deepEqual( b.connect4(),[[3,5],[2,4],[1,3],[0,2]],"Connect 4!");
	
});


test( "Test game", function() {
	var g=new Game();
	g.move(0); //A
	deepEqual( g.connect4,null);
	g.move(1); //B
	deepEqual( g.connect4,null);
	g.move(1); //A
	deepEqual( g.connect4,null);
	g.move(6); //B
	deepEqual( g.connect4,null);
	g.move(2); //A
	deepEqual( g.connect4,null);
	g.move(2); //B
	deepEqual( g.connect4,null);
	g.move(2); //A
	deepEqual( g.connect4,null);
	g.move(3); //B
	deepEqual( g.connect4,null);
	g.move(3); //A
	deepEqual( g.connect4,null);
	g.move(3); //B
	deepEqual( g.connect4,null);
	g.move(3); //A
	ok(g.connect4 != null,"Connect 4!");
	deepEqual( g.connect4,[[3,2],[2,3],[1,4],[0,5]],"Connect 4!");
	deepEqual( g.turn,PLAYER_A,"Connect 4!");
});

///
