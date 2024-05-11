#pragma strict


public class addSelfPhyDam extends assist{ // upgrade self physical attack
	public function addSelfPhyDam(a:person){
		setUser(a);
		needChoose = false;
		phyAtTime = 1;
		phyAtBonus=1.2;
		
		at.phyAtBonus=phyAtBonus;
		at.phyAtBuff=true;
		at.phyAtTime+=phyAtTime;
		//print("add phy");
		
		skill_name = "addSelfPhyDam";
		small_SkillType[0] = true;
		

	}
	public function functions(){
		at.ourAnimationPlay(5);	// animation play
		
		var pr : GameObject = at.getModel();
		Debug.Log(Resources.Load("Prefabs/Group 1/add") + at.myName);
		var addD:GameObject=GameObject.Instantiate(Resources.Load("Prefabs/Group 1/add"), pr.transform.position, pr.transform.rotation);
		addD.transform.SetParent(pr.transform);
	}
function Start () {

}

function Update () {

}

}

