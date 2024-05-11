#pragma strict


public class downPhyDam extends assist{ // upgrade self physical attack
	public function downPhyDam(a:person){
		setUser(a);
		
		skill_name = "downPhyDam";
		small_SkillType[5] = true;
	}
	public function functions(){
		if(de.phyAtBuff == true){
			if(de.phyAtBonus>1){
				de.phyAtTime--;
			}
			else{
				de.phyAtTime++;
			}
		}
		else{
			de.phyAtBonus=0.8;
			de.phyAtBuff=true;
			de.phyAtTime--;
		}
		//print("del phy");
	}	
function Start () {

}

function Update () {

}

}

