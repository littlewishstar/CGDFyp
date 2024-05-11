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
	}
	
function Start () {

}

function Update () {

}

}

