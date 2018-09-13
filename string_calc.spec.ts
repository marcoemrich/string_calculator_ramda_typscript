import { map, pipe, split, sum, reduce, add, filter, gt, __, lt, ifElse, has, contains, any, match, replace } from "ramda";


const commaSeparatedNumbersFromString = str => pipe(
  removePrefix, 
  split(extractSeparator(str)), 
  map(Number))(str);

const negative = lt(__, 0);

const anyNegative: (l: number[]) => boolean = any(negative)

const sumOfUnder1000s: (l: number[]) => number = pipe(filter(lt(__, 1000)), sum);

const throwNegativeNumberError = () => { throw Error("Contains a negative number!"); };

const extractSeparator = str => match(/^\/\/(.)\//, str)[1] || ',';

const removePrefix = str => replace(/^\/\/.\//, '', str);

const calc: (str: string) => Number =
  pipe(
    commaSeparatedNumbersFromString, 
    ifElse( 
      anyNegative, 
      throwNegativeNumberError, 
      sumOfUnder1000s
  ));

describe('removePrefix', () => {
  it('should return a string without Prefix', () => {
    expect(removePrefix("//x/1x2x3")).toEqual("1x2x3");
  });
  it('should return the whole string if there is no Prefix', () => {
    expect(removePrefix("1,2,3")).toEqual("1,2,3");
  });

});

describe('extractSeparator', () => {
  it('should find a separator', () => {
    expect(extractSeparator("//x/1x2x3")).toEqual("x");
  });
  it('should have a default of ,', () => {
    expect(extractSeparator("1,2,3")).toEqual(",");
  });
});

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

  it('should only add numbers < 1000', () => {
    expect(calc("1,2,3,1000")).toEqual(6);
  });

  it('should throw an exception for negative numbers', () => {
    expect(() => calc("1,-1,2")).toThrowError();
  });

  it('should allow a custom separator', () => {
    expect(calc("//x/1x2x3")).toEqual(6);
  });

});

describe('commaSeparatedNumbersFromString', () => {
  it('should allow a custom separator', () => {
    expect(commaSeparatedNumbersFromString("//x/1x2x3")).toEqual([1, 2, 3]);
  });
});
