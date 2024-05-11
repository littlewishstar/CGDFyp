#pragma strict


public class twoWayHeal extends heal{ // choose two people in zone to heal
	public function twoWayHeal(a:person){
		setUser(a);
		skillRange = 5;
		targetNumber=2;
		
		skill_name = "twoWayHeal";
		small_SkillType[4] = true;
	}
	public function action(){
		cure = Heal();
	}
	
function Start () {

}

function Update () {

}

}

