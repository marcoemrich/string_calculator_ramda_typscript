import {map, pipe, split, sum} from "ramda";


const calc : (string) => Number = pipe(
  split(','), 
  map(Number), 
  sum);


describe('calc', () => {
  it('should return a single number', () => {
    expect(calc("2")).toEqual(2);
  })

  it('should return 0 for an empty string', () => {
    expect(calc("")).toEqual(0);
  })

  it('should return the sum of multiple numbers', () => {
    expect(calc("1,2,3")).toEqual(6);
  })

});

