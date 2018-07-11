interface IDead {
  kind: "dead"
}
interface IAlive {
  kind: "alive"
}

type State = IAlive | IDead;

const ALIVE = <IAlive>{toString: () => "alive"};
const DEAD = <IDead>{toString: () => "dead"};

const survives = (numberOfLivingNeighbors : number) => numberOfLivingNeighbors === 2 || numberOfLivingNeighbors === 3;

const booleanToLiveState = isAlive => isAlive ? ALIVE : DEAD;

const isBorn = numberOfLivingNeighbors => numberOfLivingNeighbors === 3;

const tick = (liveState: State, numberOfLivingNeighbors) => booleanToLiveState(
  liveState == ALIVE ? survives(numberOfLivingNeighbors) : isBorn(numberOfLivingNeighbors)
);


describe('tick', () => {
  const cases = [
    {state: ALIVE, numberOfLivingNeighbors: 1, result: DEAD},
    {state: ALIVE, numberOfLivingNeighbors: 2, result: ALIVE},
    {state: ALIVE, numberOfLivingNeighbors: 3, result: ALIVE},
    {state: ALIVE, numberOfLivingNeighbors: 2, result: ALIVE},
    {state: DEAD, numberOfLivingNeighbors: 3, result: ALIVE},
    {state: DEAD, numberOfLivingNeighbors: 4, result: DEAD},
  ];

  cases.forEach(c => { 
    it(`should return ${c.result} for an ${c.state} cell with ${c.numberOfLivingNeighbors} living neighbors`, () => {
      expect(tick(c.state, c.numberOfLivingNeighbors)).toEqual(c.result)
    });
  });

});
