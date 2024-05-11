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
		var index:int=0;
		
		haveSpawnPoint=true;
		spawnPoint=new Vector2[6];
		for(i=5;i<8;i++){
			spawnPoint[index]=new Vector2(1,i);
			index++;
			spawnPoint[index]=new Vector2(6,i);
			index++;
		}
		haveLight=true;
		light= new Vector2[4];
		light[0]=Vector2(0,0);
		light[1]=Vector2(boardSizeX-1,0);
		light[2]=Vector2(boardSizeX-1,boardSizeY-1);
		light[3]=Vector2(0,boardSizeY-1);
		enemy = new person[1];
		enemy[0]=new PoringKing();
		enemy[0].setIsPlayer(false);
		enemy[0].boss=true;
		//enemy[0].setLocation(3,10);
		enemy[0].setLocation(3,10);
		
		for(i=0;i<enemy.length;i++){
			enemy[i].setTeam(2);
		}
	}
}