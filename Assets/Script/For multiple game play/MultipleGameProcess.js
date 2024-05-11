#pragma strict

var personUI : UI.Button;
var icon : Sprite;

function Start () {
	// testing function
	//var skillSelectBtn : GameObject = GameObject.Find("Canvas/skillSelection/skill01");
	//skillSelectBtn.SendMessage("setUpThisSkill",new roundAttack(new person()));
	//		Debug.Log(Resources.Load("Prefabs/Group 1/add"));


	personShowStone = GameObject.Instantiate(Resources.Load("Prefabs/personShowStone") as GameObject);
	
	canvasSkill = GameObject.Find("Canvas/skill").GetComponent("Animator") as Component;
	canvasSkill.enabled = false;
	
	//personUI = GameObject.Find("Canvas/Icon") as UI.Button;
	//icon = Resources.Load.<Sprite>("iconcircle/move");// as Sprite;
	//print(icon.rect);
	//WaitForSeconds(0);
	personUI.image.overrideSprite = icon;
	
	//gameProcess(8,13);
	insertStage(new stage01());//Final());
	insertTeam(new team01());
	gameStart();
	
}

function Update () {
	//winLose();
}

var canvasSkill :Animator; // control the skill button Animator

static var stageValue : stageSample; // the variable to record the value of this stage
static var myTeam : teamSample;

var playlist :List.<int> = new List.<int>(); // mark down the list of action of character
var ps :List.<person> = new List.<person>(); // record 8 character

var bd :board; // create board variable
public var plane :GameObject; // collect gameObejct plane which used to be plane

var speed:int[]; // record the character speed
var round :int=0;

var haveWalk:boolean=false; // have you already walk in this round ?
var skillUsed:boolean=false; // have you already use this skill in  this round
var startWalk : boolean = false; // are you walking ?
var startSkill : boolean = false; // are you using skill ?

var cal:Calculating; // the calculating object

var usingSkill:skill; // the skill which used in this turn
var skillTarget:List.<person> = new List.<person>(); // the target list because it will be having chances that you have more than one target
var skillStage : int = 0; // when you using skill, there have a lot of stage.
var skillOf_createNewCharacter : boolean = false;

var personShowStone : GameObject;

var infoShow : boolean = false;
var btnSkillShow: boolean = false;
var SkillSelectionShow: boolean = false;
var SkillInfoShow: boolean = false;
var EndTurnBtnShow: boolean = true;

var EndTurnBtn : GameObject;

var followPersonShow : followingRoundDisplay;

var win:boolean =false;
var lose:boolean=false; 

function winLose(){
	var enemyCount:int=0;
	var playerCount:int=0;
	for(var i:int=0;i<ps.Count;i++){
		if(!ps[i].dead)
			if(ps[i].team==1){
				playerCount++;
			}
			else if(ps[i].team==2){
				enemyCount++;
			}
	}
	if(playerCount<=0){
		lose=true;
		Debug.Log("Lose");
	}
	else if(enemyCount<=0){
	 win=true;
	 Debug.Log("Win");
	}
	else{
		win=false;
		lose=false;
	}
}


function insertStage(stage:stageSample){ // insert the stage
	if(GameObject.Find("teamController") != null){
		var tool:GameObject = GameObject.Find("teamController");
		var stageNum : int = tool.GetComponent.<TeamControllerInMenu>().goingStage;
		Debug.Log("stageNum "+stageNum);
		stageValue = stageList.getStage(stageNum);
	}
	else{
		stageValue = stage;
	}
}

function insertTeam(myTeam : teamSample){
	if(GameObject.Find("teamController") != null){
		var tool:GameObject = GameObject.Find("teamController");
		//print(tool.GetComponent.<TeamControllerInMenu>().team.teamStore[1]);
		this.myTeam = tool.GetComponent.<TeamControllerInMenu>().team;
		this.myTeam.pickUpTeam();
		this.myTeam.setUpLocation();
		this.myTeam.setUpTeam();
	}
	else 
		this.myTeam = myTeam;
}
function gameStart(){
	bd=new board(stageValue.boardSizeX,stageValue.boardSizeY);
	firstSetting();
}

public function firstSetting(){ // do every setting with the first time
	var lx:int = this.transform.position.x;
	var ly:int = this.transform.position.y;

	for(var i:int=0;i<stageValue.boardSizeY;i++){
		for(var j:int=0;j<stageValue.boardSizeX;j++){
			var newplane : plane = (GameObject.Instantiate(plane, new Vector3(i,-1, j), Quaternion.Euler(new Vector3(0,0,0)))).GetComponent.<plane>();
			newplane.transform.position = this.transform.position + Vector3(i,-1,j);
			newplane.transform.parent = this.transform;
			newplane.setUp(j,i);		
			//board[j,i] =-1;
			bd.getBox(j,i).insertPlane(newplane);
			bd.getBox(j,i).clearThisSquare();
		}
	}
	stageSetting();
	TeamSetting();
	for(i=0;i<ps.Count;i++){
		characterStartSetting(i);
	}
	
	speed=new int[ps.Count()];
	renderList();

	followPersonShow = GameObject.Find("followingRounds2").GetComponent.<followingRoundDisplay>();
	followPersonShow.SendMessage("setPsList",ps);	
	followPersonShow.SendMessage("followingRoundAnimationController",true);	
	
	if(ps[playlist[0]].getIsPlayer() == false){
	// write down
		// the coding
			// which process
				// the AI script
	
		ps[playlist[0]].AI.setEnemyAndFd(ps);
		ps[playlist[0]].AI.FSMFixedUpdate(bd);

	}
	
	showPerson();
}
function stageSetting(){
	if(stageValue.haveFire){
		for(var i:int=0;i<stageValue.fire.length;i++){
			bd.setFire(stageValue.fire[i].x, stageValue.fire[i].y);
		}
	}
	if(stageValue.haveIce){
		for(i=0;i<stageValue.ice.length;i++){
			bd.setIce(stageValue.ice[i].x, stageValue.ice[i].y);
		}
	}
	if(stageValue.haveStone){
		for(i=0;i<stageValue.stone.length;i++){
			bd.setStone(stageValue.stone[i].x, stageValue.stone[i].y);
		}
	}
	if(stageValue.haveTree){
		for(i=0;i<stageValue.tree.length;i++){
			bd.setLifeTree(stageValue.tree[i].x, stageValue.tree[i].y);
		}
	}
	if(stageValue.haveSpawnPoint){
		for(i=0;i<stageValue.spawnPoint.length;i++){
			bd.setSpawnPoint(stageValue.spawnPoint[i].x, stageValue.spawnPoint[i].y);
		}
	}
	if(stageValue.haveLight){
		for(i=0;i<stageValue.light.length;i++)
			bd.setLight(stageValue.light[i].x, stageValue.light[i].y);
	}
}

function TeamSetting(){
	
	for(var i:int=0;i<myTeam.teammate.length;i++){
		ps.Add(myTeam.teammate[i]);
		//ps[i].setID(ps.Count-1);
		//setLocation(ps[i],ps[i].getLocationX(),ps[i].getLocationY());
		//ps[i].getModel().transform.Rotate(0,90,0);
	}
	for(i=0;i<stageValue.enemy.length;i++){
		ps.Add(stageValue.enemy[i]);
		if(ps[ps.Count-1].getIsPlayer() == false){
			ps[ps.Count-1].AI.insertStatus(ps[ps.Count-1]);
		}
	}
}


function setBossLocation(pr:person, x:int,y:int){
	for(var i:int=x-1;i<=x+1;i++)
		for(var j:int=y-1;j<=y+1;j++)
			bd.getBox(i, j).standIn(pr.getId());
}

function inStanceCharacter(pr:person){
	pr.model = GameObject.Instantiate(pr.getModel(),bd.getBox(pr.getLocationX(),pr.getLocationY()).thisPlane.transform.position, Quaternion.Euler(new Vector3()));
	if(pr.team == 1){
		pr.model.transform.Rotate(0,90,0);
	}
	else if(pr.team == 2){
		pr.model.transform.Rotate(0,-90,0);
	}
}

function characterStartSetting(personNum:int){
	var pr : person = ps[personNum];
	inStanceCharacter(pr);
		
	// set the character ID equal to the num of the (int list)ps
	pr.setID(personNum);
	if(pr.boss)
		setBossLocation(pr,pr.getLocationX(),pr.getLocationY());
	else
		setLocation(pr,pr.getLocationX(),pr.getLocationY());
	pr.deathRound=1000;
}

public function renderList(){ // render out the list of action
	if(round == 0){
		for(var i:int=0;i<speed.length;i++){
				speed[i]=ps[i].getSp();
		}
	}
	playlist = new List.<int>();
	//print(playlist.Count());
	do{
		for(var j:int=0;j<speed.length;j++){
				speed[j]--;
		}
		var ZeroPerson:List.<int> = new List.<int>();
		for(j=0;j<speed.length;j++){
			if(speed[j]==0){
				ZeroPerson.Add(j);
			}
		}
		var max : int = ZeroPerson.Count();
		for(j=0;j<max;j++){
			var num:int;
			num = Random.Range(0,ZeroPerson.Count());
			playlist.Add(ZeroPerson[num]);
			speed[ZeroPerson[num]] += ps[ZeroPerson[num]].getSp();
			ZeroPerson.RemoveAt(num);
			//print("ch"+(playlist.Count()-1)+" : "+playlist[(playlist.Count()-1)]);
		}
	}while(playlist.Count() < 300);
}

// render out the list of action when the number of character is increasing
public function reRenderList(){//number:int){ // number is the number of charcter increased
	// reset your speed
	speed = new int[ps.Count];
	for(var i:int=0;i<speed.length;i++){
		speed[i]=ps[i].getSp();
	}
	playlist = new List.<int>();
					Debug.Log(speed.length);
	//print(playlist.Count());
	Debug.Log(speed.Length);
	do{
		for(var j:int=0;j<speed.length;j++){
			if(playlist.Count >= ps[j].getBornRound()){
				if(round<ps[j].deathRound)
					speed[j]--;
			}
		}
		var ZeroPerson:List.<int> = new List.<int>();
		for(j=0;j<speed.length;j++){
			if(playlist.Count >= ps[j].getBornRound()){
				if(speed[j]==0){
					ZeroPerson.Add(j);
				}
			}
		}
		var max : int = ZeroPerson.Count();
		for(j=0;j<max;j++){
			var num:int;
			num = Random.Range(0,ZeroPerson.Count());
			playlist.Add(ZeroPerson[num]);
			speed[ZeroPerson[num]] += ps[ZeroPerson[num]].getSp();
			ZeroPerson.RemoveAt(num);
			//print("ch"+(playlist.Count()-1)+" : "+playlist[(playlist.Count()-1)]);
		}
	}while(playlist.Count() < 300);
}

function showPerson(){ // show to the user that easy understand who is the current character
	
	//charName.text="寵"+ps[playlist[round]].getId().ToString();
	personShowStone.transform.position = ps[playlist[round]].model.transform.position+ Vector3(0,3,0);
	showWalk();
	canvasSkill.enabled = true;
	
	ps[playlist[round]].ourAnimationPlay(0); // play animation
	
	if(ps[playlist[round]].icon != null){
		//var image:UI.Image = GameObject.Find("Canvas/Icon").GetComponent("Image"); 
		//image.sprite = ps[playlist[round]].getIcon();
		icon = ps[playlist[round]].getIcon();
		personUI.image.overrideSprite = icon;
	}
	
	// if is player to control 
	if(ps[playlist[round]].getIsPlayer()){
		var skillAnim:Animator = GameObject.Find("Canvas/skill").GetComponent("Animator") as Component;
		btnSkillShow = true;
		skillAnim.SetBool("skillShow",btnSkillShow);
	}
	
	// send the next six person to show on the UI
	var aryTool : int[] = new int[6];
	for(var i:int=round+1;i<round+aryTool.length+1;i++){
		aryTool[i-round-1]=playlist[i];
	}
	followPersonShow.SendMessage("changeIcon",aryTool);
}

public function askAction(ans:int){ // ask play the action of walk ? skills? know the info? or wait?
	var guy: person = ps[playlist[round]];
		if(ans == 1){
			if(haveWalk==false){
				showWalk();
				//print("walk");
			}
			else{
				print("You have already done this part");
			}
		}else if(ans == 2){
			if(skillUsed == false){
				//skillUsed=useSkill();
			}
			else{
				print("You have already done this part");
			}
		}else if(ans == 3){
			//askInfo();
		}
}

public function showWalk(){ //show the area that which you can go to // walk method
	resetSelectPlane();
	cal =new Calculating(bd);
	var pr:person = ps[playlist[round]];
	var x:int=pr.getLocationX();
	var y:int=pr.getLocationY();

	cal.treeRecursive(x,y,pr.getSt());
	//var OKList:List.<plane> =/*cal.getOKList()*/cal.FindHighlight(bd.getBox(x,y).thisPlane,pr.getSt());;
	var OKList : List.<plane> = cal.getOKList();

	//var OKList : List.<mySet> = cal.FindHighlight2(x,y,pr.getSt());
	var OK:boolean = false;
	var y2:int;
	var x2:int;
	/*
	print("hi "+bd.getBox(7,5).thisPlane.canSelect);
	bd.getBox(7,5).thisPlane.setcanSelect(true);
	print("hi "+bd.getBox(7,5).thisPlane.canSelect);
	*/
	startWalk=true;
	for(var t:plane in OKList){
		t.setcanSelect(true);
	}
}
function walk2(pln:plane){ // walk to the location this you choose after click the plane
	
	var pr:person = ps[playlist[round]];
	var mytarget : plane = pln;
	var tomiddleofplane:Vector3=Vector3.zero;//new Vector3(0,pr.model.transform.localScale.y/2,0);
	var now:plane=bd.getBox(pr.getLocationX(),pr.getLocationY()).thisPlane;

	//if(startWalk==true){
		resetSelectPlane();
		//print(pr.getLocationX()+","+pr.getLocationY());
		//var OKList:mySet[] = cal.go(pr.getLocationX(),pr.getLocationY(),x,y);
		var OKList:mySet[] = cal.go(pr.getLocationX(),pr.getLocationY(),mytarget.posX,mytarget.posY);
		for(var i:int=0;i<OKList.length;i++){
			pr.toPlace.Add(bd.getBox(OKList[i].x,OKList[i].y).thisPlane);
		}
		/*for(var go:plane in PathFinder.FindPath(now,mytarget).listOfPlanes){
			pr.toPlace.Add(go);
		}*/
		//print("first one "+pr.model.transform.position);
		var targetPos:Vector3=mytarget.transform.position;
		
		var sth : int = 0;
		
		while(pr.model.transform.position!=targetPos+tomiddleofplane){
		//	pr.transform.position=Vector3.Lerp(pr.transform.position,pr.toPlace[0].transform.position+Vector3(0,person.transform.localScale.y/2,0), Time.deltaTime);
			pr.ourAnimationPlay(1);
			pr.model.transform.position = Vector3.MoveTowards(pr.model.transform.position, pr.toPlace[0].transform.position+tomiddleofplane, 5*Time.deltaTime);
			
			personShowStone.transform.position=Vector3.MoveTowards(personShowStone.transform.position, pr.toPlace[0].transform.position+new Vector3(0,3,0), 5*Time.deltaTime);
			if(pr.model.transform.position==pr.toPlace[0].transform.position+tomiddleofplane){
				pr.toPlace.RemoveAt(0);
				
				if(pr.toPlace.Count >0){
					var rotationPos = (pr.toPlace[0].transform.position+tomiddleofplane) - pr.model.transform.position;
					//rotationPos.y =0;// pr.model.transform.position.y;
					var rotation = Quaternion.LookRotation(rotationPos);
					//rotation.z = 0;
					pr.model.transform.rotation = rotation;

				}
			}
			yield WaitForSeconds(0);
			//print(pr.model.transform.position);
		}
		
		pr.ourAnimationPlay(0);
	setLocation(pr,mytarget.posX,mytarget.posY,pr.getLocationX(),pr.getLocationY());
	mytarget=null;
	//updateTurn();  // will go to other place
	startWalk=false;
	//skillUsed=false;
	cal = new Calculating(bd);
	haveWalk=true;
	//endTurnProcess();
	
	
	// write down
		// the coding
			// which process
				// the AI script
	if(pr.getIsPlayer()==false){
		pr.AI.setEnemyAndFd(ps);
		pr.AI.FSMFixedUpdate(bd);
	}
}

function resetSelectPlane(){ // let all plane return to the normal state and color
	for(var j:int=0;j<stageValue.boardSizeY;j++){
		for(var i:int=0;i<stageValue.boardSizeX;i++){
			//if(bd.getBox(i,j).thisPlane.canSelect == true){
				bd.getBox(i,j).thisPlane.setcanSelect(false);
			//}
		}
	}
}

public function setLocation(pr:person, x:int, y:int){ // set up character location
	//board[x,y] = pr.getId();
	bd.getBox(x, y).standIn(pr.getId());
	bd.getBox(x, y).thisPlane.canStand=false;
	pr.setLocation(x, y);
}
public function setLocation(pr:person, x:int, y:int, x2:int, y2:int){ // change the character location
	//board[x,y] = pr.getId();
	//board[x2,y2]=-1;
	bd.getBox(x2, y2).leaveIt();
	bd.getBox(x, y).standIn(pr.getId());
	bd.getBox(x, y).thisPlane.canStand=false;
	pr.setLocation(x, y);
}

public function useSkill01(whichSkill:int){ // first
	if(skillUsed ==false){
		var pr:person = ps[playlist[round]];
		
		var bs:skill = pr.haveWhatSkill(whichSkill);
		
		//var x:int=pr.getLocationX();
		//var y:int=pr.getLocationY();
		usingSkill=bs;
		startSkill = true;
		print("I am Skill");
		useSkill2();
	}
}

public function useSkill01(thisSkill:skill){
	if(skillUsed ==false){
		var pr:person = ps[playlist[round]];
		
		var bs:skill = thisSkill;

		usingSkill=bs;
		bs.setUser(pr);
		startSkill = true;
		print("I am Skill now");
		useSkill2();
	}
}

public function useSkill2(){
	Debug.Log("skillStage : " +skillStage);
	var bs: skill = usingSkill;
	var pr:person =ps[playlist[round]];
	if(skillStage == 0){	// Skill Stage 0 = just start using skill
		if(bs.placeChoose==true){
			skPlaceChoose();
		}
		else{
			skillStage=2;
		}
	}
	// Skill Stage 1 = After player choose a place and ask about is it need to reScan ?
	if(skillStage == 1){	
		if(bs.isRepeatedlyScan==true){
			var OKBoard:boolean[,]= getSkillOKBoard2(bs,bs.secondToZ);
			OKBoard[pr.getLocationX(),pr.getLocationY()] = false;
		}
		skillStage=2;
	}
	if(skillStage == 2){	// Skill Stage 2 = the stage to find the target
		if(bs.needChoose==true){
			if(skillTarget.Count() < bs.targetNumber){
				skTargetChoose();
			}else{
				skillStage=3;
				
				useSkill2();
			}
		}
		else{
			print("I not to choose");
			if(OKBoard == null){
				OKBoard = getSkillOKBoard(bs,pr,bs.ToZ);
			}
			if(bs.needScan==true){
				skillTarget = bs.scan(OKBoard,bd,ps);
				for(var i:int=0;i<skillTarget.Count();i++){
					// means this character is already been selected to be a target
					skillTarget[i].isSelectedBy = true;
				}
			}
			skillStage = 3;
			useSkill2();
		}
	}
	// skill Stage 3 = the process that to check the target that do you have choose the right target.
	else if(skillStage == 3){	
		var isRightPerson:boolean = true;
		if(pr.mustTarget>-1 && bs.needHurtCal==true){
			for(i=0;i<skillTarget.Count();i++){				
				if(skillTarget[i].getId()==pr.mustTarget){
					isRightPerson=true;
					print("right guy");
					break;
				}
				isRightPerson=false;
			}
			if(isRightPerson == false){
				print("You must attack "+ ps[pr.mustTarget].getName());
				skillTarget = new List.<person>();
				skillStage = 2;
				useSkill2();
			}
			else{
				skillStage = 4;
				useSkill2();
			}
		}
		else{
			skillStage = 4;
			useSkill2();
		}
	}
	else if(skillStage==4){	
		// SKill Stage 4 = the stage which start to do everything related with the content of the skill such as hurt somebody or start the function
		// if this skill need to continue to search more target after the first round of choosing target
		// this operation will start
		var targetNum:int =0;
		if(bs.isContinuousSearchingTarget==true){
			do{
				var targetNum2:int=skillTarget.Count();
				for(i=targetNum;i<targetNum2;i++){
					OKBoard = getSkillOKBoard(bs,skillTarget[i],bs.continueToZ); // return the OKBoard of skill to the method 
					var newTarget:person[] = bs.scan2(OKBoard,bd,ps);
					for(var j:int=0;j<newTarget.length;j++){
						Debug.Log("get add"+ newTarget[j].getName() + newTarget[j].isSelectedBy);
						if(newTarget[j].isSelectedBy == false){
							skillTarget.Add(newTarget[j]);
							skillTarget[skillTarget.Count()-1].isSelectedBy = true;
							
						}
					}
				}
				targetNum=targetNum2;
			}while(targetNum != skillTarget.Count());	
		}
	
		// this operation is to do the calculating of hurt the target
		if(bs.needHurtCal==true){
			for(j=0;j<skillTarget.Count();j++){
				//person target2=bs.setTarget(ps.get(board[x2,y2]));
				var target2:person=bs.setTarget(skillTarget[j]);
				
				var tomiddleofplane:Vector3=Vector3.zero;
				var rotationPos = (target2.model.transform.position+tomiddleofplane) - pr.model.transform.position;
				//rotationPos.y =0;// pr.model.transform.position.y;
				var rotation = Quaternion.LookRotation(rotationPos);
				//rotation.z = 0;
				pr.model.transform.rotation = rotation;
					
				for(i=0;i<bs.runTimes;i++){
					bs.action();
					print("Have hurt calculating ! ");
					if(target2.team == pr.team){
						if(bs.attackTeamate == true){
							var hurt : int=1;
							if(bs.isHeal == false){
								if(bs.damage() > 1){
									hurt = bs.damage();
								}
							}else{
								hurt = bs.damage();
							}
							target2.getHurt(hurt);
						}
					}else{
						if(bs.attackEmery == true){
							hurt =1;
							if(bs.isHeal == false){
								if(bs.damage() > 1){
									hurt = bs.damage();
								}
							}else{
								hurt = bs.damage();
							}
							target2.getHurt(hurt);
						}
					}
					
				}
			}
		}
		
		// this operation will start when this skill has some special function 
		if(bs.haveFunction==true){
			if(bs.needChoose == true){
				for(j=0;j<skillTarget.Count();j++){
					bs.setTarget(skillTarget[j]);
					
					tomiddleofplane =Vector3.zero;
					rotationPos = (skillTarget[j].model.transform.position+tomiddleofplane) - pr.model.transform.position;
					//rotationPos.y =0;// pr.model.transform.position.y;
					rotation = Quaternion.LookRotation(rotationPos);
					//rotation.z = 0;
					pr.model.transform.rotation = rotation;
					
					bs.functions();
					print("haveFunction");
					//if this skill has a knock back function, start this operation
					if(bs.knockBackFunction>0){
						knockBack(bs.knockBackDirection,bs.knockBackFunction,bs.de);
					}
					if(bs.isPlaceChange==true){
						Debug.Log("before de position : " + bs.de.model.transform.position);
						bs.de.model.transform.position = bd.getBox(bs.targetX,bs.targetY).thisPlane.transform.position;
						Debug.Log("after de position : " + bs.de.model.transform.position);
						setLocation(bs.de,bs.targetX,bs.targetY,bs.de.getLocationX(),bs.de.getLocationY());
					}
					if(bs.roundOfDelay != 0){
						var thisTargetRound:int=0;
						for(var k:int=round;k<playlist.Count();k++){
							if(ps[playlist[k]].getId()==skillTarget[j].getId()){
								thisTargetRound = k;
								break;
							}
						}
						if(bs.roundOfDelay > 0){
							for(i=0;i<bs.roundOfDelay;i++){
								listSwap(i+thisTargetRound,i+thisTargetRound+1);
							}
						}
						else if(bs.roundOfDelay < 0){
							if(round-thisTargetRound < bs.roundOfDelay){
								for( i=0;i>bs.roundOfDelay;i--){
									listSwap(i+thisTargetRound,i+thisTargetRound-1);
								}
							}
						}
					}
				}
			}else{
				if(bs.havingParticle == true){
					bs.functions();
				}
			}
			if(bs.buildObject>-1){
				switch (bs.buildObject){
				case 1	:	break;
				case 2	:	bd.setFire(bs.targetX, bs.targetY);
							break;
				case 3	:	bd.setIce(bs.targetX, bs.targetY);
							break;
				case 4	:	bd.setLifeTree(bs.targetX, bs.targetY);
							//board[bs.targetX,bs.targetY] = -4;
							break;
				}
			}
			if(bs.spawnCharacter>-1){
			//spawn character
				// get the value of the new character
				var newPerson : person = characterList.getCharacter(bs.spawnCharacter);
				// insert the new character to the list
				ps.Add(newPerson);
				// set up its location
				setLocation(ps[ps.Count-1], bs.targetX, bs.targetY);
				// set up its team as same as its caller
				ps[ps.Count-1].setTeam(bs.at.getTeam());
				// instance model, set ID, set up location again
				characterStartSetting(ps.Count-1);
				// set up born round for calculating the playlist
				ps[ps.Count-1].setBornRound(round+1);
				// set is it having AI or controlled by player
				ps[ps.Count-1].setIsPlayer(bs.spawnPlayerControl);
				if(bs.spawnPlayerControl == false){
					ps[ps.Count-1].getAI().insertStatus(ps[ps.Count-1]);
				}
				var new_one : GameObject = ps[ps.Count-1].getModel();
				var cloud:GameObject = GameObject.Instantiate(Resources.Load("Prefabs/Group 1/Buildtree"), new_one.transform.position, new_one.transform.rotation);
				GameObject.Destroy( cloud, 2);
				
				// reRender the playlist again
				skillOf_createNewCharacter = true; 
			}
			if(bs.isPlaceChange==true && bs.needChoose == false){
				//bs.functions();
				//Debug.Log("before de position : " + bs.de.model.transform.position);
				bs.de.model.transform.position = bd.getBox(bs.targetX,bs.targetY).thisPlane.transform.position;
				//Debug.Log("after de position : " + bs.de.model.transform.position);
				setLocation(bs.de,bs.targetX,bs.targetY,bs.de.getLocationX(),bs.de.getLocationY());
			}
		}
		skillFinish();
		if(findDie()){
			for(i=0;i<ps.Count();i++){
				if(checkDie(i)){
					skipDie(i,round);
				}
			}
		}
		//if(guy.getIsPlayer() == false){
		// write down
			// the coding
				// which process
					// the AI script
		if(pr.getIsPlayer()==false){
			pr.AI.setEnemyAndFd(ps);
			pr.AI.FSMFixedUpdate(bd);
		}
	}
}

public function skPlaceChoose(){ // something skill need to be let the user select the location before select the target
	var pr:person = ps[playlist[round]];
	var bs: skill = usingSkill;
	// return the OKBoard of skill to the method 
	var OKBoard:boolean[,]  = getSkillOKBoard(bs,pr,bs.ToZ); 
	if(bs.allowMyself == true){
		OKBoard[pr.getLocationX(),pr.getLocationY()] = true; // set the user is false because the skill to affect others don't choose his own self
	}
	else{
		OKBoard[pr.getLocationX(),pr.getLocationY()] = false; 
	}
	showBoard(OKBoard);
}

public function showBoard(OKBoard:boolean[,]){ // show out the plane which can select
	for(var i:int=0;i<OKBoard.GetLength(0);i++){
		for(var j:int=0;j<OKBoard.GetLength(1);j++){
			if(OKBoard[i,j] == true){
				bd.getBox(i,j).thisPlane.setcanSelect(true);
			}
		}
	}
}

// this function help to record the target
public function skAddTarget(tar:person){
	//print("Now in add target");
	if(tar.protector == -1){
		skillTarget.Add(tar);
	}
	else{
		//print(ps[board[x2,y2]].protector);
		skillTarget.Add(ps[tar.protector]);
		tar.checkProtect();
	}
	// means this character is already been selected to be a target
	skillTarget[skillTarget.Count()-1].isSelectedBy = true;
	
	useSkill2();
}

// this function help to record the target
public function skAddTarget(thisPersonID:int){
	var tar:person = ps[thisPersonID];
	//print("Now in add target");
	if(tar.protector == -1){
		skillTarget.Add(tar);
	}
	else{
		//print(ps[board[x2,y2]].protector);
		skillTarget.Add(ps[tar.protector]);
		tar.checkProtect();
	}
	// means this character is already been selected to be a target
	skillTarget[skillTarget.Count()-1].isSelectedBy = true;
	useSkill2();
}

// each skill will have its own range, it is the method to calll the function to calculate the area
public function getSkillOKBoard( bs:skill, target:person, type:int):boolean[,]{
	//print("function get Skill OKBoard");
	var cal:Calculating =new Calculating(bd);
	var x:int=target.getLocationX();
	var y:int=target.getLocationY();
	if(type==0){
		cal.treeRecursive2(x,y,bs.skillRange);
	}
	else if(type==1){
		cal.cross1(x, y, bs.skillRange);
	}
	else if(type==2){
		cal.cross2(x, y, bs.skillRange, true, 0);
	}
	else if(type==3){
		cal.circle(x,y,bs.skillRange);
	}
	else if(type==4){
		cal.aroundPeople(x,y,bs.skillRange);
	}
	return cal.getOKBoard();
}

// some skills have to scan once again after letting the user to select a place
public function getSkillOKBoard2(bs:skill, type:int):boolean[,]{ 
	var cal:Calculating =new Calculating(bd);
	var x:int=bs.targetX;
	var y:int=bs.targetY;
	if(type==0){
		cal.treeRecursive2(x,y,bs.skillRange);
	}
	else if(type==1){
		cal.cross1(x, y, bs.skillRange);
	}
	else if(type==2){
		cal.cross2(x, y, bs.skillRange, true, 0);
	}
	else if(type==3){
		cal.circle(x,y,bs.skillRange);
	}
	else if(type==4){
		cal.aroundPeople(x,y,bs.skillRange);
	}
	return cal.getOKBoard();
}

// some skills have knockBack function
public function knockBack(direction:int, range:int, target:person ){ 
	var x:int=target.getLocationX();
	var y:int=target.getLocationY();
	var x2:int=x;
	var y2:int=y;
	var stop:boolean=false;
	switch (direction){
		case 0 :	//y2-=range;
					for(var i:int=1;i<=range;i++){
						if(bd.getBox(x,y-i).CanMeStand() == false){
							stop=true;
							break;
						}
						y2--;
					}
					print("y2 " +y2);
					break;
		case 1 :	//x2+=range;
					for( i=1;i<=range;i++){
						if(bd.getBox(x+i,y).CanMeStand() == false){
							stop=true;
							break;
						}
						x2++;
					}
					print("x2 " +x2);
					break;
		case 2 :	//y2+=range;
					for( i=1;i<=range;i++){
						if(bd.getBox(x,y+i).CanMeStand() == false){
							stop=true;
							break;
						}
						y2++;
					}
					print("y2 " +y2);
					break;
		case 3 :	//x2-=range;
					for( i=1;i<=range;i++){
						if(bd.getBox(x-i,y).CanMeStand() == false){
							stop=true;
							break;
						}
						x2--;
					}
					print("x2 " +x2);
					break;
	}
	var tomiddleofplane:Vector3=new Vector3(0,0,0);
	var targetPos:Vector3=bd.getBox(x2,y2).thisPlane.transform.position;
	while(target.model.transform.position!=targetPos+tomiddleofplane){
		target.model.transform.position = Vector3.MoveTowards(target.model.transform.position, bd.getBox(x2,y2).thisPlane.transform.position+tomiddleofplane, 5*Time.deltaTime);
		yield WaitForSeconds(0);
	}
	setLocation(target,x2,y2,x,y);
	
	if(stop != true){	
		
	}
	else{
		print("can't knock back");
	}
}

// some skills will let somebody can have action early or later
public function listSwap( first:int, second:int){ 
	var tool:int = playlist[first];
	playlist[first]=playlist[second];
	playlist[second]=tool;
}

// some skills need to choose a target and this function is doing this part : calculate the area and show it out
public function skTargetChoose(){
	skillStage = 2;
	var pr:person = ps[playlist[round]];
	print("player ? "+pr.getIsPlayer());
	
	if(pr.getIsPlayer() == true){
		
		var bs: skill = usingSkill;
		var OKBoard:boolean[,]  = getSkillOKBoard(usingSkill,pr,bs.ToZ); 
		if(usingSkill.allowMyself == true){
			OKBoard[pr.getLocationX(),pr.getLocationY()] = true; // set the user is false because the skill to affect others don't choose his own self
		}
		else{
			OKBoard[pr.getLocationX(),pr.getLocationY()] = false; 
		}
		for(var i:int=0;i<OKBoard.GetLength(0);i++){
			for(var j:int=0;j<OKBoard.GetLength(1);j++){
				if(bd.getBox(i, j).havePerson()==false){
					OKBoard[i,j] = false;
				}else{
					if(bs.chooseTeamate == false){
						if(ps[bd.getBox(i, j).ps].team == pr.team){
							OKBoard[i,j] = false;
						}
					}
				}
			}
		}
		showBoard(OKBoard);	
	}
	else{
		pr.AI.getTarget();
	}
}

// end turn function
public function endTurnProcess(){
	var guy:person = ps[playlist[round]];
	for(var id:int=0;id<ps.Count();id++){
		if(ps[id].getHp()> 0){
			bd.whatFunction(ps[id]);
			ps[id].endTurncheck();
			ps[id].ourAnimationPlay(0);	// animation play
		}
	}
	if(findDie()){
		for(var i:int=0;i<ps.Count();i++){
			if(checkDie(i)){
				skipDie(i,round);
			}
		}
	}
	if(guy.mustTarget != -1){
		guy.mustTarget = -1; // whatever you do , provocative is lost effect because your round is over
	}
	
	var skillAnim:Animator = GameObject.Find("Canvas/skill").GetComponent("Animator") as Component;
	btnSkillShow = false;
	skillAnim.SetBool("skillShow",btnSkillShow);
	
	if(SkillSelectionShow == true){
		destroySkillSelectBtn();
	}
	if(SkillInfoShow == true){
		destroySkillInfoBtn();
	}
	if(skillOf_createNewCharacter == true){
		reRenderList();
		skillOf_createNewCharacter = false;
		if(findDie()){
			for(i=0;i<ps.Count();i++){
				if(checkDie(i)){
					skipDie(i,round);
				}
			}
		}
	}
	if(EndTurnBtnShow == false){
		EndTurnBtn.active = true;
		EndTurnBtnShow = true;
	}
	
	haveWalk=false;
	skillUsed = false;
	skillTarget = new List.<person>();
	skillStage=0;
	cal = new Calculating(bd);
	
	guy.ourAnimationPlay(0);	// animation play
	
	round++;
	if(round > 300){
		for(var theCharacter:int=0; theCharacter<ps.Count; theCharacter++){
			ps[theCharacter].setBornRound(0);
		}
		renderList();
		round=0;
	}
	startSkill=false;
	startWalk=false;
	showPerson();
	if(infoShow==true){
		//setInfoContent(ps[playlist[round]]);
		setAllInfoContent();
	}
	
	guy = ps[playlist[round]]; // record the new character which can have action in this turn
	//	print(guy.getIsPlayer());
	if(guy.getIsPlayer() == false){
	// write down
		// the coding
			// which process
				// the AI script
		print("AI");
		
		//setUpSkillSelection();
		if(EndTurnBtnShow == true){
			EndTurnBtn.active = false;
			EndTurnBtnShow = false;
		}
		
		guy.AI.setEnemyAndFd(ps);
		guy.AI.FSMFixedUpdate(bd);

	}
	
	
	//ps[playlist[round]].isMe();
	//cal = new Calculating(bd);
	//askAction(1);
		
}

public function findDie():boolean{ // check anyone die
	var dead:boolean = false;
	for(var i:int=0;i<ps.Count();i++){
		if(ps[i].deadOrNot() == false){
			if(ps[i].getDeathRound() > round){
				if(ps[i].getHp() <= 0){
					dead = true;
				}
			}
		}
	}
	return dead;
}
public function checkDie(i:int):boolean{ // check anyone die
	if(ps[i].deadOrNot() == false){
		if(ps[i].getHp() <= 0){
			return true;
		}
	}
	return false;
}
public function skipDie(id:int,round:int){ // delete the person who have already died in the list
	var listSize:int = playlist.Count();
	for(var i:int=listSize-1;i>round;i--){
		if(ps[playlist[i]].getId()==id){
			playlist.RemoveAt(i);
		}
	}
	print(ps[id].getName()+" is dead");
	bd.getBox(ps[id].getLocationX(),ps[id].getLocationY()).leaveIt();	
	ps[id].setDeathRound(round);
	ps[id].youDie();
	
	winLose();
}
//public var hp:UI.Text;//UI.Text;
public function PopInInfo(){	
	followPersonShow = GameObject.Find("followingRounds2").GetComponent.<followingRoundDisplay>();
	followPersonShow.SendMessage("followingRoundAnimationController",infoShow);	
	
	//hp.text = "hihi";//pr.getHp().ToString + "/" + pr.fullHp;
	var infoAnim:Animator = GameObject.Find("Canvas/info").GetComponent("Animator") as Component;
	infoShow = !infoShow;
	infoAnim.SetBool("infoShow",infoShow);
	
	setAllInfoContent();
	resetSelectPlane();
}

public function setAllInfoContent(){
	var pr : person = ps[playlist[round]];
	setInfoContent(pr);
	setUpSkillInfomation();
	setUpHpValuePage();
}

public function setInfoContent(pr:person){

	var infoIcon: UI.Image = GameObject.Find("Canvas/info/icon").GetComponent.<UI.Image>();	// icon in info
	infoIcon.overrideSprite = ps[playlist[round]].getIcon();
	var hp: UI.Text = GameObject.Find("Canvas/info/personDetail/Hp/hpValue").GetComponent.<UI.Text>();//charName.text="寵"+ps[playlist[round]].getId().ToString();
	hp.text = pr.getHp()+"/"+pr.getFullHp();
	var pa: UI.Text = GameObject.Find("Canvas/info/personDetail/hurt/pa value").GetComponent.<UI.Text>();//charName.text="寵"+ps[playlist[round]].getId().ToString();
	pa.text = pr.getPa().ToString();
	var pd: UI.Text = GameObject.Find("Canvas/info/personDetail/hurt/pd value").GetComponent.<UI.Text>();//charName.text="寵"+ps[playlist[round]].getId().ToString();
	pd.text = pr.getPd().ToString();
	var ma: UI.Text = GameObject.Find("Canvas/info/personDetail/hurt/ma value").GetComponent.<UI.Text>();//charName.text="寵"+ps[playlist[round]].getId().ToString();
	ma.text = pr.getMa().ToString();
	var md: UI.Text = GameObject.Find("Canvas/info/personDetail/hurt/md value").GetComponent.<UI.Text>();//charName.text="寵"+ps[playlist[round]].getId().ToString();
	md.text = pr.getMd().ToString();
}

public function setUpSkillSelection(){

	if(skillUsed == false){
		var skillSelectionAnim : Animator = GameObject.Find("Canvas/skillSelection").GetComponent("Animator") as Component;
		if(SkillSelectionShow == false){
			if(startSkill == true){
				skillStop();
			}
			
			startWalk = false;	// walk will not run with the skill together
			
			resetSelectPlane();
			SkillSelectionShow = true;
			var skillSelection : GameObject = GameObject.Find("Canvas/skillSelection");
			skillSelection.SendMessage("recieveCharacter",ps[playlist[round]]);
			
			skillSelectionAnim.SetBool("skillSelectionShow", true);
		
		}
		else{
			if(haveWalk==false){
				showWalk();
			}
			closeSkillSelectionPanel();
			
		}
	}
}

public function skillFinish(){
	if(SkillSelectionShow == true){
		destroySkillSelectBtn();
	}
	resetSelectPlane();
	skillUsed = true;
	startSkill=false;
	if(haveWalk==false){
		showWalk();
	}
	
	var skillAnim:Animator = GameObject.Find("Canvas/skill").GetComponent("Animator") as Component;
	btnSkillShow = false;
	skillAnim.SetBool("skillShow",btnSkillShow);
	
}

public function skillStop(){
	skillStage = 0;
	skillUsed = false;
	startSkill=false;
	resetSelectPlane();
}

public function destroySkillSelectBtn(){
	var skillSelection : GameObject = GameObject.Find("Canvas/skillSelection");
	skillSelection.SendMessage("resetToEmpty");
	SkillSelectionShow = false;
}

public function setUpSkillInfomation(){
	if(skillUsed == false){
		SkillInfoShow = true;
		var skillInfomation : GameObject = GameObject.Find("Canvas/info/skillDetail");
		skillInfomation.SendMessage("recieveCharacter",ps[playlist[round]]);
	}
}

public function destroySkillInfoBtn(){
	var skillInfomation : GameObject = GameObject.Find("Canvas/info/skillDetail");
	skillInfomation.SendMessage("resetToEmpty");
	SkillInfoShow = false;
}

public function setUpHpValuePage(){
	var hpPage:GameObject = GameObject.Find("Canvas/info/HpBarPage/Mask/HpPanel") as GameObject;
	//hpPage.SendMessage("resetToEmpty");
	hpPage.SendMessage("showOutTheFullHpList", ps);
}

public function deleteTeamController(){
	var TC : GameObject = GameObject.Find("teamController");
	if(TC != null){		
		TC.SendMessage("destroyMe");
	}
}
public function closeSkillSelectionPanel(){
	var skillSelectionAnim : Animator = GameObject.Find("Canvas/skillSelection").GetComponent("Animator") as Component;
	
	SkillSelectionShow = false;
	var skillSelection : GameObject = GameObject.Find("Canvas/skillSelection");
	skillSelection.SendMessage("resetToEmpty");
	skillSelectionAnim.SetBool("skillSelectionShow", false);
}

function zoom(){
 	GameObject.Find("Main Camera").GetComponent.<MainCameraController>().SendMessage("GetCP",ps[playlist[round]].getModel());
}


