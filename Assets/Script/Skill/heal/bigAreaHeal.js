#pragma strict


public class bigAreaHeal extends heal{ // heal all the people in zone
	public function bigAreaHeal(a:person){
		setUser(a);
		//ToZ = 0;
		skillRange = 5;
		needChoose = false;
		needScan=true;
	}
	public function action(){
		cure = Heal();
	}
	
function Start () {

}

function Update () {

}

}

