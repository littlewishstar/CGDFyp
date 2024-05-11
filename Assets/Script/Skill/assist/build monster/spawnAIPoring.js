#pragma strict

public class spawnAIPoring extends assist{ 
	public function spawnAIPoring(a:person){
		setUser(a);
		skillRange = 4;
		placeChoose = true;
		needChoose = false;
		spawnCharacter = 8;
		spawnPlayerControl = false;
		
		skill_name = "spawnAIPoring";
		small_SkillType[3] = true;
	}
	public function functions(){
		
	}	
	function Start () {

	}

	function Update () {

	}

}

