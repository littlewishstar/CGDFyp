using UnityEngine;
using System.Collections;

public class CharacterGB : MonoBehaviour {
	private Animator animator;
	private CanvasGroup canvasGroup;

	public bool Isopen{
		get{ return animator.GetBool("open");
		}
		set{ animator.SetBool("open", value);
		}
	}
	public void Awake(){
		animator = GetComponent<Animator>();
		canvasGroup = GetComponent<CanvasGroup>();

		var rect = GetComponent<RectTransform>();
		rect.offsetMax = rect.offsetMin = new Vector2(0,0);
	}
	public void Updata(){
		if (!animator.GetCurrentAnimatorStateInfo(0).IsName ("Open")){
			canvasGroup.blocksRaycasts = canvasGroup.interactable = false;
		}
		else{
			canvasGroup.blocksRaycasts = canvasGroup.interactable = true;
		}
	}
}