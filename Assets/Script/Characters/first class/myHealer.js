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
		fullHp = hp;
		step = 2;
		pa = 100;
		pd=250;
		ma=800;
		md=350;
		job=3;
		
		setModel(Resources.Load("Prefabs/Characters/healer") as GameObject);
		icon = (Resources.Load.<Sprite>("iconcircle/Characters/healer_Icon"));
		
		skill_List.Add(new slowDownSomeone(this));
		skill_List.Add(new addPhyDam(this));
		skill_List.Add(new twoWayHeal(this));
		skill_List.Add(new autoHeal(this));
	}
	
}