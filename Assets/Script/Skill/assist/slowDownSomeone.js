#pragma strict


public class slowDownSomeone extends assist{ 
	public function slowDownSomeone(a:person){
		setUser(a);
		//isListChange = true;
		skillRange = 3;
		roundOfDelay = 2;
		
		skill_name = "slowDownSomeone";
		small_SkillType[8] = true;
	}
	public function functions(){
		at.ourAnimationPlay(5);	// animation play
	
		var pr : GameObject = de.getModel();
		var slow:GameObject=GameObject.Instantiate(Resources.Load("Prefabs/Group 1/slowdown"), pr.transform.position, pr.transform.rotation);
		GameObject.Destroy(slow,7);
	}	
function Start () {

}

function Update () {

}

}

