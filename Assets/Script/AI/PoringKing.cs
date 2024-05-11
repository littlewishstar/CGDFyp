using UnityEngine;
using System.Collections;

public class PoringKing : FSM {
	public enum FSMState
	{
		None,
		Normal,
		Berserk,
		Heal,
		CallHelper,
		Dead,
	}
	private FSMState curState;
	private float health=10000.0f;
	private float maxHealth=10000.0f;
	private bool healed;
	private bool help;

	public float getHealth(){
		return health;
	}

	public bool getHelp(){
		return help;
	}

	public void setHealth(int add){
		if (add + health < maxHealth)
						health += add;
				else
						health = maxHealth;
	}

	protected override void FSMUpdate()
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
	public FSMState curstate;
	// Use this for initialization
	protected override void Initialize() {
		curstate = FSMState.Normal;
	}

	protected void UpdateNormalState(){
		if (health <= maxHealth * 0.4f)
			curstate = FSMState.Berserk;
	}
	protected void UpdateBerserkState(){

		if (health <= maxHealth * 0.2f) 
				if (healed == false)
						curstate = FSMState.Heal;
				else
						curstate = FSMState.CallHelper;

	}
	protected void UpdateHealState(){
		health += maxHealth * 0.4f;
		healed = true;
	}
	protected void UpdateCallHelperState(){
		//for(Poring on board)
			//Poring.saving=true;
		help = true;
			if (health > maxHealth * 0.3f) {
				help = false;
				curState = FSMState.Berserk;
			}
	}
	protected void UpdateDeadState(){
		Destroy (gameObject);
	}
}
