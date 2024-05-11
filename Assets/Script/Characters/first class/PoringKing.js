#pragma strict

public class PoringKing extends person{
	function Start () {

	}

	function Update () {

	}
	public function PoringKing(){	
		id = 0;
		myName = "PoringKing";
		star = 5;
		sp = 60;
		hp = 2300;
		fullHp = hp;
		step = 3;
		pa = 650;
		pd=390;
		ma=0;
		md=90;
		job=0;
		
		AI = new PoringKingFSM();
		
		setModel(Resources.Load("Prefabs/Characters/PoringKing") as GameObject);
		icon = (Resources.Load.<Sprite>("iconcircle/Characters/t1"));
	}
	
}