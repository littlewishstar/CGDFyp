#pragma strict

var skillSmallIconAry:Sprite[]=new Sprite[9];	// skill small icon to show the skill detail type
var thisImage : UI.Image;

function Start () {
	Instan_Me();
}

function Update () {

}

function Instan_Me(){
	skillSmallIconAry[0] = (Resources.Load.<Sprite>("iconcircle/skill button/small icon/buff_up"));
	skillSmallIconAry[1] = (Resources.Load.<Sprite>("iconcircle/skill button/small icon/cant_target"));
	skillSmallIconAry[2] = (Resources.Load.<Sprite>("iconcircle/skill button/small icon/damage_transfer"));
	skillSmallIconAry[3] = (Resources.Load.<Sprite>("iconcircle/skill button/small icon/ground_target"));
	skillSmallIconAry[4] = (Resources.Load.<Sprite>("iconcircle/skill button/small icon/multi_target"));
	skillSmallIconAry[5] = (Resources.Load.<Sprite>("iconcircle/skill button/small icon/nerf_down"));
	skillSmallIconAry[6] = (Resources.Load.<Sprite>("iconcircle/skill button/small icon/poison"));
	skillSmallIconAry[7] = (Resources.Load.<Sprite>("iconcircle/skill button/small icon/position_change"));
	skillSmallIconAry[8] = (Resources.Load.<Sprite>("iconcircle/skill button/small icon/time_relate"));
	
	thisImage = gameObject.GetComponent.<UI.Image>();
	thisImage.rectTransform.localScale.x = 1;
	thisImage.rectTransform.localScale.y = 1;
	thisImage.rectTransform.localScale.z = 1;
	
	thisImage.rectTransform.localRotation.x = 0;
	thisImage.rectTransform.localRotation.y = 0;
	thisImage.rectTransform.localRotation.z = 0;
}

function setThisIconType(type : int){
	if(type < skillSmallIconAry.length)
		thisImage.overrideSprite = skillSmallIconAry[type];
}

function setUpLocation(pos:Vector2){
	thisImage.rectTransform.localPosition.x = pos.x;
	thisImage.rectTransform.localPosition.y = pos.y;
	thisImage.rectTransform.localPosition.z = 0;
}