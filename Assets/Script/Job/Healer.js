#pragma strict

public class Healer {

public static function getSkill(i:int,pr:person):skill{
	//slowDownSomeone();
	//twoWayHeal();
	//addPhyDam();
	//autoHeal();
	if(i==0)
		return new slowDownSomeone(pr);
	else if(i==1)
		return new addPhyDam(pr);
	else if(i==2)
		return new twoWayHeal(pr);
	else if(i==3)
		return new autoHeal(pr);
	return null;
}


function Start () {

}

function Update () {

}


}