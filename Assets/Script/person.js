#pragma strict
import System.Collections.Generic;

//public class person{
	public var gridPosition:Vector2; //use vector2 instead of locX locY , I think better
	var incontrol : boolean=false;
	
	public var id:int; // id of this character
	var myName : String; // name of this character
	var star:int=0; // how many star of this character
	var sp:int=0; // how fast are this character
	var hp:int=0; // hp of this character
	var step:int=0; // how many step of this character
	var pa:int=0; // physical attack of this character
	var pd:int=0; // physical defend of this character
	var ma:int=0; // magical attack of this character
	var md:int=0; // magic defend of this character
	var job:int; // which job you are ?
	var team:int; // which team you are ? in the game play all character will allocate to two team
	var deathRound:int = 0;
	
	var fullHp:int=0;
	var bornRound: int=0;
	
	// to record the no of the monster
	var monster_no : int;
	
	var isPlayer:boolean=true;
	var AI : FSM;
	
	var skill_List:List.<skill> = new List.<skill>(); // how many skill this character have ?
	
	// record your location
	var locationX:int;
	var locationY:int;
	
	// data about buff of Attack or defend
	var phyAtBonus:double =1; // the num of phy att buff
	var phyDeBonus:double =1; // the num of phy def buff
	var magAtBonus:double =1; // the num of mag att buff
	var magDeBonus:double =1; // the num of mag def buff
	var phyAtBuff:boolean=false; // is this chacater's physical attack has been buff
	var phyDeBuff:boolean=false; // is this character's physical defend has been buff
	var magAtBuff:boolean=false; // is this chacater's magical attack has been buff 
	var magDeBuff:boolean=false; // is this chacater's magic defend has been buff
	var phyAtTime:int=0; // how many rounds you have phy att buff
	var phyDeTime:int=0; // how many rounds you have phy def buff
	var magAtTime:int=0; // how many rounds you have mag att buff
	var magDeTime:int=0; // how many rounds you have mag def buff
	var boss:boolean = false;
	
	
	var dead:boolean =false; // are you  dead ?
	var inIce:boolean =false; // are you in Ice?
	
	// the data that need to check every round that wjich are the special effect from skills
	var isPoison:boolean =false; // are you poised
	var isAutoHeal:boolean =false; // are you be Auto heal
	var isNoShow:boolean =false; // are you hided
	var poisonHurt:int =0; // the num of hurt of this poison
	var poisonRound:int =0; // how many rounds you get poison
	var autoHealNum:int =0; // the num of heal of this auto heal
	var autoHealRound:int =0; // how many rounds you will auto heal
	var noShowRound:int=0; // how many rounds you will hide
	var spawned:boolean =false;
	var anim:Animation;	
	
	var mustTarget:int=-1; 
	// must target means this character must attack this character in next Attack,
	//-1 = no target person, 0-7 = id
	
	var isSelectedBy:boolean=false; // are you already be someone target
	
	// the data about protect
	var protector : int =-1; // who is your protector, -1 = null, n>-1 = protector id
	var protectedRound : int =0; // how many round you will be protected
	var protectedHit : int =0; // how many hit protector will protect you

	var toPlace:List.<plane> = new List.<plane>();
	
	var model : GameObject;
	var icon : Sprite;
	
	public function start(){
		anim = GetComponent.<Animation>();
	}
	
	public function person(id:int,myName:String,star:int,sp:int,hp:int,step:int,pa:int,pd:int,ma:int,md:int,job:int,team:int){
			this.id=id;
			this.myName=myName;
			this.star = star;
			this.sp = sp;
			this.hp = hp;  
			fullHp = hp;
			this.step = step;
			this.pa = pa;
			this.pd = pd;
			this.ma = ma;
			this.md = md;
			this.job = job;
			this.team = team;
			
			dead = false;
	}
	public function insertDetail(id:int,myName:String,star:int,sp:int,hp:int,step:int,pa:int,pd:int,ma:int,md:int,job:int,team:int):person{
			this.id=id;
			this.myName=myName;
			this.star = star;
			this.sp = sp;
			this.hp = hp;  
			fullHp = hp;
			this.step = step;
			this.pa = pa;
			this.pd = pd;
			this.ma = ma;
			this.md = md;
			this.job = job;
			dead = false;
			this.team = team;
			
			return this;
	}
	public function insertDetail(pr:person):person{
			this.id=pr.id;
			this.myName=pr.myName;
			this.star = pr.star;
			this.sp = pr.sp;
			this.hp = pr.hp;  
			fullHp = hp;
			this.step = pr.step;
			this.pa = pr.pa;
			this.pd = pr.pd;
			this.ma = pr.ma;
			this.md = pr.md;
			this.job = pr.job;
			dead = false;
			this.team = pr.team;
			
			setModel(pr.model);
			setIcon(pr.icon);
			
			return this;
	}
	public function setTeam(team:int){
		this.team = team;
	}
	public function getTeam():int{
		return team;
	}
	function setID(id:int){
		this.id = id;
		if(model != null){
			model.GetComponent.<person>().SendMessage("setID",this.id);
		}
	}
	/*function setMeUp(pr:person){
		this. = pr;
	}*/
	function setModel(model:GameObject){
		this.model = model;
		//this.model.GetComponent.<person>().insertDetail(id,myName,star,sp,hp,step,pa,pd,ma,md,job,team);
	}
	function getModel():GameObject{
		return model;
	}
	function setDeathRound(deathRound:int){
		this.deathRound = deathRound;
	}
	function getDeathRound():int{
		return deathRound;
	}
	function setIcon(icon:Sprite){
		this.icon = icon;
	}
	function getIcon():Sprite{
		return icon;
	}
	function getIsPlayer(){
		return isPlayer;
	}
	function setIsPlayer(playerOrAI:boolean){
		isPlayer = playerOrAI;
	}
	function getFullHp(){
		return fullHp;
	}
	function setAI(AI:FSM){
		this.AI =AI;
	}
	function getAI():FSM{
		return AI;
	}
	function setBornRound(bornTime : int){
		bornRound = bornTime;
	}
	function getBornRound():int{
		return bornRound;
	}
	
	
	public function getId():int{
		return id;
	}
	public function getName():String{
		return myName;
	}
	public function getStar():int{
		return star;
	}
	public function getSp():int{
		return (6000/sp);
	}
	public function getHp():int{
		return hp;
	}
	public function getSt():int{
		if(inIce){
			return step-1;
		}
		return step;
	}
	public function getPa():int{
		return pa;
	}
	public function getPd():int{
		return pd;
	}
	public function getMa():int{
		return ma;
	}
	public function getMd():int{
		return md;
	}
	public function deadOrNot():boolean{
		return dead;
	}
	public function youDie(){
		dead = true;
		Destroy(this.model);
	}
	public function getHurt(hurt:int){
		if(hurt < 0){
			Debug.Log("heal");
			if(-hurt > fullHp-hp){
				hurt = -(fullHp-hp);
			}
			hp-=hurt;
			//anim.Play();
			var hurtText:GameObject = Instantiate(Resources.Load("damagePrefabCanvas"), getModel().transform.position+new Vector3(0.25,0,0), new Quaternion());//getModel().transform.position
			
			//hurtText.transform.parent = GameObject.Find("Canvas").transform;
			if(hurt > 0){
				hurtText.transform.GetChild(0).GetChild(0).GetComponent.<UI.Text>().text = "-"+hurt.ToString();
			}else{
				hurt = -hurt;
				hurtText.transform.GetChild(0).GetChild(0).GetComponent.<UI.Text>().text = "+"+hurt.ToString();
			}
			
			ourAnimationPlay(2);	// animation play
			
			print(getName()+" : hp -"+ hurt);
		}else {
			hp-=hurt;
			//anim.Play();
			hurtText = Instantiate(Resources.Load("damagePrefabCanvas"), getModel().transform.position+new Vector3(0.25,0,0), new Quaternion());//getModel().transform.position
			
			//hurtText.transform.parent = GameObject.Find("Canvas").transform;
			if(hurt > 0){
				hurtText.transform.GetChild(0).GetChild(0).GetComponent.<UI.Text>().text = "-"+hurt.ToString();
			}else{
				hurtText.transform.GetChild(0).GetChild(0).GetComponent.<UI.Text>().text = "+"+hurt.ToString();
			}
			
			ourAnimationPlay(2);	// animation play
			
			print(getName()+" : hp -"+ hurt);
		}
	}
	public function slowDown(){
		inIce = true;
	}
	public function leaveIce(){
		inIce = false;
	}
	public function setLocation(x:int,y:int){
		setLocationX(x);
		setLocationY(y);
	}
	public function setLocationX(x:int){
		locationX=x;
	}
	public function setLocationY(y:int){
		locationY=y;
	}
	public function getLocationX():int{
		return locationX;
	}
	public function getLocationY():int{
		return locationY;
	}
	public function physicalDamage():int{
		if(phyAtBuff==true){
			return parseInt(((3*pa+2*ma)/5)*phyAtBonus*phyAtTime);
		}
		return ((3*pa+2*ma)/5);
	}
	public function magicalDamage():int{
		if(magAtBuff==true){
			return parseInt(((3*pa+2*ma)/5)*magAtBonus*magAtTime);
		}
		return ((3*ma+2*pa)/5);
	}
	public function physicalDef():int{
		if(phyDeBuff==true){
			return parseInt(((3*pa+2*ma)/5)*phyDeBonus*phyDeTime);
		}
		return ((2*pd+1*md)/3);
	}
	public function magicalDef():int{
		if(magDeBuff==true){
			return parseInt(((3*pa+2*ma)/5)*magDeBonus*magDeTime);
		}
		return ((2*md+1*pd)/3);
	}
	public function callSkill():int{
		return 1;
	}
	public function haveWhatSkill(ans:int):skill{
		//ans = 0;
		if(job==0)
			return Warrior.getSkill(ans,this);
		else if(job==1)
			return Assissan.getSkill(ans,this);
		else if(job==2)
			return Magician.getSkill(ans,this);
		else if(job==3)
			return Healer.getSkill(ans,this);
		else if(job==4)
			return poring.getSkill(ans,this);
		
		return null;
	}
	public function phyAtDebuff(){
		phyAtBonus=1;
		phyAtBuff=false;
		phyAtTime=0;
	}
	public function magAtDebuff(){
		magAtBonus=1;
		magAtBuff=false;
		magAtTime=0;
	}
	public function phyDeDebuff(){
		phyDeBonus=1;
		phyDeBuff=false;
		phyDeTime=0;
	}
	public function magDeDebuff(){
		magDeBonus=1;
		magDeBuff=false;
		magDeTime=0;
	}
	public function DebuffAll(){
		phyAtDebuff();
		magAtDebuff();
		phyDeDebuff();
		magDeDebuff();
	}
	public function endTurncheck(){
		if(isPoison){
			getHurt(poisonHurt);
			poisonRound--;
			if(poisonRound==0){
				poisonHurt=0;
				isPoison=false;
				Destroy(model.transform.FindChild("keepposion(Clone)").gameObject);
			}
		}
		if(isAutoHeal){
			getHurt(-autoHealNum);
			autoHealRound--;
			if(autoHealRound==0){
				autoHealNum=0;
				isAutoHeal=false;
				Destroy(model.transform.FindChild("autoHeal1(Clone)").gameObject);
			}
		}
		if(isNoShow){
			if(noShowRound >0){
				noShowRound--;
			}
			else{
				isNoShow = false;
			}
		}
		if(protector != -1){
			if(protectedRound >0){
				protectedRound--;
			}
			else{
				protector = -1;
				Destroy(model.transform.FindChild("protect(Clone)").gameObject);
			}
		}
		if(isSelectedBy){
			isSelectedBy = false;
		}
		if(spawned==true)
			spawned=false;
	}
	public function checkProtect(){
		if(protectedHit>0){
			if(protectedHit == 1){
				protector = -1;
				Destroy(model.transform.FindChild("protect(Clone)").gameObject);
			}
			protectedHit--;
		}
	}
	public function getSkill():skill{ // uncompleted
		print("1/2, protect or attack");
		var ans : int = 0 ;//new Scanner(System.in).nextInt();
		var sk:skill ;
		if(ans == 1){
			//sk = new protectSomeone(this);
		}
		else{
			//sk = new basicAttack(this);
		}
		return sk;
	}
	
	
	function nobug(){
	
	}
	/****
	
	Following 
		is 
			the 
				code
					for
						unity
							gameplay
		
	****/
	
	function ourAnimationPlay(num:int){
		var modelAnim : Animator = getModel().GetComponent.<Animator>() ;
		//Debug.Log(modelAnim);
		/*switch (num){
			case 1:  modelAnim.CrossFade("walk");break;
			case 2:  modelAnim.CrossFade("getHurt");break;
			case 3:  modelAnim.CrossFade("normal_Att");break;
			case 4:  modelAnim.CrossFade("magic_Att");break;
			case 5:  modelAnim.CrossFade("pray_magic");break;
			case 6:  modelAnim.CrossFade("round_Att");break;
			case 7:  modelAnim.CrossFade("knock_back");break;
			case 8:  modelAnim.CrossFade("nerf");break;
			default :  modelAnim.CrossFade("idle");break;
			  
		}*/
		if(modelAnim != null){
			modelAnim.SetInteger("action",num);
		}
	}
	
	function setlocation(x:int,y:int){
		gridPosition.x=x;
		gridPosition.y=y;
	}
	function OnMouseDown(){
		//transform.parent.SendMessage("getTargetPlace",LocX,LocY);
		//if(id==game_Process.instance.GetComponent.<game_Process>().currentplayer){
			/*if(incontrol==false){
				//var pl:GameObject = new GameObject("pl");
				//pl.setUp(19,19);
				Highlights.FindHighlight(newplane(),4);
				//game_Process.instance.SendMessage("ShowWalk"); 					//will change to askaction();
				incontrol=true;
			}
			else{
				//game_Process.instance.SendMessage("reset");
				incontrol=false;
			}*/
		var controller : GameObject= GameObject.Find("Main Game Controller");
		if(controller.GetComponent.<gameProcess>() != null){
			if(controller.GetComponent.<gameProcess>().skillStage==2){
				print(locationX+" "+locationY+" "+""+controller.GetComponent.<gameProcess>().bd.getBox(locationX,locationY).thisPlane.canSelect );
				if(controller.GetComponent.<gameProcess>().bd.getBox(locationX,locationY).thisPlane.canSelect == true){
					print(controller.GetComponent.<gameProcess>().skillStage);
					controller.GetComponent.<gameProcess>().skAddTarget(this);
				}
				gameProcess.instance.resetSelectPlane();
				gameProcess.instance.skillStage=0;
			}
		}else if(controller.GetComponent.<MultipleGameProcess>() != null){
			
			if(controller.GetComponent.<MultipleGameProcess>().skillStage==2){
					var this_box:box = controller.GetComponent.<MultipleGameProcess>().bd.getBoxByPersonID(id);
					if(this_box != null){
						if(this_box.thisPlane.canSelect == true){
							controller.GetComponent.<MultipleGameProcess>().skAddTarget(id);
						}
					}
					//if(controller.GetComponent.<MultipleGameProcess>().bd.getBox(locationX,locationY).thisPlane.canSelect == true){
					//	//print(controller.GetComponent.<MultipleGameProcess>().skillStage);
					//	controller.GetComponent.<MultipleGameProcess>().skAddTarget(this);
					//}
					//controller.GetComponent.<MultipleGameProcess>().resetSelectPlane();
					//controller.GetComponent.<MultipleGameProcess>().skillStage=0;
			}
			else if(controller.GetComponent.<MultipleGameProcess>().startSkill == false){
				//controller.GetComponent.<MultipleGameProcess>().canvasSkill.enabled = false;
				controller.GetComponent.<MultipleGameProcess>().SendMessage("zoom");
				//GameObject.Find("Main Camera").GetComponent.<MainCameraController>().SendMessage("GetCP",this.gameObject);
				
			}
		}
			//}
	}


//}
