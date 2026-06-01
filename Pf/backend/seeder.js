const { PrismaClient } = require('@prisma/client');

const gamesData = [
  {
    title: 'Batman',
    description: 'Embrace the darkness and become the legendary Dark Knight...',
    price: 180,
    image: 'image/batman.png',
    genre: 'Action',
    promotion: false
  },
  {
    title: 'Spider-Man',
    description: 'Swing into action as the iconic web-slinger in Spider-Man...',
    price: 250,
    image: 'image/spiderman.png',
    genre: 'Action',
    promotion: false
  },
  {
    title: 'Ghost of Tsushima',
    description: 'Immerse yourself in feudal Japan\'s gripping tale of honor and sacrifice...',
    price: 200,
    image: 'image/ghost.png',
    genre: 'Action',
    promotion: false
  },
  {
    title: 'Silent Hill 2',
    description: 'Descend into the depths of terror with Silent Hill 2...',
    price: 184,
    image: 'image/silenthill1.jpg',
    genre: 'Horror',
    promotion: false
  },
  {
    title: 'God of War',
    description: 'Embark on a breathtaking journey as Kratos...',
    price: 220,
    image: 'image/godofwar.png',
    genre: 'Action',
    promotion: false
  },
  {
    title: 'The Last of Us 2',
    description: 'Unleash the power of humanity\'s survival instinct in The Last of Us Part II...',
    price: 280,
    image: 'image/lastofus.png',
    genre: 'Action',
    promotion: false
  }
];

const prisma = new PrismaClient();

async function seed() {
  try {
    for (let game of gamesData) {
      await prisma.game.create({
        data: game,
      });
    }
    console.log('Games seeded successfully!');
  } catch (error) {
    console.error('Error seeding games:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
