/*
In a town, there are N people labelled from 1 to N.  There is a rumor that one of
these people is secretly the town judge.

If the town judge exists, then:

The town judge trusts nobody.
Everybody (except for the town judge) trusts the town judge.
There is exactly one person that satisfies properties 1 and 2.
You are given trust, an array of pairs trust[i] = [a, b] representing that the person labelled a trusts the person labelled b.

If the town judge exists and can be identified, return the label of the town judge.  Otherwise, return -1.

Example 1:
Input: N = 2, trust = [[1,2]]
Output: 2

Example 2:
Input: N = 3, trust = [[1,3],[2,3]]
Output: 3

Example 3:
Input: N = 3, trust = [[1,3],[2,3],[3,1]]
Output: -1

Example 4:
Input: N = 3, trust = [[1,2],[2,3]]
Output: -1

Example 5:
Input: N = 4, trust = [[1,3],[1,4],[2,3],[2,4],[4,3]]
Output: 3

https://leetcode.com/problems/find-the-town-judge/
*/

/*
La persona que sea el juez tiene que tener N - 1 votos de confianza, ya que todos confian
en el, entonces si son 3 personas y entre ellos son 3 votos, 2 personas deben de votar en el
juez, entonces el juez debe de tener N - 1 votos.

En el loop decrementamos los votos que pueden tener si una persona sale que confia en la otra,
y al que le confian incrementamos ya que esa es la persona que puede ser el candidato como
el town of judge.

Ya que hicimos este conteo, finalmente debemos verificar si el número de votos es igual a
N - 1, si sí, hemos encontrado al juez, en caso contrario no lo hemos encontrado y regresamos
-1
*/
// Time O(N)
var findJudge = function(N, trust) {
    // To find the town judge minimum people need to trust N - 1
    if(trust.length < N - 1) {
        return -1;
    }
    
    let outtrust = new Array(N+1).fill(0);
    for(let i = 0; i < trust.length; i++) {
        let elem = trust[i];
        outtrust[elem[0]]--;
        outtrust[elem[1]]++;
    }
    
    for(let i = 1; i <= N ; i++) {
        // The judge is trusted by everybody except himself
        // then it must have N - 1 votes
        if(outtrust[i] === N - 1) {
            return i;
        }
    }
    return -1;
};
