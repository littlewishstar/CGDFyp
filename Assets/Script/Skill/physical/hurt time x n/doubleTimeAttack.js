#pragma strict


public class doubleTimeAttack extends attack{ // no special bonus attack
	public function doubleTimeAttack(a:person){
		setUser(a);
	
		skill_name = "doubleTimeAttack";
	}
	public function action(){
		hurt=parseInt(0.75*PhyHurt());
		runTimes=2;
		at.ourAnimationPlay(3);	// animation play
		var att:GameObject=GameObject.Instantiate(Resources.Load("Prefabs/Group 1/attc"), de.model.transform.position+new Vector3(0, 1, 0), de.model.transform.rotation);
		GameObject.Destroy(att,2.0f);
	}
	
function Start () {

}

function Update () {

}

}

