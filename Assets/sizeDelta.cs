using UnityEngine;
using System.Collections;

public class sizeDelta : MonoBehaviour {

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		RectTransform tool = transform.GetComponent<RectTransform> ();
		tool.sizeDelta = new Vector2(800,64*2);
	}
}
