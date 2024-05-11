#pragma strict

var thisCharacterID : int = 0;

function Start () {
	setUpThisButton();
}

function Update () {

}

function setUpThisButton(){
	var thisCharacter : person = characterList.getCharacter(thisCharacterID);
	transform.GetComponent.<UI.Image>().overrideSprite = thisCharacter.getIcon();
}

public function setInfoContent(){
	
	var pr : person = characterList.getCharacter(thisCharacterID);
	
	//var infoIcon: UI.Image = GameObject.Find("Canvas/TEAM_menu/Panel/infoPanel/personDetail/hurt").GetComponent.<UI.Image>();	// icon in info
	//infoIcon.overrideSprite = pr.getIcon();
	var hp: UI.Text = GameObject.Find("Canvas/TEAM_menu/Panel/infoPanel/personDetail/hurt/hpValue").GetComponent.<UI.Text>();//charName.text="寵"+ps[playlist[round]].getId().ToString();
	hp.text = pr.getHp()+"/"+pr.getFullHp();
	var pa: UI.Text = GameObject.Find("Canvas/TEAM_menu/Panel/infoPanel/personDetail/hurt/pa value").GetComponent.<UI.Text>();//charName.text="寵"+ps[playlist[round]].getId().ToString();
	pa.text = pr.getPa().ToString();
	var pd: UI.Text = GameObject.Find("Canvas/TEAM_menu/Panel/infoPanel/personDetail/hurt/pd value").GetComponent.<UI.Text>();//charName.text="寵"+ps[playlist[round]].getId().ToString();
	pd.text = pr.getPd().ToString();
	var ma: UI.Text = GameObject.Find("Canvas/TEAM_menu/Panel/infoPanel/personDetail/hurt/ma value").GetComponent.<UI.Text>();//charName.text="寵"+ps[playlist[round]].getId().ToString();
	ma.text = pr.getMa().ToString();
	var md: UI.Text = GameObject.Find("Canvas/TEAM_menu/Panel/infoPanel/personDetail/hurt/md value").GetComponent.<UI.Text>();//charName.text="寵"+ps[playlist[round]].getId().ToString();
	md.text = pr.getMd().ToString();
	var speed: UI.Text = GameObject.Find("Canvas/TEAM_menu/Panel/infoPanel/personDetail/hurt/speed value").GetComponent.<UI.Text>();//charName.text="寵"+ps[playlist[round]].getId().ToString();
	speed.text = pr.getSp().ToString();
}

public function buttonAction(){
	var readyToChange : int = Team_menu.readyToChange;
	Debug.Log(readyToChange);
	if(readyToChange > -1){
		var team_menu:GameObject = GameObject.Find("Canvas/TEAM_menu");
		team_menu.SendMessage("changeTeam", thisCharacterID);
		team_menu.SendMessage("whoChange", -1);
	}else{
		setInfoContent();
	}
}