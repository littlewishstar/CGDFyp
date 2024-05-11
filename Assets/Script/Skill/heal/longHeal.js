#pragma strict


public class longHeal extends heal{ // heal one people in the area
	public function longHeal(a:person){
		setUser(a);
		skillRange = 5;
	}
	public function action(){
		cure = Heal();
	}
	
function Start () {

}

function Update () {

}

}

