const request = require("supertest");
const app = require("../../src/app");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function registerAndLoginUser() {
  const email = `user${Date.now()}@test.com`;
  const password = "password123";

  // Regista o utilizador
  await request(app)
    .post("/auth/register")
    .send({
      email,
      password,
      name: "Test User"
    });

  // Faz login
  const loginRes = await request(app)
    .post("/auth/login")
    .send({
      email,
      password
    });

  const token = loginRes.body.token;

  return { token, email };
}

async function registerAndLoginModerator() {
  const email = `mod${Date.now()}@test.com`;
  const password = "password123";

  // Cria diretamente um moderador na base de dados
  const moderator = await prisma.utilizador.create({
    data: {
      email,
      password, // idealmente devias encriptar ou usar o mesmo hash do sistema
      nome: "Test Moderator",
      tipo_utilizador: "moderador", // Certifica-te que tens este role definido
      data_nascimento: new Date("2000-01-01"),
    }
  });

  // Faz login
  const loginRes = await request(app)
    .post("/auth/login")
    .send({
      email,
      password
    });

  const token = loginRes.body.token;

  return { token, email };
}

module.exports = {
  registerAndLoginUser,
  registerAndLoginModerator
};
