#pragma strict

var team : teamSample;
public var a :int=0;
var goingStage : int;

function Start () {
	
	
	//team.teamStore = new int[4];
}

function Update () {

}

function setTeam(){
	team  = new team01();
	DontDestroyOnLoad (gameObject);
	var pet01:GameObject = GameObject.Find("Canvas/TEAM_menu/Panel/Panel/pet01");
	var pet02:GameObject = GameObject.Find("Canvas/TEAM_menu/Panel/Panel/pet02");
	var pet03:GameObject = GameObject.Find("Canvas/TEAM_menu/Panel/Panel/pet03");
	var pet04:GameObject = GameObject.Find("Canvas/TEAM_menu/Panel/Panel/pet04");

	team.teamStore[0] = pet01.GetComponent.<TeamBoxes>().myID;
	team.teamStore[1] = pet02.GetComponent.<TeamBoxes>().myID;
	team.teamStore[2] = pet03.GetComponent.<TeamBoxes>().myID;
	team.teamStore[3] = pet04.GetComponent.<TeamBoxes>().myID;
	//print("team 01 id :"+team.teamStore[0]);
	
	a = 1;

}

function setStage(stageNum:int){
	setTeam();
	DontDestroyOnLoad (gameObject);
	goingStage = stageNum;
}

function destroyMe(){
	Debug.Log("delete");
	Destroy(gameObject);
}