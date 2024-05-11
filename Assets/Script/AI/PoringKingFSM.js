#pragma strict

public class PoringKingFSM extends FSM {
	enum  FSMState{None,Normal,Berserk,Heal,CallHelper,Dead};
	private var curState:FSMState;
	private var health: int;
	private var maxHealth:int;
	private var healed:boolean;
	private var help:boolean;
	private var status:person ;

	public function getHealth():int{
		return health;
	}
	
	public 

	public function getHelp():boolean{
		return help;
	}

	public function setHealth(increase:int ){
		if (increase + health < maxHealth)
						health += increase;
				else
						health = maxHealth;
		status.hp=health;
	}

	protected override function FSMFixedUpdate()
	{
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
	var curstate: FSMState;
	// Use this for initialization
	protected override function Initialize() {
		curstate = FSMState.Normal;
	}

	protected function UpdateNormalState(){
		if (health <= maxHealth * 0.4f)
			curstate = FSMState.Berserk;
	}
	protected function UpdateBerserkState(){

		if (health <= maxHealth * 0.2f) 
				if (healed == false)
						curstate = FSMState.Heal;
				else
						curstate = FSMState.CallHelper;

	}
	protected function UpdateHealState(){
		health += maxHealth * 0.4f;
		healed = true;
	}
	protected function UpdateCallHelperState(){
		//for(Poring on board)
			//Poring.saving=true;
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