#pragma strict


public class roundAttack extends attack{ // no special bonus attack
	public function roundAttack(a:person){
		setUser(a);
		needChoose = false;
		needScan=true;
		ToZ = 4;
		attackTeamate = false;
		skill_name = "roundAttack";
	}
	public function action(){
		hurt=PhyHurt();
		at.ourAnimationPlay(6);	// animation play
		var pr : GameObject = at.getModel();
		var roundAtt:GameObject =GameObject.Instantiate(Resources.Load("Prefabs/Group 1/aroundatt"), pr.transform.position, pr.transform.rotation);
		GameObject.Destroy(roundAtt, 5);
	}
	
function Start () {

}

function Update () {

}

}

