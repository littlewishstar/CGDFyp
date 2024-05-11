#pragma strict
import System.Collections.Generic ;

public class PoringFSM extends FSM {

	enum  FSMState{None,Walk,Attack,saveKing,EndTurn,Dead};
	public var chaseDistance:int = 4;
	public var curState: FSMState;
	private var maxHealth:int;
	private var King:FSM;
	private var target:person;
	private var hp:int=100;
	var enemy : List.<person> = new List.<person>();
	var fd : List.<person> = new List.<person>();
	var walkTo:plane;
	var localX:int;
	var localY:int;
	var distance: int=10;

	
	var haveKing:boolean=false;

	public function getHealth():float{
		return status.hp;
	}
	// Use this for initialization
	protected override function Initialize () 
	{
	//	King = GameObject.FindWithTag("PoringKing").GetComponent.<PoringKingFSM>();
		maxHealth = status.fullHp;
		curState = FSMState.Walk;
		//localX = Random.Range(0,13);
	//	localY = Random.Range(0,8);
		haveKing=false;
	}
	
	function FSMsetEnemyAndFd(allPerson:List.<person>){
		for(var i:int=0;i<allPerson.Count;i++){
			if(allPerson[i].team!=status.team)
				enemy.Add(allPerson[i]);
			else
				fd.Add(allPerson[i]);
			if(allPerson[i].getName()=="PoringKing"){
				King = allPerson[i].getAI();
				haveKing=true;
			}
		}
	}

	override function FSMFixedUpdate(bd :board){
		
		this.bd = bd;
		cal =new Calculating(bd);
		setTarget();
//			Debug.Log(status.getLocationX()+' '+status.getLocationY()+' '+target.getLocationX()+' '+target.getLocationY());
		distance=Mathf.Abs(status.getLocationX()-target.getLocationX())+Mathf.Abs(status.getLocationY()-target.getLocationY());
//		print("disn "+distance);
//		print("me "+status.getLocationX()+","+status.getLocationY()+" tar "+target.getLocationX()+target.getLocationY());
		//Debug.Log(King.getHelp());
		if(haveKing == true && King.getHelp()==true){
			curState=FSMState.saveKing;
		}
		else if (hp <= 0){
			curState = FSMState.Dead;
		}
		else if(distance==1 && attacked==false){
			curState=FSMState.Attack;
		}
		else if(walked==false){	
			curState=FSMState.Walk;
		}
		else {
			curState=FSMState.EndTurn;
		}
		
//		print("Poring "+status.getId()+" update " + curState);
		switch (curState)
		{
			case FSMState.Walk: UpdateWalkState(); break;
			case FSMState.Attack: UpdateAttackState(); break;
			case FSMState.saveKing: UpdateSaveKingState(); break;
			case FSMState.EndTurn: UpdateEndTurnState(); break;
			case FSMState.Dead: UpdateDeadState(); break;
		}
	}

	protected function setTarget(){
		var id:int=0;
			//print(status.getLocationX()+","+status.getLocationY()+","+enemy[0].getLocationX()+","+enemy[0].getLocationY());
		if(walked == false){
			
			if(curState==FSMState.saveKing){
				if(haveKing==true)
					target = GameObject.FindWithTag("PoringKing").GetComponent.<person>();
			}else{
				
				var smallest:int=100;
		//		print("setTarget: "+status.getLocationX()+","+status.getLocationY()+","+enemy[0].getLocationX()+","+enemy[0].getLocationY());
				if(!enemy[0].dead){
					var OKList:mySet[] = cal.go2(status.getLocationX(),status.getLocationY(),enemy[0].getLocationX(),enemy[0].getLocationY());
					smallest = OKList.length;
				}
				for(var i:int =1;i<enemy.Count;i++){
				//Debug.Log("set target loop");
					if(!enemy[i].dead){
						var OKList2:mySet[] = cal.go2(status.getLocationX(),status.getLocationY(),enemy[i].getLocationX(),enemy[i].getLocationY());
						var small:int = OKList2.length;
						if(small<smallest){
							id=i;
							smallest=small;
						}
					}
				}
			}
//			print ("target enemy id : "+id);
			target = enemy[id];

			distance=Mathf.Abs(status.getLocationX()-target.getLocationX())+Mathf.Abs(status.getLocationY()-target.getLocationY());
		}
	}
	
	function FSMgetTarget(){
		controller.GetComponent.<MultipleGameProcess>().skAddTarget(target);
	}
	
	protected function UpdateWalkState(){
		//print("Poring walk");
		//setTarget();
		walked=true;
		cal.treeRecursive(status.getLocationX(),status.getLocationY(),status.getSt());
		var OKList : List.<plane> = cal.getOKList();
		var id:int=0;
		//walkTo=OKList[id];
		if(!target.dead){
			var smallest:float=Vector3.Distance(OKList[id].gameObject.transform.position,target.model.transform.position);
//			Debug.Log("testing Count " +OKList.Count);
			for(var i:int=1;i<OKList.Count;i++){
				//Debug.Log("testing id " +id);
				var small:float=Vector3.Distance(OKList[i].gameObject.transform.position,target.model.transform.position);
				if(small<smallest){
					id=i;
					smallest=small;
				}
			}
//			Debug.Log("testing id " +id);
			walkTo=OKList[id];
			controller = GameObject.Find("Main Game Controller");
			controller.GetComponent.<MultipleGameProcess>().SendMessage("walk2",walkTo);
		}else{
			walked = false;
			//FSMFixedUpdate(bd);
		}
		print("Poring "+status.getId()+" walk" + walked);
	}
	
	protected function UpdateAttackState(){
		Debug.Log("Poring attack");
		attacked=true;
		controller.GetComponent.<MultipleGameProcess>().useSkill01(status.skill_List[0]);
	}
	
	protected function UpdateSaveKingState(){
		print("Poring SaveK");
		walked=true;
		cal.treeRecursive(status.getLocationX(),status.getLocationY(),status.getSt());
		var OKList : List.<plane> = cal.getOKList();
		var id:int=0;
		walkTo=OKList[id];
		var smallest:float=Vector3.Distance(OKList[id].gameObject.transform.position,target.model.transform.position);
		for(var i:int=1;i<OKList.Count;i++){
			var small:float=Vector3.Distance(OKList[i].gameObject.transform.position,target.model.transform.position);
			if(small<smallest){
				id=i;
				smallest=small;
			}
		}
		walkTo=OKList[id];
		controller = GameObject.Find("Main Game Controller");
		controller.GetComponent.<MultipleGameProcess>().SendMessage("walk2",walkTo);
	}
	
	function UpdateEndTurnState(){
		attacked=false;
		walked=false;
		controller = GameObject.Find("Main Game Controller");
		controller.GetComponent.<MultipleGameProcess>().SendMessage("endTurnProcess");
	}
	protected function UpdateDeadState(){
		GameObject.Destroy(gameObject);
	}
	
	 function OnTriggerEnter( col:Collider){
		if(col.gameObject.tag=="PoringKing")
			GameObject.Destroy(gameObject);
	}
}