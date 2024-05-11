#pragma strict

function Start () {

}

function Update () {

}

public static function getStage(stageNum:int):stageSample{
	switch(stageNum){
		case 1: return new stage01();
				break;
		case 2: return new stageFinal();
				break;
		default: return new stage01();
				 break;
	}
}