#pragma strict

var skillTypeLogoAry:Sprite[]=new Sprite[3];	// skill big Logo to define the basic type 
var skillType : int=-1;	// recording the skill basic type
var thisSkill : skill;	// record recent skill

var thisRect : RectTransform;//UI.Image;

function Start () {
	Instan_SkillBtn();
}

function Update () {

}

function Instan_SkillBtn(){
	// load the png file
	skillTypeLogoAry[0] = (Resources.Load.<Sprite>("iconcircle/skill button/physicaltype"));
	skillTypeLogoAry[1] = (Resources.Load.<Sprite>("iconcircle/skill button/magictype"));
	skillTypeLogoAry[2] = (Resources.Load.<Sprite>("iconcircle/skill button/effecttype"));
	
	thisRect = gameObject.GetComponent.<RectTransform>();
	thisRect.localScale.x = 1;
	thisRect.localScale.y = 1;
	thisRect.localScale.z = 1;
	
	thisRect.localRotation.x = 0;
	thisRect.localRotation.y = 0;
	thisRect.localRotation.z = 0;
	
}

function setUpThisSkill(bs:skill){	// recieved the skill
	thisSkill = bs;
	setUpMyType();
}

function setUpMyType(){	// find the basic type
	if(thisSkill.isPhy){
		skillType = 0;
	}
	else if(thisSkill.isMag){
		skillType = 1;
	}
	else{
		skillType = 2;
	}
	
	//skillType = type;
	changeTypeLogo ();
	changeBtnText();
	checkWhichIcon();
}

function setUpLocation(pos:Vector2){
	thisRect.localPosition.x = pos.x;
	thisRect.localPosition.y = pos.y;
	thisRect.localPosition.z = 0;
}

function changeTypeLogo (){
	if(skillType < skillTypeLogoAry.Length){
		var typeLogo : UI.Image = transform.GetChild(0).GetComponent.<UI.Image>();
		//typeLogo.rectTransform.position.y--;
		typeLogo.overrideSprite = skillTypeLogoAry[skillType];
	}
}

var intel : int =-1;
function changeBtnText(){
	var thisSkill_Name :UI.Text = transform.GetChild(1).GetComponent.<UI.Text>();
	thisSkill_Name.text = thisSkill.getSkillName();
	//var smallIcon_01 : GameObject = transform.GetChild(2).gameObject;
	//smallIcon_01.SendMessage("setThisIconType",++intel);
}

function createAllSmallIcon(IconList : List.<int>){
	for(var i:int=0;i<IconList.Count;i++){
		createOneSmallIcon(i,IconList[i]);
	}
}

function createOneSmallIcon(num:int, type:int){
	var smallIcon2:GameObject = GameObject.Instantiate(Resources.Load("Prefabs/Skill_btnPrefabs/smallIcon") as GameObject);
	
	smallIcon2.transform.SetParent(gameObject.transform);
	smallIcon2.SendMessage("Instan_Me");
	smallIcon2.SendMessage("setThisIconType",type);
	smallIcon2.SendMessage("setUpLocation",new Vector2(-28+28*num,-10));
}

function checkWhichIcon(){
	var IconList :List.<int> = new List.<int>();
	for(var i:int=0;i<thisSkill.small_SkillType.length;i++){
		if(thisSkill.small_SkillType[i] == true){
			IconList.Add(i);
		}
	}
	createAllSmallIcon(IconList);
	
}

function sendSkillAndStartUse(){
	var gameController : MultipleGameProcess = GameObject.Find("Main Game Controller").GetComponent.<MultipleGameProcess>();
	gameController.SendMessage("useSkill01",thisSkill);
}

