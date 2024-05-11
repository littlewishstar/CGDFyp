#pragma strict


public class thunderLink extends magic{ // no special bonus attack
	public function thunderLink(a:person){
		setUser(a);
		isContinuousSearchingTarget=true;
		continueToZ=4;
		allowMyself = false;
		chooseTeamate = true;
		
		skill_name = "thunderLink";
	}
	public function action(){
		hurt=MagHurt()/2;
		at.ourAnimationPlay(4);	// animation play
		var pr : GameObject = de.getModel();
		var thunder:GameObject=GameObject.Instantiate(Resources.Load("Prefabs/Group 1/Thunder"), pr.transform.position, pr.transform.rotation);
		GameObject.Destroy(thunder,2.0f);
	}
	
function Start () {

}

function Update () {

}

}

