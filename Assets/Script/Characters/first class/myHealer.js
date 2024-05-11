#pragma strict

public class myHealer extends person{
	function Start () {

	}

	function Update () {

	}
	public function myHealer(){	
		id = 3;
		myName = "myHealer";
		star = 5;
		sp = 50;
		hp = 1800;
		step = 2;
		pa = 100;
		pd=250;
		ma=800;
		md=350;
		job=3;
		
		setModel(Resources.Load("Prefabs/Characters/CB1") as GameObject);
		//icon = (Resources.Load("iconcircle/Characters/t1") as Sprite);
	}
	
}