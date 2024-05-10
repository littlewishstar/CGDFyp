#pragma strict


public class simpleKnockBack extends assist{ // knock back somebody but no hurt
	public function simpleKnockBack(a:person){
		setUser(a);
		knockBackFunction = 1;
		//needChoose = true;
	}
	public function functions(){
		if(de.getLocationX()==at.getLocationX()){
			if(de.getLocationY() > at.getLocationY()){
				knockBackDirection = 2;
			}
			else{
				knockBackDirection = 0;
			}
		}
		if(de.getLocationY()==at.getLocationY()){
			if(de.getLocationX() > at.getLocationX()){
				knockBackDirection = 1;
			}
			else{
				knockBackDirection = 3;
			}
		}
	}	
function Start () {

}

function Update () {

}

}

