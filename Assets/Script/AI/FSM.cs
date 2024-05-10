using UnityEngine;
using System.Collections;

public class FSM : MonoBehaviour 
{
    protected virtual void Initialize() { }
    protected virtual void FSMUpdate() { }
    protected virtual void FSMFixedUpdate() { }

	// Use this for initialization
	void Start () //unity start
    {
        Initialize();
	}
	
	// Update is called once per frame
	void Update () //unity update
    {
        FSMUpdate();
	}

    void FixedUpdate() //fixed time update
    {
        FSMFixedUpdate();
    }    
}
