#pragma strict


public class magicLongAttack extends magic{ // no special bonus attack
	public function magicLongAttack(a:person){
		setUser(a);
		ToZ = 2;
		skillRange = 5;
		
		skill_name = "magicLongAttack";
	}
	public function action(){
		hurt=MagHurt();
		at.ourAnimationPlay(4);	// animation play
		var ball:GameObject=GameObject.Instantiate(Resources.Load("Prefabs/Group 1/fireball"), at.model.transform.position, at.model.transform.rotation);
		ball.GetComponent.<shoot>().setTarget(de.model.transform);
	}
	
function Start () {

}

function Update () {

}

}

