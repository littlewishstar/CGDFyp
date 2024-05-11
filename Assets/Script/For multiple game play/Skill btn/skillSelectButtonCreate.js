#pragma strict

function Start () {
	createAllSkill_btn(new person());
}

function Update () {

}

function createAllSkill_btn(pr:person){
	for(var i:int=0;i<pr.skill_List.Count;i++){
		createOneSkill_btn(pr.skill_List.Count,pr.skill_List[i]);
	}
}

function createOneSkill_btn(num:int, bs:skill){
	var skillbtn:GameObject = GameObject.Instantiate(Resources.Load("Prefabs/Skill_btnPrefabs/skill_btn") as GameObject);
	
	skillbtn.transform.SetParent(gameObject.transform);
	skillbtn.SendMessage("Instan_SkillBtn");
	skillbtn.SendMessage("setUpThisSkill",new magicLongAttack(new person()));
	skillbtn.SendMessage("setUpLocation",new Vector2(0,90-120));
}