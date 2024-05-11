#pragma strict
import System.Collections.Generic ;

public class PoringFSM extends FSM {

	enum  FSMState{None,Walk,Attack,saveKing,EndTurn,Dead};
	public var chaseDistance:int = 4;
	public var curState: FSMState;
	private var maxHealth:int;
	private var saving:boolean;
	private var King:PoringKingFSM;
	private var target:person;
	private var status:person;
	var enemy : List.<person> = new List.<person>();
	var walk : mySet[]=new mySet[4];
	var localX:int;
	var localY:int;
	var distance: int;
	var cal:Calculating;
	var bd:board;


	public function getHealth():float{
		return status.hp;
	}
	// Use this for initialization
	protected override function Initialize () 
	{
		saving=false;
		status = GetComponent.<person>();
		King = GameObject.FindWithTag("PoringKing").GetComponent.<PoringKingFSM>();
		maxHealth = status.fullHp;
		curState = FSMState.Walk;
		localX = Random.Range(0,13);
		localY = Random.Range(0,8);
	}
	
	function setEnemy(Enemy:List.<person>){
		enemy=Enemy;
	}

	protected override function FSMFixedUpdate()
		{
			distance=Mathf.Abs(localX-target.GetComponent.<person>().locationX)+Mathf.Abs(localY-(target.GetComponent.<person>().locationY+1));
			if(King.getHelp()==true)
				curState=FSMState.saveKing;
			else if (status.hp <= 0)
				curState = FSMState.Dead;
			else if(distance==1 && attacked==false)
				curState=FSMState.Attack;
			else if(walked==false)		
				curState=FSMState.Walk;
			else curstate=FSMState.EndTurn;
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
		if(curState==FSMState.Walk){
			var OKList:mySet[] = cal.go(enemy[id].getLocationX(),enemy[id].getLocationY(),target.GetComponent.<plane>().posX,target.GetComponent.<plane>().posY);
			var smallest:int = OKList.length;
			for(var i:int =startId;i<enemy.Count;i++){
				var OKList2:mySet[] = cal.go(enemy[i].getLocationX(),enemy[i].getLocationY(),target.GetComponent.<plane>().posX,target.GetComponent.<plane>().posY);
				var small:int = OKList2.length;
				if(small<smallest)
					id=i;
			}
			print (id);
			target = enemy[id];
		}
		else if(curState==FSMState.saveKing)
			target = GameObject.FindWithTag("PoringKing").GetComponent.<person>();
	}
	
	protected function getTarget(){
		controller.skAddTarget(target);
	}
	
	protected function UpdateWalkState(){
		walked=true;
		//if(distance==1){
		//	if(target.tag!="PoringKing")
		//		curState=FSMState.Attack;
		//}
		controller.walk2(bd.getBox(target.getLocationX(),target.getLocationY()).thisPlane);
	}
	
	protected function UpdateAttackState(){
		attacked=true;
		controller.GetComponent.<MultipleGameProcess>().useSkill01(1);
	}
	
	protected function UpdateSaveKingState(){
		setTarget();
		curState = FSMState.Chase;
	}
	
	protected function UpdateEndTurnState(){
		controller.endTurnProcess();
	}
	protected function UpdateDeadState(){
		GameObject.Destroy(gameObject);
	}
	
	 function OnTriggerEnter( col:Collider){
		if(col.gameObject.tag=="PoringKing")
			GameObject.Destroy(gameObject);
	}
}