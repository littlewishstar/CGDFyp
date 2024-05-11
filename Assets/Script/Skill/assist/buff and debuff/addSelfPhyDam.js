#pragma strict


public class addSelfPhyDam extends assist{ // upgrade self physical attack
	public function addSelfPhyDam(a:person){
		setUser(a);
		needChoose = false;
		at.phyAtBonus=1.2;
		at.phyAtBuff=true;
		at.phyAtTime++;
		//print("add phy");
		
		skill_name = "addSelfPhyDam";
		small_SkillType[0] = true;
	}
	public function functions(){
	
	}	
function Start () {

}

function Update () {

}

}

