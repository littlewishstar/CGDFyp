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
//		print("disn "+distance);
//		print("me "+status.getLocationX()+","+status.getLocationY()+" tar "+target.getLocationX()+target.getLocationY());
		Debug.Log(King.getHelp());
		if(haveKing == true && King.getHelp()==true)
			curState=FSMState.saveKing;
		else if (hp <= 0)
			curState = FSMState.Dead;
		else if(distance==1 && attacked==false)
			curState=FSMState.Attack;
		else if(walked==false)		
			curState=FSMState.Walk;
		else curState=FSMState.EndTurn;
				print("Poring update " + curState);
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
			if(curState==FSMState.saveKing)
				target = GameObject.FindWithTag("PoringKing").GetComponent.<person>();
			else{
		//		print("setTarget: "+status.getLocationX()+","+status.getLocationY()+","+enemy[0].getLocationX()+","+enemy[0].getLocationY());
				var OKList:mySet[] = cal.go2(status.getLocationX(),status.getLocationY(),enemy[0].getLocationX(),enemy[0].getLocationY());
				var smallest:int = OKList.length;
				for(var i:int =id;i<enemy.Count;i++){
					var OKList2:mySet[] = cal.go2(status.getLocationX(),status.getLocationY(),enemy[i].getLocationX(),enemy[i].getLocationY());
					var small:int = OKList2.length;
					if(small<smallest)
						id=i;
				}
			}
				//print (id);
				target = enemy[id];

			distance=Mathf.Abs(status.getLocationX()-target.getLocationX())+Mathf.Abs(status.getLocationY()-target.getLocationY());
		}
	}
	
	function FSMgetTarget(){
		controller.GetComponent.<MultipleGameProcess>().skAddTarget(target);
	}
	
	protected function UpdateWalkState(){
		print("Poring walk");
		//setTarget();
		walked=true;
		var realOKList:mySet[]=cal.go2(status.getLocationX(),status.getLocationY(),target.getLocationX(),target.getLocationY());
		if(realOKList.length<=4){
			Debug.Log("reach");
			controller = GameObject.Find("Main Game Controller");
			for(var i:int =0;i<realOKList.Length;i++)
				print(realOKList[i].x+","+realOKList[i].y);
			controller.GetComponent.<MultipleGameProcess>().SendMessage("walk2",bd.getBox(realOKList[realOKList.Length-2].x,realOKList[realOKList.Length-2].y).thisPlane);
			status.setLocation(realOKList[realOKList.Length-2].x,realOKList[realOKList.Length-2].y);
		}
		else{
			Debug.Log("going");
			controller = GameObject.Find("Main Game Controller");
			controller.GetComponent.<MultipleGameProcess>().SendMessage("walk2",bd.getBox(realOKList[3].x,realOKList[3].y).thisPlane);
			status.setLocation(realOKList[3].x,realOKList[3].y);
			}
		distance=Mathf.Abs(status.getLocationX()-target.getLocationX())+Mathf.Abs(status.getLocationY()-target.getLocationY());
	}
	
	protected function UpdateAttackState(){
		Debug.Log("Poring attack");
				attacked=true;
		controller.GetComponent.<MultipleGameProcess>().useSkill01(0);
	}
	
	protected function UpdateSaveKingState(){
		print("Poring SaveK");
		setTarget();
		var realOKList=cal.go2(status.getLocationX(),status.getLocationY(),target.getLocationX(),target.getLocationY());
		if(realOKList.length<=4)
			controller.GetComponent.<MultipleGameProcess>().walk2(bd.getBox(target.getLocationX(),target.getLocationY()).thisPlane);
		else
			controller.GetComponent.<MultipleGameProcess>().walk2(bd.getBox(realOKList[3].x,realOKList[3].y).thisPlane);
		if(King.getHelp()==false)
			curState=FSMState.Attack;
	}
	
	function UpdateEndTurnState(){
		attacked=false;
		walked=false;
		controller.GetComponent.<MultipleGameProcess>().endTurnProcess();
	}
	protected function UpdateDeadState(){
		GameObject.Destroy(gameObject);
	}
	
	 function OnTriggerEnter( col:Collider){
		if(col.gameObject.tag=="PoringKing")
			GameObject.Destroy(gameObject);
	}
}