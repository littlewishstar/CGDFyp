#pragma strict


public class selfTeleport extends assist{ // teleport means move the a place suddenly
	public function selfTeleport(a:person){
		setUser(a);
		skillRange = 3;
		placeChoose = true;
		needChoose = false;
		isPlaceChange = true;
		de =at;
		
		skill_name = "selfTelport";
		small_SkillType[3] = true;
		small_SkillType[7] = true;
	}
	public function functions(){
		de.ourAnimationPlay(4);	// animation play
		
		var pr : GameObject = de.getModel();
		var cloud:GameObject = GameObject.Instantiate(Resources.Load("Prefabs/Group 1/Buildtree"), pr.transform.position, pr.transform.rotation);
		GameObject.Destroy( cloud, 2);
	}	
function Start () {

}

function Update () {

}

}

