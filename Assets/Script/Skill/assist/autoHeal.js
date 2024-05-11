#pragma strict


public class autoHeal extends assist{ 
	public function autoHeal(a:person){
		setUser(a);
		
		skill_name = "autoHeal";
	}
	public function functions(){
		de.isAutoHeal=true;
		de.autoHealNum=at.magicalDamage()/5;
		de.autoHealRound=10;
	}	
function Start () {

}

function Update () {

}

}

