#pragma strict

public class PoringKing extends person{
	var controller:MultipleGameProcess;
	var spawnPoint:Vector2[];
	var spawn:Vector2;
	function Start () {

	}

	function Update () {

	}
	public function PoringKing(){	
		id = 0;
		myName = "PoringKing";
		star = 5;
		sp = 60;
		hp = 10000;
		fullHp = hp;
		step = 0;
		pa = 1000;
		pd=390;
		ma=0;
		md=90;
		job=5;
		
		AI = new PoringKingFSM();
		
		skill_List.Add(new basicAttack(this));
		skill_List.Add(new spawnAIPoring(this));
		
		setModel(Resources.Load("Prefabs/Characters/PoringKing") as GameObject);
		icon = (Resources.Load.<Sprite>("iconcircle/Characters/poringking_icon"));
	}
	
	function getHurt(hurt:int){
		super.getHurt(hurt);
		if(spawned==false){
			controller=GameObject.Find("Main Game Controller").GetComponent.<MultipleGameProcess>();
					spawnPoint = controller.stageValue.spawnPoint;
			do{
				var num:int=Random.Range(0,spawnPoint.Length);
				spawn=spawnPoint[num];
			}while(controller.bd.getBox(spawn.x,spawn.y).empty==true);
			var newPerson : person = new Poring()/*characterList.getCharacter(skill_List[0].spawnCharacter)*/;
			// insert the new character to the list
		//	Debug.Log(newPerson);
			//Debug.Log(newPerson.myName);
			Debug.Log("1 "+controller.ps.Count);
			
			newPerson.deathRound=100000000;
			controller.ps.Add(newPerson);

			
			Debug.Log("2 "+controller.ps.Count);
			// set up its location
			controller.setLocation(controller.ps[controller.ps.Count-1], spawn.x, spawn.y);
			// set up its team as same as its caller
			controller.ps[controller.ps.Count-1].setTeam(skill_List[1].at.getTeam());
			
			controller.ps[controller.ps.Count-1].setIsPlayer(false);
			// instance model, set ID, set up location again
			controller.characterStartSetting(controller.ps.Count-1);
			// set up born round for calculating the playlist
			controller.ps[controller.ps.Count-1].setBornRound(controller.round+1);
			// set is it having AI or controlled by player
			//controller.ps[controller.ps.Count-1].setIsPlayer(skill_List[0].spawnPlayerControl);
			if(skill_List[1].spawnPlayerControl == false){
				controller.ps[controller.ps.Count-1].getAI().insertStatus(controller.ps[controller.ps.Count-1]);
			}
			controller.skillOf_createNewCharacter = true;
			spawned=true;
		}
	}
}