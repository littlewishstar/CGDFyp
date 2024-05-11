#pragma strict


public class addPhyDam extends assist{ // buff somebody  physical attack
	public function addPhyDam(a:person){
		setUser(a);
		allowMyself=true;
		phyAtTime=1;
		phyAtBonus=1.2;
		skillRange = 3;
		
		skill_name = "addPhyDam";
		small_SkillType[0] = true;
	}
	public function functions(){
		at.ourAnimationPlay(5);	// animation play
	
		de.phyAtBonus=phyAtBonus;
		de.phyAtBuff=true;
		de.phyAtTime+=phyAtTime;
		//print("add phy");
		var addD:GameObject=GameObject.Instantiate(Resources.Load("Prefabs/Group 1/add"), de.model.transform.position, de.model.transform.rotation);
		addD.transform.SetParent(de.model.transform);
	}	
function Start () {

}

function Update () {

}

}

