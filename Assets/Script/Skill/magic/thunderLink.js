#pragma strict


public class thunderLink extends magic{ // no special bonus attack
	public function thunderLink(a:person){
		setUser(a);
		isContinuousSearchingTarget=true;
		continueToZ=4;
	}
	public function action(){
		hurt=MagHurt()/2;
	}
	
function Start () {

}

function Update () {

}

}

