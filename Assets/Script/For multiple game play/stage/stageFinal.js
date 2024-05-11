class stageFinal extends stageSample{
	function Start () {

	}

	function Update () {

	}
	public function stageFinal(){
		// set board size
		boardSizeX = 8;
		boardSizeY = 13;
		
		// set environment
		haveStone = true;
		stone = new Vector2[38];
		for(var k:int=0;k<38;k++)
			stone[k]=new Vector2(0,1);
		
		enemy = new person[1];
		enemy[0]=new PoringKing();
		enemy[0].setIsPlayer(false);
		enemy[0].setLocation(3,9);
	}
}