#pragma strict

public class Poring extends person{
	function Start () {

	}

	function Update () {

	}
	public function Poring(){	
		id = 100;
		myName = "Poring";
		star = 5;
		sp = 60;
		hp = 2300;
		step = 3;
		pa = 650;
		pd=390;
		ma=0;
		md=90;
		job=5;
		
		setModel(Resources.Load("Prefabs/Characters/Poring") as GameObject);
		//icon = (Resources.Load("iconcircle/Characters/t1") as Sprite);
	}
	
}