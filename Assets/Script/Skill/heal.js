#pragma strict


public class heal extends skill{

var cure : int  = 0;


public function heal(){ // constructer for extends
	isHeal = true;
	
	needHurtCal=true;
	haveFunction=false;
}
public function attack(a: person){ // contructer
	setUser(a);
	//needHurtCal=true;
}
public function Heal(): int{ // return Physical hurt 
	return (at.magicalDamage());
}
public function damage(): int{
	if(cure>0){
		return -cure;
	}
	return 1;
}



function Start () {

}

function Update () {

}


}