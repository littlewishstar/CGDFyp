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
		stone = new Vector2[4];
		var index:int=0;
		for(var i:int=0;i<boardSizeX;i++)
			for(var j:int=0;j<boardSizeY;j++)
				if(i==0 || i==boardSizeX-1)
					if(j==0 || j==boardSizeY-1){
						stone[index]=new Vector2(i,j);
						index++;
					}
					
				index=0;
		haveSpondPoint=true;
		spondPoint=new Vector2[6];
		for(i=5;i<8;i++){
			spondPoint[index]=new Vector2(1,i);
			index++;
			spondPoint[index]=new Vector2(6,i);
			index++;
		}
		index++;
		enemy = new person[1];
		enemy[0]=new PoringKing();
		enemy[0].setIsPlayer(false);
		enemy[0].setLocation(3,9);
	}
}