#pragma strict

public class poringKing {

	public static function getSkill(i:int,pr:person):skill{
		
		if(i==0)
			return new roundAttack(pr);
		else if(i==1)
			return new highRoundAttack(pr);
		return null;
	}
}