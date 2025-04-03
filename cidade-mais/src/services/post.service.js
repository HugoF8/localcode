const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar post
async function createPost(data) {
    return prisma.post.create({ data });
}

// Buscar todos os Posts
async function getAllPosts() {
    return prisma.post.findMany();
}

module.exports = { createPost, getAllPosts };
