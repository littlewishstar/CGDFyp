#pragma strict


public class selfTeleport extends assist{ // teleport means move the a place suddenly
	public function selfTeleport(a:person){
		setUser(a);
		skillRange = 4;
		placeChoose = true;
		needChoose = false;
		isPlaceChange = true;
		de =at;
		
		small_SkillType[3] = true;
		small_SkillType[7] = true;
	}
	public function functions(){
		
	}	
function Start () {

}

function Update () {

}

}

