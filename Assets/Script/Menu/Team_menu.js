#pragma strict

var team_ary : int[] = new int[4];
var allPet : List.<int> = new List.<int>();;
static var readyToChange : int =-1;

function Start () {
	readyToChange = -1;
	
	team_ary = [0, 1, 2, 3];
	for(var i:int=0;i<4;i++){
		for(var j:int=0;j<3;j++){
			allPet.Add(i);
			Debug.Log(allPet[allPet.Count-1]);
		}
	}
	setUpTeam();
	
}

function Update () {

}

function setUpTeam(){
	var pet01:GameObject = GameObject.Find("Canvas/TEAM_menu/Panel/Panel/pet01");
	var pet02:GameObject = GameObject.Find("Canvas/TEAM_menu/Panel/Panel/pet02");
	var pet03:GameObject = GameObject.Find("Canvas/TEAM_menu/Panel/Panel/pet03");
	var pet04:GameObject = GameObject.Find("Canvas/TEAM_menu/Panel/Panel/pet04");
	
	pet01.SendMessage("changePerson", team_ary[0]);
	pet02.SendMessage("changePerson", team_ary[1]);
	pet03.SendMessage("changePerson", team_ary[2]);
	pet04.SendMessage("changePerson", team_ary[3]);
}

function whoChange(who:int){
	readyToChange = who;
}

function changeTeam(newTeammate:int){
	team_ary[readyToChange] = newTeammate;
	setUpTeam();
}