import { PrismaClient } from '@prisma/client';
import CryptoJS from "crypto-js";

const prisma = new PrismaClient();

// 사용자님이 제공해주신 환경변수 및 키 설정 로직
const secretKey = process.env.SECRET_KEY || "your-fallback-secret-key-32chars!!";
const key = CryptoJS.enc.Utf8.parse(secretKey.padEnd(32, " "));

/**
 * 🔐 비밀번호 암호화 (사용자님 제공 로직)
 */
async function hashedPassword(password: string): Promise<string> {
  const encrypted = CryptoJS.AES.encrypt(password, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

async function main() {
  // 1. 제공해주신 AES 방식으로 관리자 비밀번호 암호화
  const adminPassword = await hashedPassword('admin1234');

  console.log('🌱 Seeding database...');

  // 2. 기본 사용자 그룹 생성
  const adminGroup = await prisma.userGroup.upsert({
    where: { groupName: 'regular' },
    update: {},
    create: {
      groupName: 'regular',
      groupTitle: '정회원',
      groupDesc: '정회원입니다.',
    },
  });

  // 3. 기본 관리자 계정 생성 (AES 암호화된 비번 적용)
  const adminUser = await prisma.user.upsert({
    where: { accountId: 'admin' },
    update: {},
    create: {
      accountId: 'admin',
      email_address: 'admin@plextype.com',
      nickName: '운영자',
      password: adminPassword,
      isAdmin: true,
      isManagers: true,
    },
  });

  // 4. 'notice' 게시판 생성
  await prisma.posts.upsert({
    where: { postName: 'notice' },
    update: {},
    create: {
      pid: 'notice_board',
      postName: 'notice',
      postDesc: '공지사항 게시판입니다.',
      status: 'active',
    },
  });

  console.log('✅ Seed completed with AES encrypted password.');
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });