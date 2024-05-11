#pragma strict

var thisRect : RectTransform;//UI.Image;

function Start () {

}

function Update () {

}

function setUpHpValue(pr:person){
	var icon : UI.Image = transform.GetChild(0).GetComponent.<UI.Image>();
	var personID : UI.Text = transform.GetChild(1).GetComponent.<UI.Text>();
	var name : UI.Text = transform.GetChild(2).GetComponent.<UI.Text>();
	var HpBar : UI.Scrollbar = transform.GetChild(3).GetComponent.<UI.Scrollbar>();
	var hpValue : UI.Text = transform.GetChild(4).GetComponent.<UI.Text>();
	
	icon.overrideSprite = pr.getIcon();
	personID.text = "ID:" + pr.getId();
	name.text = "Name:"+pr.getName();
	hpValue.text = pr.getHp()+"/"+pr.getFullHp();
	
	var hp : float = pr.getHp();
	var fullHp : float =  pr.getFullHp();
	HpBar.size = hp/fullHp;
}

function setUpLocation(pos:Vector2){
	thisRect = gameObject.GetComponent.<RectTransform>();
	thisRect.localScale.x = 1;
	thisRect.localScale.y = 1;
	thisRect.localScale.z = 1;
	
	thisRect.localRotation.x = 0;
	thisRect.localRotation.y = 0;
	thisRect.localRotation.z = 0;
	
	
	thisRect.localPosition.x = pos.x;
	thisRect.localPosition.y = pos.y;
	thisRect.localPosition.z = 0;
}