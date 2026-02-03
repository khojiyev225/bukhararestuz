require('dotenv').config({ path: 'apps/api/.env' });
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const users = [
    { name: 'Admin', phone: '+998900000001', password: 'Admin123!', role: 'ADMIN' },
    { name: 'Manager', phone: '+998900000002', password: 'Manager123!', role: 'MANAGER' },
    { name: 'Courier', phone: '+998900000003', password: 'Courier123!', role: 'COURIER' },
    { name: 'Client', phone: '+998900000004', password: 'Client123!', role: 'CLIENT' },
  ];

  for (const user of users) {
    const hash = await bcrypt.hash(user.password, 10);
    await prisma.user.upsert({
      where: { phone: user.phone },
      update: { name: user.name, role: user.role, passwordHash: hash },
      create: { name: user.name, phone: user.phone, passwordHash: hash, role: user.role },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .then(() => console.log('Seed users created'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
