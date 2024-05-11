#pragma strict

public class myAssissan extends person{
	function Start () {

	}

	function Update () {

	}
	public function myAssissan(){	
		id = 1;
		myName = "myAssissan";
		star = 5;
		sp = 80;
		hp = 1000;
		fullHp = hp;
		step = 4;
		pa = 1000;
		pd = 150;
		ma = 50;
		md = 300;
		job = 1;
		
		setModel(Resources.Load("Prefabs/Characters/CA1") as GameObject);
		icon = (Resources.Load.<Sprite>("iconcircle/Characters/t2"));
	}
	
}