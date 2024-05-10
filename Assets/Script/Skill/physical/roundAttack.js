#pragma strict


public class roundAttack extends attack{ // no special bonus attack
	public function roundAttack(a:person){
		setUser(a);
		needChoose = false;
		needScan=true;
		ToZ = 4;
	}
	public function action(){
		hurt=PhyHurt();
	}
	
function Start () {

}

function Update () {

}

}

