#pragma strict

var myNextNum : int;
var ps :List.<person> = new List.<person>(); // record 8 character
static var showFollowing : boolean;

function changeIcon(aryPerson:int[]){
	for(var i:int=0;i<aryPerson.length;i++){
		var person_two: UI.Image = GameObject.Find("Canvas/followingRounds2/"+(i+2)+"/next_icon").GetComponent.<UI.Image>();
		person_two.overrideSprite = ps[aryPerson[i]].getIcon();
		//person_two.rectTransform.position.y--;
	}
}

function setPsList(ps :List.<person>){
	this.ps=ps;
}

public function followingRoundAnimationController(showOrNot:boolean){
	if( showFollowing != showOrNot){
		var followingRoundsAnim:Animator = GameObject.Find("Canvas/followingRounds2").GetComponent("Animator") as Component;
		followingRoundsAnim.SetBool("followingRoundShow",showOrNot);
		showFollowing = showOrNot;
	}
}

function Start () {

}

function Update () {

}

