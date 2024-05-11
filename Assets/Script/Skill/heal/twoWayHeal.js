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
		at.ourAnimationPlay(5);	// animation play
		var twoHeal:GameObject=GameObject.Instantiate(Resources.Load("Prefabs/Group 1/twoheal"), de.model.transform.position, de.model.transform.rotation);
		twoHeal.transform.SetParent(de.model.transform);
		GameObject.Destroy(twoHeal, 5);
	}
	public function functions(){
	}
	
function Start () {

}

function Update () {

}

}

