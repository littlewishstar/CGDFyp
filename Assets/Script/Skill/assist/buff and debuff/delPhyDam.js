#pragma strict


public class delPhyDam extends assist{ // let somebody no physical buff
	public function delPhyDam(a:person){
		setUser(a);
		
		small_SkillType[5] = true;
	}
	public function functions(){
		de.phyAtBonus=1;
		de.phyAtBuff=false;
		de.phyAtTime=0;
		//print("del phy");
	}	
function Start () {

}

function Update () {

}

}

