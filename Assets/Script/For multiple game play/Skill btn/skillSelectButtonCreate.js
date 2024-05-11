#pragma strict

var thisRoundPlayer : person;

function Start () {
	//createAllSkill_btn(new myMagician());
}

function Update () {

}

function createAllSkill_btn(pr:person){
	for(var i:int=0;i<pr.skill_List.Count;i++){
		createOneSkill_btn(i,pr.skill_List[i]);
	}
}

function createOneSkill_btn(num:int, bs:skill){
	var skillbtn:GameObject = GameObject.Instantiate(Resources.Load("Prefabs/Skill_btnPrefabs/skill_btn") as GameObject);
	
	skillbtn.transform.SetParent(gameObject.transform);
	skillbtn.SendMessage("Instan_SkillBtn");
	skillbtn.SendMessage("setUpThisSkill",bs);
	skillbtn.SendMessage("setUpLocation",new Vector2(0,90-60*num));
}

function recieveCharacter(Player:person){
	thisRoundPlayer = Player;
	createAllSkill_btn(thisRoundPlayer);
}


function resetToEmpty (){
	if(thisRoundPlayer.skill_List.Count > 0){
		for(var i:int=0;i<thisRoundPlayer.skill_List.Count;i++){
			Destroy(gameObject.transform.GetChild(i+2).gameObject);
		}
	}
}
