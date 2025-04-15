const { getAllUtilizadores } = require('../../src/services/utilizador.service');


test('Deve retornar uma lista de utilizadores (array)', async () => {
    const utilizadores = await getAllUtilizadores();
    expect(Array.isArray(utilizadores)).toBe(true);
});