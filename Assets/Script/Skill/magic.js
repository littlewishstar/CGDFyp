#pragma strict



public class magic extends skill{

var hurt : int  = 0;


public function magic(){ // constructer for extends
	needHurtCal=true;
	haveFunction=false;
	chooseTeamate = false;
}
public function attack(a: person){ // contructer
	setUser(a);
	//needHurtCal=true;
}
public function MagHurt(): int{ // return Physical hurt 
	return (at.magicalDamage()-de.magicalDamage());
}
public function damage(): int{
	if(hurt>0){
		return hurt;
	}
	return 1;
}

function Start () {

}

function Update () {

}


}