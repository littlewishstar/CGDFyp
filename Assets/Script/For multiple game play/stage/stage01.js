#pragma strict

class stage01 extends stageSample{
	function Start () {

	}

	function Update () {

	}
	public function stage01(){
		// set board size
		boardSizeX = 8;
		boardSizeY = 13;
		
		// set environment
		haveFire = true;
		fire = new Vector2[1];
		fire[0].x = 2;
		fire[0].y = 5;
		haveIce = true;
		ice = new Vector2[1];
		ice[0].x = 6;
		ice[0].y = 6;
		haveStone = true;
		stone = new Vector2[4];
		stone[0].x = 1;
		stone[0].y = 1;
		stone[1].x = 1;
		stone[1].y = 11;
		stone[2].x = 6;
		stone[2].y = 11;
		stone[3].x = 6;
		stone[3].y = 1;
		
		// set enemy
		enemy = new person[4];
	//	enemy[0] = new enemyWarrior();
		enemy[0] = new Poring();
		enemy[0].setIsPlayer(false);
		enemy[0].setLocation(2,10);
		/*enemy[0] = new person();
		enemy[0].insertDetail(10,"war 2", 5,65,2300,3,650,390,0,90,0,2);
		enemy[0].setModel(Resources.Load("Prefabs/Characters/CD2") as GameObject);*/
		
		enemy[1] = new enemyAssissan();
		//enemy[1].insertDetail(11,"assissan 2",5,75,1000,4,1000,150,50,300,1,2);
		enemy[1].setLocation(4,10);
		//enemy[1].setModel(Resources.Load("Prefabs/Characters/CA2") as GameObject);
		
		enemy[2] = new enemyMagician();
		//enemy[2].insertDetail(12,"magic 2",5,45,1400,2,100,200,1000,460,2,2);
		enemy[2].setLocation(3,11);
		//enemy[2].setModel(Resources.Load("Prefabs/Characters/CC2") as GameObject);
		
		enemy[3] = new enemyHealer();
		//enemy[3] = new person();
		//enemy[3].insertDetail(13,"healer 2",5,45,1800,2,100,250,800,350,3,2);
		enemy[3].setLocation(2,11);
		//enemy[3].setModel(Resources.Load("Prefabs/Characters/CB2") as GameObject);
		
		for(var i:int =0;i<enemy.length;i++){
			enemy[i].setTeam(2);
		}
	}
}