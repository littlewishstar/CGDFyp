#pragma strict


public class twoWayHeal extends heal{ // choose two people in zone to heal
	public function twoWayHeal(a:person){
		setUser(a);
		skillRange = 5;
		targetNumber=2;
	}
	public function action(){
		cure = Heal();
	}
	
function Start () {

}

function Update () {

}

}

