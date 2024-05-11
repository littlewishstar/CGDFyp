#pragma strict

public class PoringKingFSM extends FSM {
	enum  FSMState{None,Normal,Berserk,Heal,CallHelper,Dead,EndTurn};
	private var curState:FSMState;
	private var lastState:FSMState;
	private var maxHealth:int;
	private var healed:boolean;
	private var help:boolean;
	private var hit:boolean;
	var enemy : List.<person> = new List.<person>();
	var fd : List.<person> = new List.<person>();

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
		if (increase + status.hp < maxHealth)
					status.hp += increase;
				else
					status.hp = maxHealth;
	}

	override function FSMFixedUpdate(bd :board)
	{
		if(status.hp > maxHealth*0.4f)
			curState = FSMState.EndTurn;
		else if (status.hp <= maxHealth * 0.4f) {
			help = false;
			curState = FSMState.Berserk;
		}
		else if (status.hp <= maxHealth * 0.2f){
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
		maxHealth=status.fullHp;
		Debug.Log("maxHealth : "+maxHealth+" health: "+status.hp);
	}

	protected function UpdateNormalState(){
		lastState=curState;
		Debug.Log("King Normal");
		curState = FSMState.EndTurn;
	}
	
	protected function UpdateBerserkState(){
		lastState=curState;
		Debug.Log("KingBerserk");
		controller = GameObject.Find("Main Game Controller");
		controller.GetComponent.<MultipleGameProcess>().useSkill01(Random.Range(0,2));
		curState = FSMState.EndTurn;
	}
	
	
	protected function UpdateHealState(){
		addHealth(maxHealth * 0.4f);
		healed = true;
		curState = FSMState.Normal;
	}
	
	protected function UpdateCallHelperState(){
		lastState=curState;
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