#pragma strict

import System.Collections.Generic ;


public class skill{
	
	var at : person; // the person who use this skill 
	var de : person; // the person who be used by this skill
	
	var runTimes : int = 1; // how many time will this skill run
	var skillRange : int = 1; // how big will this skill cover 
	var secondRange : int = 1; // if this skill to scan more than one times, this is the range of the skill coving
	
	var ToZ : int = 0;
	
	
	// ToZ = Type of Zone
	// because we have a lot of skill in this game, 
	// and different skill have different type of Zone
	// so we need to mark that down
	/*
	 0=tree recursive // as same as walk
	 1=cross1 // will not stop by people
	 2=cross2 // will stop by people means no more than one person get hurt per line
	 3=circle // circle around the person
	 4=aroundPeople // nine square around the person
	*/
	var secondToZ : int = 0; // As we have secondRange for the second time scsan so Second scan also has it own type of zone
	var continueToZ : int = 0; // some skill will continue to add more target, and this method should have it own type of zone
	
	var targetNumber : int = 1; // most of skill only having one target but also allow more than one
	
	var needChoose : boolean = true; // is this skill need to choose a target
	var needHurtCal : boolean = false; // is this skill need to hurt or heal somebody
	var haveFunction : boolean = false; // do this skill have a function
	var placeChoose : boolean = false; // is this skill need to select a place 
	var needScan : boolean = false; // is this skill need to search target in amount of place
	
	var targetX : int = -1; // record the x of location which we selected
	var targetY : int = -1; // record the y of location which we selected
	
	// some of our skill having a knock back function
	var knockBackFunction : int =0; // 0 = no this function, n>0 = the range of the function, the range that the target will be knocked back
	var knockBackDirection : int =0; //the direction of this knock back // {0,1,2,3} = {up,right,down,left}
	
	var isRepeatedlyScan : boolean = false; // is this skill need to scan more than one time
	var isContinuousSearchingTarget : boolean = false; // is this skill need to continue to search target
	
	// is this skill need to build up something ?
	var buildObject : int = -1; // -1 = nothing n>0 is same as the type in box
	
	var isPlaceChange : boolean = false; // want somebody change the location by skill
	// boolean isListChange = false; // is the skill will change the playlist of game process
	// record the number of round that the target need to delay,
	// 0 = no need to delay,
	// n >= 1 means delay how many times
	// n < 0 means move fast how many round
	
	// some skill will let somebody can action early or delay
	var roundOfDelay : int = 0; // 0 = no this function, n>0 = round of delay, n<0 = round of early
	var allowMyself:boolean = false; // can this skill choose yourself when you choosing target
	
	var chooseTeamate:boolean = true; // can this skill choose target that who is your teammate
	var attackTeamate:boolean = true; // can this skiil attack your teamate
	var attackEmery : boolean = true; // can this skill attack your emery
	
	public function skill(){ // constructer // empty for extends
	
	}
	public function skill(a : person){ // constructer
		setUser(a);
	}
	function Start () {

	}

	function Update () {

	}
	// set up who is the user of this skill
	function setUser (a : person){
		at=a;
	}
	//set up who is the target of this skill
	function setTarget(d:person):person{
		de=d;
		return de;
	}
	
	// scan who are the characters in this zone of this skill
	function scan(OKBoard : boolean[,], prBoard : int[,], pr : List.<person>):List.<person>{
		var target : List.<person> = new List.<person>();
		for(var i:int=0;i<prBoard.GetLength(0);i++){
			for(var j:int=0;j<prBoard.GetLength(1);j++){
				if(OKBoard[i,j]==true && prBoard[i,j] >=0){
					if(pr[(prBoard[i,j])].protector == -1){
						target.Add(pr[prBoard[i,j]]);
					}
					else{
						target.Add(pr[pr[prBoard[i,j]].protector]);
						pr[(prBoard[i,j])].checkProtect();
					}
				}
			}
		}
		return target;
	}
	// scan who are the characters in this zone of this skill
	function scan(OKBoard : boolean[,], prBoard : board, pr : List.<person>):List.<person>{
		var target : List.<person> = new List.<person>();
		for(var i:int=0;i<prBoard.getSizeX();i++){
			for(var j:int=0;j<prBoard.getSizeY();j++){
				if(OKBoard[i,j]==true && prBoard.getBox(i,j).havePerson() == true){
					if(pr[prBoard.getBox(i,j).getMan()].protector == -1){
						target.Add(pr[prBoard.getBox(i,j).getMan()]);
					}
					else{
						target.Add(pr[pr[prBoard.getBox(i,j).getMan()].protector]);
						pr[(prBoard.getBox(i,j).getMan())].checkProtect();
					}
				}
			}
		}
		return target;
	}
	// scan who are the characters in this zone of this skill in the continuous scan
	function scan2(OKBoard : boolean[,], prBoard : int[,], pr : List.<person>):person[]{
		var target : List.<person> = new List.<person>();
		for(var i:int=0;i<prBoard.GetLength(0);i++){
			for(var j:int=0;j<prBoard.GetLength(1);j++){
				if(OKBoard[i,j]==true && prBoard[i,j] >=0){
					if(pr[(prBoard[i,j])].protector == -1){
						target.Add(pr[prBoard[i,j]]);
					}
					else{
						target.Add(pr[pr[prBoard[i,j]].protector]);
						pr[(prBoard[i,j])].checkProtect();
					}
				}
			}
		}
		var target2 : person[]  = new person[target.Count];
		for(i =0;i<target2.length;i++){
			target2[i] = target[i];
		}
		return target2;
	}
	// scan who are the characters in this zone of this skill in the continuous scan
	function scan2(OKBoard : boolean[,], prBoard : board, pr : List.<person>):person[]{
		var target : List.<person> = new List.<person>();
		for(var i:int=0;i<prBoard.getSizeX();i++){
			for(var j:int=0;j<prBoard.getSizeY();j++){
				if(OKBoard[i,j]==true && prBoard.getBox(i,j).havePerson() == true){
					if(pr[prBoard.getBox(i,j).getMan()].protector == -1){
						target.Add(pr[prBoard.getBox(i,j).getMan()]);
					}
					else{
						target.Add(pr[pr[prBoard.getBox(i,j).getMan()].protector]);
						pr[prBoard.getBox(i,j).getMan()].checkProtect();
					}
				}
			}
		}
		var target2 : person[]  = new person[target.Count];
		for(i =0;i<target2.length;i++){
			target2[i] = target[i];
		}
		return target2;
	}
	function action(){
		//System.out.println("I am skill");
	}
	function functions(){
		
	}
	function damage(): int{
		return 0;
	}
	function setLand(x : int,y : int ){
		targetX=x;
		targetY=y;
	}
	
	public function MO():float{ // random out the MO
		/*Random rand = new Random();
		int n = rand.nextInt(101);*/
		var n : int = Random.Range(0,101);
		if(n<3){
			return 0;
		}else if(n<10){
			return 0.1;
		}else if(n<20){
			return 0.9;
		}else if(n<45){
			return 0.95;
		}else if(n<70){
			return 1;
		}else if(n<80){
			return 1.05;
		}else if(n<90){
			return 1.1;
		}else if(n<97){
			return 1.15;
		}
		return 1.2;
	}

}