#pragma strict


public class highRoundAttack extends attack{ // no special bonus attack
	public function highRoundAttack(a:person){
		setUser(a);
		needChoose = false;
		needScan=true;
		ToZ = 4;
		attackTeamate = false;
		
		skill_name = "highRoundAttack";
	}
	public function action(){
		hurt=2*PhyHurt();
		at.ourAnimationPlay(6);	// animation play
		var pr : GameObject = at.getModel();
		var highRound : GameObject = GameObject.Instantiate(Resources.Load("Prefabs/Group 1/assroundatt"), pr.transform.position, pr.transform.rotation);
		GameObject.Destroy(highRound, 5);
	}
	
function Start () {

}

function Update () {

}

}

