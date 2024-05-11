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
		
		setModel(Resources.Load("Prefabs/Characters/thief") as GameObject);
		icon = (Resources.Load.<Sprite>("iconcircle/Characters/thief_icon"));
		
		skill_List.Add(new doubleTimeAttack(this));//new doubleTimeAttack(this)); //
		skill_List.Add(new poison(this));
		skill_List.Add(new selfTeleport(this));//provocative(this));//hide(this));
		skill_List.Add(new highRoundAttack(this));
	}
	
}