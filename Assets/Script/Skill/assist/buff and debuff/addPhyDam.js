#pragma strict


public class addPhyDam extends assist{ // buff somebody  physical attack
	public function addPhyDam(a:person){
		setUser(a);
		allowMyself=true;
		
		small_SkillType[0] = true;
	}
	public function functions(){
		de.phyAtBonus=1.2;
		de.phyAtBuff=true;
		de.phyAtTime++;
		//print("add phy");
	}	
function Start () {

}

function Update () {

}

}

