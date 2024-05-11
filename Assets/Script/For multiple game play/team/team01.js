#pragma strict

class team01 extends teamSample{
	function Start () {

	}

	function Update () {

	}
	public function team01(){ 
	
		//teammate = new person[4];
		teammate[0] = new myWarrior();
		//teammate[0] = new person();
		//teammate[0].insertDetail(0,"war 1",5,60,2300,3,650,390,0,90,0,1);
		
		//teammate[0].setLocation(4,2);
		//teammate[0].setModel(Resources.Load("Prefabs/Characters/CD1") as GameObject);
		
		teammate[1] = new myAssissan();
		//teammate[1].insertDetail(1,"assissan 1",5,80,1000,4,1000,150,50,300,1,1);		
		//teammate[1].setModel(Resources.Load("Prefabs/Characters/CA1") as GameObject);
		//teammate[1].setLocation(3,2);
		
		teammate[2] = new myMagician();
		//teammate[2].insertDetail(2,"magic 1",5,40,1400,2,100,200,1000,460,2,1);
		//teammate[2].setLocation(4,1);
		//teammate[2].setModel(Resources.Load("Prefabs/Characters/CC1") as GameObject);
		
		teammate[3] = new myHealer();
		//teammate[3] = new person();
		//teammate[3].insertDetail(3,"healer 1",5,50,1800,2,100,250,800,350,3,1);
		//teammate[3].setLocation(3,1);
		//teammate[3].setModel(Resources.Load("Prefabs/Characters/CB1") as GameObject);
		
		setUpLocation();
		setUpTeam();
		
	}
	public function pickUpTeam(){
		
		var chList : characterList = new characterList();
		print(teammate.Length);
		for(var i:int=0;i<4;i++){
			print(teamStore[i]);
			teammate[i]=new person();
			teammate[i] = chList.getCharacter(teamStore[i]);
		}
	}
	public function setUpLocation(){
		teammate[0].setLocation(4,2);
		teammate[1].setLocation(3,2);
		teammate[2].setLocation(4,1);
		teammate[3].setLocation(3,1);
	}
	public function setUpTeam(){
		for(var i:int =0;i<teammate.length;i++){
			teammate[i].setTeam(1);
		}
	}
}