#pragma strict

public class PoringKingFSM extends FSM {
	enum  FSMState{None,Normal,Berserk,Heal,CallHelper,Dead};
	private var curState:FSMState;
	private var health: int;
	private var maxHealth:int;
	private var healed:boolean;
	private var help:boolean;
	private var hit:boolean;
	private var target:person;
	var enemy : List.<person> = new List.<person>();
	var fd : List.<person> = new List.<person>();

	public function getHealth():int{
		return health;
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
	
	public function setHealth(increase:int ){
		if (increase + health < maxHealth)
						health += increase;
				else
						health = maxHealth;
		status.hp=health;
	}

	override function FSMFixedUpdate(bd :board)
	{
		cal =new Calculating(bd);
		switch (curState)
		{
		case FSMState.Normal: UpdateNormalState(); break;
		case FSMState.Berserk: UpdateBerserkState(); break;
		case FSMState.Heal: UpdateHealState(); break;
		case FSMState.CallHelper: UpdateCallHelperState(); break;
		case FSMState.Dead: UpdateDeadState(); break;
		}
		
		//Go to dead state is no health left
		if (health <= 0)
			curState = FSMState.Dead;
	}
	// Use this for initialization
	protected override function Initialize() {
		curState = FSMState.Normal;
		health=100000.0f;
		
	}

	protected function UpdateNormalState(){
		if (health <= maxHealth * 0.4f)
			curState = FSMState.Berserk;
	}
	
	protected function UpdateBerserkState(){

		if (health <= maxHealth * 0.2f) 
				if (healed == false)
						curState = FSMState.Heal;
				else
						curState = FSMState.CallHelper;
	}
	
	
	protected function UpdateHealState(){
		setHealth(maxHealth * 0.4f);
		healed = true;
	}
	
	protected function UpdateCallHelperState(){
		help = true;
			if (health > maxHealth * 0.3f) {
				help = false;
				curState = FSMState.Berserk;
			}
	}
	
	protected function UpdateDeadState(){
		Destroy (gameObject);
	}
}