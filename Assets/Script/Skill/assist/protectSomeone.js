#pragma strict


public class protectSomeone extends assist{ 
	public function protectSomeone(a:person){
		setUser(a);
	}
	public function functions(){
		de.protectedHit = 1;
		de.protectedRound = 999;
		de.protector=at.getId();
		print(de.protector + " start protect "+de.getName());
	}	
function Start () {

}

function Update () {

}

}

