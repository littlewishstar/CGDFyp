#pragma strict


public class simpleKnockBack extends assist{ // knock back somebody but no hurt
	public function simpleKnockBack(a:person){
		setUser(a);
		knockBackFunction = 1;
		//needChoose = true;
		
		skill_name = "simpleKnockBack";
		small_SkillType[7] = true;
	}
	public function functions(){
		at.ourAnimationPlay(7);	// animation play
		
		if(de.getLocationX()==at.getLocationX()){
			if(de.getLocationY() > at.getLocationY()){
				knockBackDirection = 2;
			}
			else{
				knockBackDirection = 0;
			}
		}
		if(de.getLocationY()==at.getLocationY()){
			if(de.getLocationX() > at.getLocationX()){
				knockBackDirection = 1;
			}
			else{
				knockBackDirection = 3;
			}
		}
		var pr : GameObject = de.getModel();
		var knock:GameObject=GameObject.Instantiate(Resources.Load("Prefabs/Group 1/KnockBack"), pr.transform.position, pr.transform.rotation);
		GameObject.Destroy(knock,0.5);
	}	
function Start () {

}

function Update () {

}

}

