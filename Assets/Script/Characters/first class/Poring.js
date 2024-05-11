#pragma strict

public class Poring extends person{
	function Start () {

	}

	function Update () {

	}
	public function Poring(){	
		id = 0;
		myName = "Poring";
		star = 5;
		sp = 60;
		hp = 2300;
		fullHp = hp;
		step = 4;
		pa = 650;
		pd=390;
		ma=0;
		md=90;
		job=4;
		
		AI = new PoringFSM();
		
		skill_List.Add(new basicAttack(this));
		
		setModel(Resources.Load("Prefabs/Characters/Poring") as GameObject);
		icon = (Resources.Load.<Sprite>("iconcircle/Characters/poring_icon"));//"iconcircle/Characters/t1"));
	}
	
}