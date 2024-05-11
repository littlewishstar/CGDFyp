#pragma strict

public class enemyAssissan extends person{
	function Start () {

	}

	function Update () {

	}
	public function enemyAssissan(){	
		id = 11;
		myName = "enemyAssissan";
		star = 5;
		sp = 75;
		hp = 1000;
		fullHp = hp;
		step = 4;
		pa = 1000;
		pd = 150;
		ma = 50;
		md = 300;
		job = 1;
		
		setModel(Resources.Load("Prefabs/Characters/CA2") as GameObject);
		icon = (Resources.Load.<Sprite>("iconcircle/Characters/e2"));
		
		skill_List.Add(new doubleTimeAttack(this));
		skill_List.Add(new poison(this));
		skill_List.Add(new hide(this));
		skill_List.Add(new highRoundAttack(this));
	}
	
}