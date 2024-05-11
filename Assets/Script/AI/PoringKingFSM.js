#pragma strict

public class PoringKingFSM extends FSM {
	enum  FSMState{None,Normal,Berserk,Heal,CallHelper,Dead,EndTurn};
	private var curState:FSMState;
	//private var lastState:FSMState;
	private var healed:boolean;
	private var help:boolean;
	private var hit:boolean;
	var enemy : List.<person> = new List.<person>();
	var fd : List.<person> = new List.<person>();
	private var target:person;

	public function getHealth():int{
		return status.hp;
	}
	
	public function getHelp():boolean{
		return help;
	}
	
	
	
	function FSMsetEnemyAndFd(allPerson:List.<person>){
		for(var i:int=0;i<allPerson.Count;i++)
			if(allPerson[i].team!=status.team)
				enemy.Add(allPerson[i]);
			else
				fd.Add(allPerson[i]);
	}
	
	private function addHealth(increase:int ){
		if (increase + status.hp < status.fullHp)
					status.hp += increase;
				else
					status.hp = status.fullHp;
	}

	override function FSMFixedUpdate(bd :board)
	{
		Debug.Log("king hp: "+status.hp);
		if( status.hp > status.fullHp*0.4f || curState==FSMState.Berserk || curState==FSMState.Heal)
			curState = FSMState.EndTurn;
		else if (status.hp <= status.fullHp * 0.4f && status.hp > status.fullHp * 0.2f) {
			help = false;
			curState = FSMState.Berserk;
		}
		else if (status.hp <= status.fullHp * 0.2f){
			if (healed == false)
				curState = FSMState.Heal;
			else
				curState = FSMState.CallHelper;
		}
		cal =new Calculating(bd);
		Debug.Log(curState);
		
		switch (curState)
		{
		case FSMState.Normal: UpdateNormalState(); break;
		case FSMState.Berserk: UpdateBerserkState(); break;
		case FSMState.Heal: UpdateHealState(); break;
		case FSMState.CallHelper: UpdateCallHelperState(); break;
		case FSMState.EndTurn:	UpdateEndTurnState();	break;
		case FSMState.Dead: UpdateDeadState(); break;
		}
		
		//Go to dead state is no health left
		if (status.hp <= 0)
			curState = FSMState.Dead;
	}
	// Use this for initialization
	protected override function Initialize() {
		curState = FSMState.Normal;
		Debug.Log("status.fullHp : "+status.fullHp+" health: "+status.hp);
	}

	protected function UpdateNormalState(){
		//lastState=curState;
		Debug.Log("King Normal");
		curState = FSMState.EndTurn;
	}
	
	protected function UpdateBerserkState(){
		//lastState=curState;
		
		Debug.Log("KingBerserk");
		controller = GameObject.Find("Main Game Controller");
		//Debug.Log(curState);
		controller.GetComponent.<MultipleGameProcess>().useSkill01(status.skill_List[0]);
	}
	
	function FSMgetTarget(){
		var num:int;
		do{
			num=Random.Range(0,enemy.Count);
			target=enemy[num];
		}while(enemy[num].dead==true);
		controller.GetComponent.<MultipleGameProcess>().skAddTarget(target);
	}
	
	protected function UpdateHealState(){
		addHealth(status.fullHp * 0.6f);
		healed = true;
		controller.GetComponent.<MultipleGameProcess>().SendMessage("endTurnProcess");
	}
	
	protected function UpdateCallHelperState(){
		//lastState=curState;
		help = true;
		Debug.Log("calling");
	}
	
	protected function UpdateDeadState(){
		Destroy (gameObject);
	}
	public function UpdateEndTurnState(){
		//curState=lastState;
		Debug.Log("King State : "+ curState);
		controller = GameObject.Find("Main Game Controller");
		controller.GetComponent.<MultipleGameProcess>().SendMessage("endTurnProcess");
	}

}