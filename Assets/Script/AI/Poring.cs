using UnityEngine;
using System.Collections;

public class Poring : FSM {
	public enum FSMState
	{
		None,
		Chase,
		Attack,
		saveKing,
		Dead,
	}

	public FSMState curState;
	private float health=1000.0f;
	private float maxHealth = 1000.0f;
	private bool saving;

	public float getHealth(){
		return health;
	}

	protected override void Initialize () 
	{
		curState = FSMState.Chase;
	}
	// Use this for initialization
	protected override void FSMUpdate()
		{
			switch (curState)
			{
			case FSMState.Chase: UpdateChaseState(); break;
			case FSMState.Attack: UpdateAttackState(); break;
			case FSMState.saveKing: UpdateSaveKingState(); break;
			case FSMState.Dead: UpdateDeadState(); break;
			}

			
			//Go to dead state is no health left
			if (health <= 0)
				curState = FSMState.Dead;
		}
	protected void UpdateChaseState(){

	}
	protected void UpdateAttackState(){

	}
	protected void UpdateSaveKingState(){

	}
	protected void UpdateDeadState(){
		Destroy (gameObject);
	}
	void OnTriggerEnter(Collider col){
		Destroy (gameObject);
	}
}