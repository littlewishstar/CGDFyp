#pragma strict

var thisRoundPlayer : person;
//var hp : GameObject;

function Start () {

}

function Update () {

}

function recieveCharacter(Player:person){
	thisRoundPlayer = Player;
	createAllSkill_Info(thisRoundPlayer);
	//hp.SendMessage("setUpHpValue",Player);
}

function resetToEmpty (){
	if(thisRoundPlayer.skill_List.Count > 0){
		for(var i:int=0;i<thisRoundPlayer.skill_List.Count;i++){
			Destroy(gameObject.transform.GetChild(i+3).gameObject);
		}
	}
}

function createAllSkill_Info(pr:person){
	for(var i:int=0;i<pr.skill_List.Count;i++){
		createOneSkill_Info(i,pr.skill_List[i]);
	}
}

function createOneSkill_Info(num:int, bs:skill){
	var skillbtn:GameObject = GameObject.Instantiate(Resources.Load("Prefabs/Skill_btnPrefabs/skill_info") as GameObject);
	
	skillbtn.transform.SetParent(gameObject.transform);
	skillbtn.SendMessage("Instan_SkillInfoBtn");
	skillbtn.SendMessage("setUpThisSkill",bs);
	var tools_Vect : Vector2;
	switch(num){
		case 0:	tools_Vect = new Vector2(-75,110);
				break;
		case 1: tools_Vect = new Vector2(-75,40);
				break;
		case 2:	tools_Vect = new Vector2(75,110);
				break;
		case 3: tools_Vect = new Vector2(75,40);
				break;
	}
	skillbtn.SendMessage("setUpLocation",tools_Vect);
}