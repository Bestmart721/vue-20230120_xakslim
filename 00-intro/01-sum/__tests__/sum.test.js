const { sum } = require(global.getSolutionPath('sum'));

describe('intro/sum', () => {
  describe('Функция sum', () => {
    it('Функция sum должна быть определена', () => {
      expect(sum).toBeDefined();
    });

    it.each`
      a     | b     | expected
      ${1}  | ${1}  | ${2}
      ${10} | ${20} | ${30}
      ${0}  | ${0}  | ${0}
      ${-2} | ${-1} | ${-3}
    `('Функция sum должна получать $a + $b = $expected', ({ a, b, expected }) => {
      expect(sum(a, b)).toBe(expected);
    });
  });
});
