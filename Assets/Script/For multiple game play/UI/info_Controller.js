#pragma strict

static var personShow : boolean = false;
static var skillDetailShow : boolean = false;
static var hpPageShow : boolean = false;
static var optionShow : boolean = false;

function Start () {
	switchPersonDetail();
}

function Update () {

}

function switchPersonDetail(){
	var personDetail : Animator = GameObject.Find("Canvas/info/personDetail").GetComponent("Animator") as Component;
	var skillDetail : Animator = GameObject.Find("Canvas/info/skillDetail").GetComponent("Animator") as Component;
	var HpBarPage : Animator = GameObject.Find("Canvas/info/HpBarPage").GetComponent("Animator") as Component;
	var optionPage : Animator = GameObject.Find("Canvas/info/option").GetComponent("Animator") as Component;
	if(personShow == false){
		personShow = true;
		skillDetailShow = false;
		hpPageShow = false;
		optionShow = false;
		personDetail.SetBool("personDetailShow",personShow);
		skillDetail.SetBool("skillDetailShow",skillDetailShow);
		HpBarPage.SetBool("hpPageShow",hpPageShow);
		optionPage.SetBool("optionShow",optionShow);
	}
}

function switchSkillDetail(){
	var personDetail : Animator = GameObject.Find("Canvas/info/personDetail").GetComponent("Animator") as Component;
	var skillDetail : Animator = GameObject.Find("Canvas/info/skillDetail").GetComponent("Animator") as Component;
	var HpBarPage : Animator = GameObject.Find("Canvas/info/HpBarPage").GetComponent("Animator") as Component;
	var optionPage : Animator = GameObject.Find("Canvas/info/option").GetComponent("Animator") as Component;
	if(skillDetailShow == false){
		personShow = false;
		skillDetailShow = true;
		hpPageShow = false;
		optionShow = false;
		personDetail.SetBool("personDetailShow",personShow);
		skillDetail.SetBool("skillDetailShow",skillDetailShow);
		HpBarPage.SetBool("hpPageShow",hpPageShow);
		optionPage.SetBool("optionShow",optionShow);
	}
}

function switchHpPage(){
	var personDetail : Animator = GameObject.Find("Canvas/info/personDetail").GetComponent("Animator") as Component;
	var skillDetail : Animator = GameObject.Find("Canvas/info/skillDetail").GetComponent("Animator") as Component;
	var HpBarPage : Animator = GameObject.Find("Canvas/info/HpBarPage").GetComponent("Animator") as Component;
	var optionPage : Animator = GameObject.Find("Canvas/info/option").GetComponent("Animator") as Component;
	if(hpPageShow == false){
		personShow = false;
		skillDetailShow = false;
		hpPageShow = true;
		optionShow = false;
		personDetail.SetBool("personDetailShow",personShow);
		skillDetail.SetBool("skillDetailShow",skillDetailShow);
		HpBarPage.SetBool("hpPageShow",hpPageShow);
		optionPage.SetBool("optionShow",optionShow);
	}
}

function switchOptionPage(){
	var personDetail : Animator = GameObject.Find("Canvas/info/personDetail").GetComponent("Animator") as Component;
	var skillDetail : Animator = GameObject.Find("Canvas/info/skillDetail").GetComponent("Animator") as Component;
	var HpBarPage : Animator = GameObject.Find("Canvas/info/HpBarPage").GetComponent("Animator") as Component;
	var optionPage : Animator = GameObject.Find("Canvas/info/option").GetComponent("Animator") as Component;
	if(optionShow == false){
		personShow = false;
		skillDetailShow = false;
		hpPageShow = false;
		optionShow = true;
		personDetail.SetBool("personDetailShow",personShow);
		skillDetail.SetBool("skillDetailShow",skillDetailShow);
		HpBarPage.SetBool("hpPageShow",hpPageShow);
		optionPage.SetBool("optionShow",optionShow);
	}
}