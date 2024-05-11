#pragma strict

var skillTypeLogoAry:Sprite[]=new Sprite[3];	// skill big Logo to define the basic type 
var skillType : int=-1;	// recording the skill basic type
var thisSkill : skill;	// record recent skill

var thisRect : RectTransform;//UI.Image;

function Start () {
	//thisSkill = new poison(new person());
}

function Update () {

}

function Instan_SkillInfoBtn(){
	// load the png file
	skillTypeLogoAry[0] = (Resources.Load.<Sprite>("iconcircle/info/att_icon"));
	skillTypeLogoAry[1] = (Resources.Load.<Sprite>("iconcircle/info/magic_icon"));
	skillTypeLogoAry[2] = (Resources.Load.<Sprite>("iconcircle/info/tech_icon"));
	
	thisRect = gameObject.GetComponent.<RectTransform>();
	thisRect.localScale.x = 1;
	thisRect.localScale.y = 1;
	thisRect.localScale.z = 1;
	
	thisRect.localRotation.x = 0;
	thisRect.localRotation.y = 0;
	thisRect.localRotation.z = 0;
	
	thisRect.localPosition.x = 0;
	thisRect.localPosition.y = 0;
	thisRect.localPosition.z = 0;
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
	//checkWhichIcon();
}


function setUpLocation(pos:Vector2){
	thisRect.localPosition.x = pos.x;
	thisRect.localPosition.y = pos.y;
	thisRect.localPosition.z = 0;
	
	Debug.Log(thisRect.localPosition.y);
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

function showThisSkillDetail(){
	var skillDetailText : UI.Text = transform.parent.transform.Find("singleDetail/DetailText").GetComponent.<UI.Text>();
	var skillName : String = " Skill Name : " + thisSkill.skill_name;
	skillDetailText.text = skillName+"\n ";
	
	var typeOfSkill : String = "Skill Type : ";
	if(thisSkill.isPhy == true){
		typeOfSkill += "physical Attack";
	}else if(thisSkill.isMag == true){
		typeOfSkill += "magical Attack";
	}else if(thisSkill.isHeal == true){
		typeOfSkill += "healing";
	}else{
		typeOfSkill += "assist";
	}
	skillDetailText.text += typeOfSkill+"\n ";
	
	var skillRunTime : String = "run times : " + thisSkill.runTimes;
	skillDetailText.text += skillRunTime+"\n ";
	
	var skillRange : String = "skill Range : " + thisSkill.skillRange;
	skillDetailText.text += skillRange+"\n ";
	
	if(thisSkill.placeChoose == true | thisSkill.needChoose == true | thisSkill.needScan == true){
		var ToZ : String = "type of zone : ";
		ToZ += ToZString(thisSkill.ToZ);
		skillDetailText.text += ToZ+"\n ";
	}
	
	if(thisSkill.isRepeatedlyScan == true){
		var skillRange2 : String = "skill Range : " + thisSkill.secondRange;
		skillDetailText.text += skillRange2+"\n ";
		
		var ToZ2 : String = "type of zone : ";
		ToZ2 += ToZString(thisSkill.secondToZ);
		skillDetailText.text += ToZ2+"\n ";
	}
	
	if(thisSkill.isContinuousSearchingTarget == true){		
		var ToZ3 : String = "type of zone : ";
		ToZ3 += ToZString(thisSkill.continueToZ);
		skillDetailText.text += ToZ3+"\n ";
	}
	
	if(thisSkill.allowMyself == true){
		skillDetailText.text += "對自已有效\n ";
	}
	
	if(thisSkill.attackTeamate == true){
		skillDetailText.text += "can attack teamate\n ";
	}
	
	if(thisSkill.attackEmery == false){
		skillDetailText.text += "對敵人無效\n ";
	}
	
	if(thisSkill.small_SkillType[0]){
		var phyAtBonus : String = "Buff attack Bonus : " + thisSkill.phyAtBonus;
		skillDetailText.text += phyAtBonus+"\n ";
		
		
		var phyAtTime : String = "Buff attack increase time  : " + thisSkill.phyAtTime;
		skillDetailText.text += phyAtTime+"\n ";
	}
	
	if(thisSkill.small_SkillType[3]){
		skillDetailText.text += "select place to use\n ";
	}
	
	if(thisSkill.small_SkillType[4]){
		var targetNum : String = "target numbers  : " + thisSkill.targetNumber;
		skillDetailText.text += targetNum+"\n ";
	}
	
	if(thisSkill.small_SkillType[5]){
		if(thisSkill.phyAtBonus != 1){
			var nerfAtBonus : String = "nerf attack : " + thisSkill.phyAtBonus;
			skillDetailText.text += nerfAtBonus+"\n ";
		}
		
		if(thisSkill.phyAtTime !=0){
			var nerfAtTime : String = "nerf attack increase/decrease time  : " + thisSkill.phyAtTime;
			skillDetailText.text += nerfAtTime+"\n ";
		}
	}
	
	if(thisSkill.small_SkillType[6]){
		if(thisSkill.phyAtBonus != 1){
			var autoRound_Hp : String = "keep round number : " + thisSkill.autoRound_Hp;
			skillDetailText.text += autoRound_Hp+"\n ";
		}
	}
	
	if(thisSkill.small_SkillType[7]){
		if(thisSkill.knockBackFunction != 0){
			var knockBackFunction : String = "knock back range : " + thisSkill.knockBackFunction;
			skillDetailText.text += knockBackFunction+"\n ";
		}
	}
	
	if(thisSkill.small_SkillType[8]){
		if(thisSkill.roundOfDelay != 0){
			var roundOfDelay : String = "time shift turn : " + thisSkill.roundOfDelay;
			skillDetailText.text += roundOfDelay+"\n ";
		}
	}
	
	/*
	for(var num:int=0;num<20;num++){
		skillDetailText.text += skillRange+"\n ";
	}*/
	
	skillDetailText.rectTransform.sizeDelta = new Vector2(300, skillDetailText.preferredHeight);
	
	
	//skillDetailText.text = skillName+"\n "+typeOfSkill+"\n "+skillRunTime+"\n"+skillRange;
}

function ToZString(i:int):String{
	switch (i){
		case 0 : 	return "tree recursive";
		case 1 : 	return "cross (not stop by people)";						
		case 2 : 	return "cross (will stop by people)";
		case 3 : 	return "circle";
		case 4 : 	return "aroundPeople";
	}
}

function OnClick(){
	showThisSkillDetail();
}