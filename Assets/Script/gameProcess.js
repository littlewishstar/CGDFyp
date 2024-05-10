#pragma strict
import System.Collections.Generic;

//public class gameProcess{

var playlist :List.<int> = new List.<int>(); // mark down the list of action of character
var ps :List.<person> = new List.<person>(); // record 8 character
var board: int[,];// record the board

var BSizeX :int=8; // mark the board size X
var BSizeY :int=13; // mark the board size X
var bd :board;
//box box=new box();
//var bx :box[,];
var round :int=0;
var box:GameObject;
var startWalk : boolean = false;
var startSkill : boolean = false;

var skillStage : int = 0; 
// skill Stage : 
// 0 = not in skill,
// 1 = place choose,
// 2 = target choose,
// 
var usingSkill:skill;
var skillTarget:List.<person> = new List.<person>();

var cal:Calculating;
//var OKBoard:boolean[,];
var speed:int[]; 
	var haveWalk:boolean=false;
	var skillUsed:boolean=false;
	//var endTurn:boolean=false;
//svar cam : GameObject;

var personShowStone:GameObject;

public var charName : UI.Text;

public static var instance:gameProcess;

public function noBug(){

}

public function gameProcess(x:int,y:int){
	BSizeX=x;
	BSizeY=y;
	board = new int[BSizeX,BSizeY];
	
	bd=new board(x,y); // this is need
	
	firstSetting();
	/*setLocation(ps[2], 0, 2);
	setLocation(ps[3], 1, 2);
	testStage();*/
	
}
public function SampleDefault(){
	for(var i:int=0;i<ps.Count();i++){
		var x:int;
		var y:int;
		do{
			//Random rand = new Random();
			x=Random.Range(0,BSizeX);
			y=Random.Range(0,BSizeY);
		//}while(bx[x,y].CanMeStand());
		}while(!bd.getBox(x,y).CanMeStand());
		//}while(board[x,y] != -1);
		
		setLocation(ps[i],x,y);
	}
}

public function GameStage01(){
	bd.setFire(2, 5);
	bd.setIce(6, 6);
	bd.setStone(1, 1);
	board[1,1]=-2;
	bd.setStone(1, 11);
	board[1,11]=-2;
	bd.setStone(6, 11);
	board[6,11]=-2;
	bd.setStone(6, 1);
	board[6,1]=-2;
}
public function testStage(){
	setLocation(ps[4], 2, 1);
	setLocation(ps[5], 3, 2);
}
function insertCharacter(){

	/*ps.Add(new person().insertDetail(0,"A1",5,60,2300,3,650,390,0,90,0));
	ps.Add(new person().insertDetail(1,"A2",5,65,2300,3,650,390,0,90,0));
	ps.Add(new person().insertDetail(2,"B1",5,80,1000,4,1000,150,50,300,1));
	ps.Add(new person().insertDetail(3,"B2",5,75,1000,4,1000,150,50,300,1));
	ps.Add(new person().insertDetail(4,"C1",5,40,1400,2,100,200,1000,460,2));
	ps.Add(new person().insertDetail(5,"C2",5,45,1400,2,100,200,1000,460,2));
	ps.Add(new person().insertDetail(6,"D1",5,50,1800,2,100,250,800,350,3));
	ps.Add(new person().insertDetail(7,"D2",5,45,1800,2,100,250,800,350,3));*/
		
	var mywar : person = (GameObject.Instantiate( GameObject.Find("CD1"),bd.getBox(4,2).thisPlane.transform.position+Vector3(0,0.5,0), Quaternion.Euler(new Vector3()))).GetComponent.<person>();
	mywar.person(0,"war 1",5,60,2300,3,650,390,0,90,0,1);
	mywar.setlocation(4,2);
	setLocation(mywar,4,2);
	ps.Add(mywar);
	
	var enemywar : person = (GameObject.Instantiate(GameObject.Find("CD2"), bd.getBox(2,10).thisPlane.transform.position+Vector3(0,0.5,0), Quaternion.Euler(new Vector3()))).GetComponent.<person>();
	enemywar.person(1,"war 2", 5,65,2300,3,650,390,0,90,0,2);
	enemywar.setlocation(2,10);
	setLocation(enemywar,2,10);
	ps.Add(enemywar);
	
	var myassissan : person = (GameObject.Instantiate(GameObject.Find("CA1"),bd.getBox(3,2).thisPlane.transform.position+Vector3(0,0.5,0), Quaternion.Euler(new Vector3()))).GetComponent.<person>();
	myassissan.person(2,"assissan 1",5,80,1000,4,1000,150,50,300,1,1);
	myassissan.setlocation(3,2);
	setLocation(myassissan,3,2);
	ps.Add(myassissan);
	
	var enemyassissan : person = (GameObject.Instantiate(GameObject.Find("CA2"),bd.getBox(4,10).thisPlane.transform.position+Vector3(0,0.5,0), Quaternion.Euler(new Vector3()))).GetComponent.<person>();
	enemyassissan.person(3,"assissan 2",5,75,1000,4,1000,150,50,300,1,2);
	enemyassissan.setlocation(4,10);
	setLocation(enemyassissan,4,10);
	ps.Add(enemyassissan);
	
	var mymagic : person = (GameObject.Instantiate(GameObject.Find("CC1"),bd.getBox(4,1).thisPlane.transform.position+Vector3(0,0.5,0), Quaternion.Euler(new Vector3()))).GetComponent.<person>();
	mymagic.person(4,"magic 1",5,40,1400,2,100,200,1000,460,2,1);
	mymagic.setlocation(4,1);
	setLocation(mymagic,4,1);
	ps.Add(mymagic);
	
	var enemymagic : person = (GameObject.Instantiate(GameObject.Find("CC2"),bd.getBox(3,11).thisPlane.transform.position+Vector3(0,0.5,0), Quaternion.Euler(new Vector3()))).GetComponent.<person>();
	enemymagic.person(5,"magic 2",5,45,1400,2,100,200,1000,460,2,2);
	enemymagic.setlocation(3,11);
	setLocation(enemymagic,3,11);
	ps.Add(enemymagic);
	
	var myhealer : person = (GameObject.Instantiate(GameObject.Find("CB1"),bd.getBox(3,1).thisPlane.transform.position+Vector3(0,0.5,0), Quaternion.Euler(new Vector3()))).GetComponent.<person>();
	myhealer.person(6,"healer 1",5,50,1800,2,100,250,800,350,3,1);
	myhealer.setlocation(3,1);
	setLocation(myhealer,3,1);
	ps.Add(myhealer);
	
	var enemyhealer : person = (GameObject.Instantiate(GameObject.Find("CB2"),bd.getBox(2,11).thisPlane.transform.position+Vector3(0,0.5,0), Quaternion.Euler(new Vector3()))).GetComponent.<person>();
	enemyhealer.person(7,"healer 2",5,45,1800,2,100,250,800,350,3,2);
	enemyhealer.setlocation(2,11);
	setLocation(enemyhealer,2,11);
	ps.Add(enemyhealer);
	
	for(var i:int;i<ps.Count();i++){
		ps[i].transform.parent = this.transform;
	}
}
public function renderList(){ // render out the list of action
	if(round == 0){
		for(var i:int=0;i<speed.length;i++){
			speed[i]=ps[i].getSp();
		}
	}
	playlist = new List.<int>();
	print(playlist.Count());
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

public function printList(round:int){ // print out the list of action
	for(var i:int=round;i<20+round;i++){
		print((i+1-round)+".) "+ps[playlist[i]].getName()+"\t\t"+(((i+1-round)%5==0)?"\n\n":""));
	}
}
public function printingRoundInfo(round:int){ // print out all the things we need to show every round
	printBoard();
	printList(round);
	printingEveryOneHP();
}
public function printingEveryOneHP(){
	for(var i:int=0;i<ps.Count();i++){
		print(ps[i].getName()+".Hp : "+ps[i].getHp()+"\n");
	}
}
public function printBoard(){ // print out the empty board
	for(var i:int=0;i<BSizeY;i++){
		printingHashline(6*BSizeX+1);
		for(var j:int=0;j<BSizeX;j++){
			printingHashline(1);
			printingSpace(2);
			//if(board[j,i] == -1){
			if(bd.getBox(j, i).isEmpty()){
				printingSpace(3);
			}else{
				//System.out.print(ps.get(board[j,i]).getName());
				if(bd.getBox(j, i).havePerson() && ps[bd.getBox(j, i).getMan()].isNoShow == false){
					print(ps[bd.getBox(j, i).getMan()].getName());
				}else{
					printingSpace(2);
				}
				if(bd.getBox(j, i).haveFun() && bd.getBox(j, i).getShortForm() !=""){
					print(bd.getBox(j, i).getShortForm());
				}else{
					printingSpace(1);
				}
			}
			
		}
		//print("#\t"+(char)(65+i));	
	}
	printingHashline(6*BSizeX+1);
	for(j=1;j<=BSizeX;j++){
		printingSpace(3);
		print(j);
		printingSpace(2);
	}
}
public function printBoard(pr:person ,OKBoard:boolean[,]){ // print out the board with need to show avalible
	for(var i:int=0;i<BSizeY;i++){
		printingHashline(6*BSizeX+1);
		for(var j:int=0;j<BSizeX;j++){
			printingHashline(1);
			//if((cal.calcuRangeW(pr,j,i))&(board[j,i] == -1)){
			if(OKBoard[j,i]==true){
				print("OK");
			}else{
				printingSpace(2);
			}
			//if(board[j,i] == -1){
			if(bd.getBox(j, i).isEmpty()){
				printingSpace(3);
			}else{
				//System.out.print(ps.get(board[j,i]).getName());
				if(bd.getBox(j, i).havePerson() && ps[bd.getBox(j, i).getMan()].isNoShow == false){
					print(ps[bd.getBox(j, i).getMan()].getName());
				}else{
					printingSpace(2);
				}
				if(bd.getBox(j, i).haveFun() && bd.getBox(j, i).getShortForm() !=""){
					print(bd.getBox(j, i).getShortForm());
				}else{
					printingSpace(1);
				}
			}
		}
		//print("#\t"+(char)(65+i));	
	}
	printingHashline(6*BSizeX+1);
	for(j=1;j<=BSizeX;j++){
		printingSpace(3);
		print(j);
		printingSpace(2);
	}
}
public static function printingHashline(n:int){ // print a few of # as you want
	for(var i:int=0;i<n;i++){
		print("#");
	}
}
public static function printingSpace(n:int){ // print a few of " " as you want
	for(var i:int=0;i<n;i++){
		print(" ");
	}
}
public function firstSetting(){ // do every setting with the first time
	//var sth: person = new person().insertDetail(0,"A1",5,60,2300,3,650,390,0,90,0);
	//playlist.Add(0);
	//print(playlist.Count());
	var lx:int = this.transform.position.x;
	var ly:int = this.transform.position.y;
	
	//var map : plane[,] = new plane[BSizeX,BSizeY];
	
	//box bx = bd.getBox(0, 0);
	for(var i:int=0;i<BSizeY;i++){
		for(var j:int=0;j<BSizeX;j++){
			var newbox : plane = (GameObject.Instantiate(box, new Vector3(i,0, j), Quaternion.Euler(new Vector3()))).GetComponent.<plane>();
			//map[j,i]=newbox;
			newbox.transform.position = this.transform.position + Vector3(i,0,j);
			newbox.transform.parent = this.transform;
			newbox.setUp(j,i);
			//newbox.gridPosition = new Vector2(j,i);
			//map[j,i].gridPosition = new Vector2(j,i);
			//map[j,i].setcanSelect(false);
		
			board[j,i] =-1;
			//print(j+" "+i);
			bd.getBox(j,i).clearThisSquare();
			//bx[0,0]=new box();
			//bx[j,i].clearThisSquare();
			bd.getBox(j,i).insertPlane(newbox);
		}
	}
	insertCharacter();
	speed=new int[ps.Count()];
	renderList();
	GameStage01();
	//GameStage01();
	//SampleDefault();
	showPerson();
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
public function whereX():int{ // ask the location X
	var XAns:int;
	do{
		print("(1-8) : ");
		//XAns = new Scanner(System.in).nextInt()-1;
	}while(XAns<0||XAns>BSizeX-1);
	return XAns;
}
public function whereY():int{ // ask the location Y
	var YAns:int;
	do{
		print("(A-M) : ");
		//char ans = new Scanner(System.in).nextLine().charAt(0);
		//YAns = ans -65;
	}while((YAns<0)||(YAns>BSizeY-1));
	return YAns;
}
public function setLocation(pr:person, x:int, y:int){
	board[x,y] = pr.getId();
	bd.getBox(x, y).standIn(pr.getId());
	pr.setLocation(x, y);
}
public function setLocation(pr:person, x:int, y:int, x2:int, y2:int){
	board[x,y] = pr.getId();
	board[x2,y2]=-1;
	bd.getBox(x2, y2).leaveIt();
	bd.getBox(x, y).standIn(pr.getId());
	pr.setLocation(x, y);
}

public function showWalk():boolean{ // walk method
	cal =new Calculating(bd);
	var pr:person = ps[playlist[round]];
	var x:int=pr.getLocationX();
	var y:int=pr.getLocationY();
//	print("pr : "+x+" "+y);
	cal.treeRecursive(x,y,pr.getSt());
	//var OKBoard:boolean[,] = cal.getOKBoard();
	//cal.FindHighlight(bd.getBox(x,y).thisPlane,pr.getSt());
	//var OKList:List.<plane> =/*cal.getOKList()*/cal.FindHighlight(bd.getBox(x,y).thisPlane,pr.getSt());;
	var OKList : List.<plane> = cal.getOKList();
	
	//OKBoard[x,y] = false;
	//printBoard(pr,OKBoard);
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

	/*
	var yourStep:mySet[]=cal.go(pr.getLocationX(), pr.getLocationY(), x2, y2);
	print(yourStep.length);
	for(var i:int=0;i<yourStep.length;i++){
		//print(yourSX[i]);
		setLocation(pr,yourStep[i].x,yourStep[i].y,pr.getLocationX(),pr.getLocationY());
		//printBoard();
	}
	
	var ans:char;
	/*do{
		print("Sure ? (Y:Yes, N:No)");
		//Scanner input= new Scanner(System.in);
		//ans=input.nextLine().charAt(0);
		if(((ans !='Y')&(ans!='N'))){
			print("(Y:Yes, N:No)");
		}
	}while((ans !='Y')&(ans!='N'));
	if(ans=='Y'){
		return true;
	}*/
	return true;
	/*setLocation(pr,x,y,x2,y2);
	printBoard();
	return false;	*/	
}
public function useSkill(whichSkill:int):boolean{ // skill using method
	var pr:person = ps[playlist[round]];
	
	//print(pr.haveWhatSkill());
	//basicAttack bs= new basicAttack(pr);
	//superAttack bs= new superAttack(pr);
	//doubleAttack bs=new doubleAttack(pr);
	//basicHeal bs=new basicHeal(pr);
	//longHeal bs=new longHeal(pr);
	//highRoundAttack bs=new highRoundAttack(pr);
	
	//skill bs = pr.getSkill();
	var bs:skill = pr.haveWhatSkill(whichSkill);
	
	//var bs:skill = new showDownSomeone(pr);
	//skill bs = new selfTeleport(pr);
	//skill bs = new buildTree(pr);
	//skill bs = new protectSomeone(pr); 
	//skill bs = new hide(pr);
	//skill bs = new hugeFireExplosion(pr);
	//skill bs = new thunderLink(pr);
	//skill bs = new provocative(pr);
	//skill bs = new poison(pr);
	//skill bs = new simpleKnockBack(pr);
	//skill bs = new bigAreaHeal(pr);
	
	//bigAreaHeal bs=new bigAreaHeal(pr); 
	// this is the code which create healing skill
	// but we have a lot of skill 
	// how about others ??
	
	//addPhyDam bs =new addPhyDam(pr);

	// x,y is the active character location 
	var x:int=pr.getLocationX();
	var y:int=pr.getLocationY();
	
	// return the OKBoard of skill to the method 
	var OKBoard:boolean[,]  = getSkillOKBoard(bs,pr,bs.ToZ); 
	OKBoard[x,y] = false; // set the user is false because the skill to affect others don't choose his own self
	//printBoard(pr,OKBoard);
	
	// choose skill happen location, some skill is not only affect on the target person, sometimes is happen in a target place
	if(bs.placeChoose==true){
		for(var i:int=0;i<bs.targetNumber;i++){
			var y2:int;
			var x2:int;
			print("target place "+(i+1)+" :");
			do{
				y2=whereY();
				x2=whereX();
				if(OKBoard[x2,y2]==false){
					print("You cant't choose there !");
				}
			}while(OKBoard[x2,y2]==false);
			bs.setLand(x2, y2);
		}
	}
	
	// if this skill will scan target once again after choose the target place
	if(bs.isRepeatedlyScan==true){
		OKBoard = getSkillOKBoard2(bs,bs.secondToZ);
		OKBoard[x,y] = false;
		printBoard(pr,OKBoard);
	}
	// choose to find the target person
	var target:List.<person> = new List.<person>();
	var isRightPerson:boolean=true;
	// loop until he have choose the right person if he is attacked by provocative skill
	do{
		if(bs.needChoose==true){
			for(i=0;i<bs.targetNumber;i++){
				y2=-1;
				x2=-1;
				print("target "+(i+1)+" :");
				do{
					y2=whereY();
					x2=whereX();
					if(OKBoard[x2,y2]==false){
						print("You cant't choose there !");
					}
				}while(OKBoard[x2,y2]==false);
				// if this box had been stand for somebody, select this person to be target
				if(bd.getBox(x2, y2).havePerson()){
					if(ps[board[x2,y2]].protector == -1){
						target.Add(ps[board[x2,y2]]);
					}
					else{
						print(ps[board[x2,y2]].protector);
						target.Add(ps[ps[board[x2,y2]].protector]);
						ps[board[x2,y2]].checkProtect();
					}
					// means this character is already been selected to be a target
					target[i].isSelectedBy = true; 
				}
			}
		}
		else{
			// if this skill do not need user to choose target person 
			// and it will automatically to search your target,
			// it will search in this condition
			if(bs.needScan==true){
				target = bs.scan(OKBoard,board,ps);
				for(i=0;i<target.Count();i++){
					// means this character is already been selected to be a target
					target[i].isSelectedBy = true;
				}
			}
		}
		// if this active character is already attacked by Provocative skill,
		// here will search that is this attack have attack the person he need to attack
		if(pr.mustTarget>-1 && bs.needHurtCal==true){
			for(i=0;i<target.Count();i++){				
				if(target[i].getId()==pr.mustTarget){
					isRightPerson=true;
					print("right guy");
					//break hihi;
				}
				isRightPerson=false;
			}
			print("You must attack "+ ps[pr.mustTarget].getName());
		}
	}while(isRightPerson==false);
	
	// if this skill need to continue to search more target after the first round of choosing target
	// this operation will start
	var targetNum:int =0;
	if(bs.isContinuousSearchingTarget==true){
		do{
			var targetNum2:int=target.Count();
			for(i=targetNum;i<targetNum2;i++){
				OKBoard = getSkillOKBoard(bs,target[i],bs.continueToZ); // return the OKBoard of skill to the method 
				var newTarget:person[] = bs.scan2(OKBoard,board,ps);
				for(var j:int=0;j<newTarget.length;j++){
					if(newTarget[j].isSelectedBy == false && newTarget[j] != pr){
						target.Add(newTarget[j]);
						target[target.Count()-1].isSelectedBy = true;
					}
				}
			}
			targetNum=targetNum2;
		}while(targetNum != target.Count());	
	}
	
	// this operation is to do the calculating of hurt the target
	if(bs.needHurtCal==true){
		for(j=0;j<target.Count();j++){
			//person target2=bs.setTarget(ps.get(board[x2,y2]));
			var target2:person=bs.setTarget(target[j]);
			for(i=0;i<bs.runTimes;i++){
				bs.action();
				target2.getHurt(bs.damage());
				print((bs.damage()>0)?target2.getName()+" : hp -"+ bs.damage():target2.getName()+" : hp +"+ (-bs.damage()));
				printingEveryOneHP();	
			}
		}
	}
	
	// this operation will start when this skill has some special function 
	if(bs.haveFunction==true){
		if(bs.needChoose == true){
			for(j=0;j<target.Count();j++){
				bs.setTarget(target[j]);
				bs.functions();
				print("haveFunction");
				//if this skill has a knock back function, start this operation
				if(bs.knockBackFunction>0){
					knockBack(bs.knockBackDirection,bs.knockBackFunction,bs.de);
				}
				if(bs.isPlaceChange==true){
					setLocation(bs.de,bs.targetX,bs.targetY,bs.de.getLocationX(),bs.de.getLocationY());
					printBoard();
				}
				if(bs.roundOfDelay != 0){
					var thisTargetRound:int=0;
					for(var k:int=round;k<playlist.Count();k++){
						if(ps[playlist[k]]==target[j]){
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
		}
		if(bs.buildObject>-1){
			switch (bs.buildObject){
			case 1	:	break;
			case 2	:	bd.setFire(bs.targetX, bs.targetY);
						break;
			case 3	:	bd.setIce(bs.targetX, bs.targetY);
						break;
			case 4	:	bd.setLifeTree(bs.targetX, bs.targetY);
						board[bs.targetX,bs.targetY] = -4;
						break;
			}
		}
		if(bs.isPlaceChange==true && bs.needChoose == false){
			bs.functions();
			setLocation(bs.de,bs.targetX,bs.targetY,bs.de.getLocationX(),bs.de.getLocationY());
			printBoard();
		}
	}
	return true;
}

public function askInfo(){ // ask person Information
	var ans:int = 0;
	do{
		print("Tell me !! Who you want to know about !! (1-8)");
		//Scanner input = new Scanner(System.in);
		//ans = input.nextInt();
		print((ans < 1 || ans >8)?"you need to insert between 1-8":"");
	}while(ans < 1 || ans >8);
	var yourLover:person = ps[ans-1];
	print(yourLover.getName()+"\t:");
	print(yourLover.getName()+".hp)  \t:\t"+yourLover.getHp());
	print(yourLover.getName()+".speed)\t:\t"+(6000/yourLover.getSp()));
	print(yourLover.getName()+".step)\t:\t"+yourLover.getSt());
	print(yourLover.getName()+".star)\t:\t"+yourLover.getStar());
	//print(yourLover.getName()+".Location)\t:\t("+(char)(65+yourLover.getLocationY())+","+yourLover.getLocationX()+")");
	print("\n"+yourLover.getName()+".physical attack)\t:\t"+yourLover.getPa());
	print(yourLover.getName()+".physical defend)\t:\t"+yourLover.getPd());
	print(yourLover.getName()+".Magical attack)\t:\t"+yourLover.getMa());
	print(yourLover.getName()+".Magical defend)\t:\t"+yourLover.getMd());
		
}
public function findDie():boolean{ // check anyone die
	var dead:boolean = false;
	for(var i:int=0;i<ps.Count();i++){
		if(ps[i].deadOrNot() == false){
			if(ps[i].getHp() <= 0){
				dead = true;
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
	ps[id].youDie();
	print(ps[id].getName()+" is dead");
	for(i=0;i<BSizeY;i++){
		for(var j:int=0;j<BSizeX;j++){
			if(board[j,i]==id){
				board[j,i]=-1;
			}
		}
	}
	
}
public function endTurnProcess(){
	var guy:person = ps[playlist[round]];
	for(var id:int=0;id<ps.Count();id++){
		bd.whatFunction(ps[id]);
		ps[id].endTurncheck();
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
	haveWalk=false;
	skillUsed = false;
	skillTarget = new List.<person>();
	skillStage=0;
	cal = new Calculating(bd);
	round++;
	if(round > 300){
		renderList();
		round=0;
	}
	showPerson();
	//ps[playlist[round]].isMe();
	//cal = new Calculating(bd);
	//askAction(1);
	startSkill=false;
}
public function knockBack(direction:int, range:int, target:person ){
	var x:int=target.getLocationX();
	var y:int=target.getLocationY();
	var x2:int=x;
	var y2:int=y;
	var stop:boolean=false;
	switch (direction){
		case 0 :	//y2-=range;
					for(var i:int=1;i<=range;i++){
						if(board[x,y-i] != -1){
							stop=true;
							break;
						}
						y2--;
					}
					print("y2 " +y2);
					break;
		case 1 :	//x2+=range;
					for( i=1;i<=range;i++){
						if(board[x+i,y] != -1){
							stop=true;
							break;
						}
						x2++;
					}
					print("x2 " +x2);
					break;
		case 2 :	//y2+=range;
					for( i=1;i<=range;i++){
						if(board[x,y+i] != -1){
							stop=true;
							break;
						}
						y2++;
					}
					print("y2 " +y2);
					break;
		case 3 :	//x2-=range;
					for( i=1;i<=range;i++){
						if(board[x-i,y] != -1){
							stop=true;
							break;
						}
						x--;
					}
					print("x2 " +x2);
					break;
	}
	var tomiddleofplane:Vector3=new Vector3(0,target.transform.localScale.y/2,0);
	var targetPos:Vector3=bd.getBox(x2,y2).thisPlane.transform.position;
	while(target.transform.position!=targetPos+tomiddleofplane){
		//	pr.transform.position=Vector3.Lerp(pr.transform.position,pr.toPlace[0].transform.position+Vector3(0,person.transform.localScale.y/2,0), Time.deltaTime);
			target.transform.position = Vector3.MoveTowards(target.transform.position, bd.getBox(x2,y2).thisPlane.transform.position+tomiddleofplane, 5*Time.deltaTime);
			/*if(target.transform.position==bd.getBox(x2,y2).thisPlane.transform.position+tomiddleofplane){
				pr.toPlace.RemoveAt(0);
			}*/
			yield WaitForSeconds(0);
	}
	setLocation(target,x2,y2,x,y);
	
	if(stop != true){	
		
	}
	else{
		print("can't knock back");
	}
	printBoard();
}
public function getSkillOKBoard( bs:skill, target:person, type:int):boolean[,]{
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
public function listSwap( first:int, second:int){
	var tool:int = playlist[first];
	playlist[first]=playlist[second];
	playlist[second]=tool;
}

function walk2(pln:plane){
	//print("walk2"+x+" "+y);
	
	var pr:person = ps[playlist[round]];
	//var mytarget: plane =bd.getBox(x,y).thisPlane;
	var mytarget : plane = pln;
	var tomiddleofplane:Vector3=new Vector3(0,pr.transform.localScale.y/2,0);
	var now:plane=bd.getBox(pr.getLocationX(),pr.getLocationY()).thisPlane;
	//now.status[0].ishere=false;
	//if(startWalk==true){
		resetSelectPlane();
		//var cal:Calculating =new Calculating(bd);
		//cal.treeRecursive(pr.getLocationX(),pr.getLocationY(),pr.getSt());
		var sth :boolean[,]=cal.getOKBoard();
		print("I am b"+sth[0,1]);
		//var OKList:mySet[] = cal.go(pr.getLocationX(),pr.getLocationY(),x,y);
		var OKList:mySet[] = cal.go(pr.getLocationX(),pr.getLocationY(),mytarget.posX,mytarget.posY);
		for(var i=0;i<OKList.length;i++){
			pr.toPlace.Add(bd.getBox(OKList[i].x,OKList[i].y).thisPlane);
			
		}
		/*for(var go:plane in PathFinder.FindPath(now,mytarget).listOfPlanes){
			pr.toPlace.Add(go);
		}*/
		var targetPos:Vector3=mytarget.transform.position;
		while(pr.transform.position!=targetPos+tomiddleofplane){
		//	pr.transform.position=Vector3.Lerp(pr.transform.position,pr.toPlace[0].transform.position+Vector3(0,person.transform.localScale.y/2,0), Time.deltaTime);
			pr.transform.position = Vector3.MoveTowards(pr.transform.position, pr.toPlace[0].transform.position+tomiddleofplane, 5*Time.deltaTime);
			if(pr.transform.position==pr.toPlace[0].transform.position+tomiddleofplane){
				pr.toPlace.RemoveAt(0);
			}
			yield WaitForSeconds(0);
		}

	pr.setlocation(mytarget.gridPosition.x,mytarget.gridPosition.y);
	
	setLocation(pr,mytarget.posX,mytarget.posY,pr.getLocationX(),pr.getLocationY());
	//setLocation(pr,x,y,pr.getLocationX(),pr.getLocationY());
	//map[mytarget.gridPosition.x,mytarget.gridPosition.y].status[0].ishere=true;

	mytarget=null;
	//updateTurn();  // will go to other place
	startWalk=false;
	 skillUsed=false;
	 cal = new Calculating(bd);
	 haveWalk=true;
	//endTurnProcess();
}

public function useSkill01(whichSkill:int){
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
public function useSkill2(){
	
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
	if(skillStage == 1){	// Skill Stage 1 = After player choose a place and ask about is it need to reScan ?
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
			}
		}
		else{
			print("I not to choose");
			if(OKBoard == null){
				OKBoard = getSkillOKBoard(bs,pr,bs.ToZ);
			}
			if(bs.needScan==true){
				skillTarget = bs.scan(OKBoard,board,ps);
				for(var i:int=0;i<skillTarget.Count();i++){
					// means this character is already been selected to be a target
					skillTarget[i].isSelectedBy = true;
				}
			}
			skillStage = 3;
		}
	}
	if(skillStage == 3){	// skill Stage 3 = the process that to check the target that do you have choose the right target.
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
			}
		}
		else{
			skillStage = 4;
			//useSkill2();
		}
	}
	if(skillStage==4){	// SKill Stage 4 = the stage which start to do everything related with the content of the skill such as hurt somebody or start the function
		// if this skill need to continue to search more target after the first round of choosing target
		// this operation will start
		var targetNum:int =0;
		if(bs.isContinuousSearchingTarget==true){
			do{
				var targetNum2:int=skillTarget.Count();
				for(i=targetNum;i<targetNum2;i++){
					OKBoard = getSkillOKBoard(bs,skillTarget[i],bs.continueToZ); // return the OKBoard of skill to the method 
					var newTarget:person[] = bs.scan2(OKBoard,board,ps);
					for(var j:int=0;j<newTarget.length;j++){
						if(newTarget[j].isSelectedBy == false && newTarget[j] != pr){
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
				for(i=0;i<bs.runTimes;i++){
					bs.action();
					if(target2.team == pr.team){
						if(bs.attackTeamate == true){
							target2.getHurt(bs.damage());
						}
					}else{
						if(bs.attackEmery == true){
							target2.getHurt(bs.damage());
						}
					}
					print((bs.damage()>0)?target2.getName()+" : hp -"+ bs.damage():target2.getName()+" : hp +"+ (-bs.damage()));
				}
			}
		}
		
		// this operation will start when this skill has some special function 
		if(bs.haveFunction==true){
			if(bs.needChoose == true){
				for(j=0;j<skillTarget.Count();j++){
					bs.setTarget(skillTarget[j]);
					bs.functions();
					print("haveFunction");
					//if this skill has a knock back function, start this operation
					if(bs.knockBackFunction>0){
						knockBack(bs.knockBackDirection,bs.knockBackFunction,bs.de);
					}
					if(bs.isPlaceChange==true){
						setLocation(bs.de,bs.targetX,bs.targetY,bs.de.getLocationX(),bs.de.getLocationY());
						//printBoard();
					}
					if(bs.roundOfDelay != 0){
						var thisTargetRound:int=0;
						for(var k:int=round;k<playlist.Count();k++){
							if(ps[playlist[k]]==skillTarget[j]){
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
			}
			if(bs.buildObject>-1){
				switch (bs.buildObject){
				case 1	:	break;
				case 2	:	bd.setFire(bs.targetX, bs.targetY);
							break;
				case 3	:	bd.setIce(bs.targetX, bs.targetY);
							break;
				case 4	:	bd.setLifeTree(bs.targetX, bs.targetY);
							board[bs.targetX,bs.targetY] = -4;
							break;
				}
			}
			if(bs.isPlaceChange==true && bs.needChoose == false){
				bs.functions();
				setLocation(bs.de,bs.targetX,bs.targetY,bs.de.getLocationX(),bs.de.getLocationY());
				//printBoard();
			}
		}
		//skillStage = 0;
		//resetSelectPlane();
		skillUsed = true;
		startSkill=false;
	}
}
public function skPlaceChoose(){
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
public function skTargetChoose(){
	skillStage = 2;
	var pr:person = ps[playlist[round]];
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
public function skAddTarget(tar:person){
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
public function showBoard(OKBoard:boolean[,]){
	for(var i:int=0;i<OKBoard.GetLength(0);i++){
		for(var j:int=0;j<OKBoard.GetLength(1);j++){
			if(OKBoard[i,j] == true){
				bd.getBox(i,j).thisPlane.setcanSelect(true);
			}
		}
	}
}

public function noAction(){
	if(haveWalk == false){
		if(startWalk == true){
			haveWalk = false;
			startWalk = false;
		}
	}
	if(skillStage != 0){
		startSkill=false;
		//skillStage =0;
	}
	resetSelectPlane();
}
function showPerson(){
	/*var pr:person = ps[playlist[round]];
	var targetPos:Vector3=pr.transform.position + Vector3(0,3,0);
	var targetLast:Vector3 =pr.transform.position;
	var tomiddleofplane:Vector3=new Vector3(0,pr.transform.localScale.y/2,0);

	if(startWalk == false && startSkill == false){
	
		for(var i:int=0;i<10;i++){
			while(pr.transform.position!=targetPos+tomiddleofplane){
			//	pr.transform.position=Vector3.Lerp(pr.transform.position,pr.toPlace[0].transform.position+Vector3(0,person.transform.localScale.y/2,0), Time.deltaTime);
				pr.transform.position = Vector3.MoveTowards(pr.transform.position, targetPos+tomiddleofplane, 5*Time.deltaTime);
				yield WaitForSeconds(0);
			}
			
			while(pr.transform.position!=targetLast+tomiddleofplane){
			//	pr.transform.position=Vector3.Lerp(pr.transform.position,pr.toPlace[0].transform.position+Vector3(0,person.transform.localScale.y/2,0), Time.deltaTime);
				pr.transform.position = Vector3.MoveTowards(pr.transform.position, targetLast+tomiddleofplane, 5*Time.deltaTime);
				yield WaitForSeconds(0);
			}
		}

	}*/
	//Destroy(personShowStone);
	print(ps[playlist[round]].getName());
	charName.text="寵"+ps[playlist[round]].getId().ToString();
	personShowStone.transform.position = ps[playlist[round]].transform.position+ Vector3(0,1,0);

}










function Start () {
	personShowStone = GameObject.Instantiate(personShowStone);
	gameProcess(8,13);
	Awake();
	//	round=0;
			//askAction(1);
}

function Update () {

}
function Awake(){
	instance=this;
}
function resetSelectPlane(){
	for(var j:int=0;j<BSizeY;j++)
		for(var i:int=0;i<BSizeX;i++)
			if(bd.getBox(i,j).thisPlane.canSelect == true){
				bd.getBox(i,j).thisPlane.setcanSelect(false);
			}
}

//}