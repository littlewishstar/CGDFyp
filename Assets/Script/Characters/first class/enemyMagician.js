#pragma strict

public class enemyMagician extends person{
	function Start () {

	}

	function Update () {

	}
	public function enemyMagician(){	
		id = 12;
		myName = "enemyMagician";
		star = 5;
		sp = 45;
		hp = 1400;
		step = 2;
		pa = 100;
		pd=200;
		ma=1000;
		md=460;
		job=2;
		
		setModel(Resources.Load("Prefabs/Characters/CC2") as GameObject);
		//icon = (Resources.Load("iconcircle/Characters/t1") as Sprite);
	}
	
}