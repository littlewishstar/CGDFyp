#pragma strict


public class doubleTimeAttack extends attack{ // no special bonus attack
	public function doubleTimeAttack(a:person){
		setUser(a);
	}
	public function action(){
		hurt=parseInt(0.75*PhyHurt());
		runTimes=2;
	}
	
function Start () {

}

function Update () {

}

}

