#pragma strict


public class downPhyDam extends assist{ // upgrade self physical attack
	public function downPhyDam(a:person){
		setUser(a);
		phyAtTime = -1;
		phyAtBonus = 0.8;
		
		skill_name = "downPhyDam";
		small_SkillType[5] = true;
	}
	public function functions(){
		at.ourAnimationPlay(5);	// animation play
		de.ourAnimationPlay(8);	// animation play
	
		if(de.phyAtBuff == true){
			if(de.phyAtBonus>1){
				de.phyAtTime--;
			}
			else{
				de.phyAtTime++;
			}
		}
		else{
			de.phyAtBonus=phyAtBonus;
			de.phyAtBuff=true;
			de.phyAtTime+=phyAtTime;
		}
		var downD:GameObject=GameObject.Instantiate(Resources.Load("Prefabs/Group 1/downphy"), de.model.transform.position, de.model.transform.rotation);
		downD.transform.SetParent(de.model.transform);
	}	
function Start () {

}

function Update () {

}

}

