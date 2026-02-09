const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt'); // bcrypt로 교체

const prisma = new PrismaClient();

// 환경변수 로드
const adminIdFromEnv = process.env.ADMIN_ACCOUNT_ID || "admin";
const adminPwFromEnv = process.env.ADMIN_PASSWORD || "admin1234";
const adminEmailFromEnv = process.env.ADMIN_EMAIL || "admin@test.com";
const adminNicknameFromEnv = process.env.ADMIN_NICKNAME || "운영자";
const saltRounds = 10; // bcrypt 보안 강도

async function main() {
  console.log('🌱 Seeding database (Bcrypt version)...');

  // 1. bcrypt를 이용한 비밀번호 해싱
  const hashedAdminPassword = await bcrypt.hash(adminPwFromEnv, saltRounds);

  // 2. 기본 사용자 그룹 생성
  await prisma.userGroup.upsert({
    where: { groupName: 'regular' },
    update: {},
    create: {
      groupName: 'regular',
      groupTitle: '정회원',
      groupDesc: '정회원입니다.',
    },
  });

  // 3. 기본 관리자 계정 생성
  await prisma.user.upsert({
    where: { accountId: adminIdFromEnv },
    update: {},
    create: {
      accountId: adminIdFromEnv,
      email_address: adminEmailFromEnv,
      nickName: adminNicknameFromEnv,
      password: hashedAdminPassword, // 해싱된 비밀번호 저장
      isAdmin: true,
      isManagers: true,
    },
  });

  console.log(`✅ Seed completed. Admin ID: ${adminIdFromEnv}`);

  // 4. 'notice' 게시판 생성 로직 (동일)
  await prisma.posts.upsert({
    where: { postName: 'notice' },
    update: {},
    create: {
      pid: 'notice',
      postName: 'notice',
      postDesc: '공지사항 게시판입니다.',
      status: 'active',
    },
  });

  // 5. 주류 카테고리 데이터 생성
  const categories = [
    // 대분류 (parentId: 0)
    { id: 1, name: '위스키', depth: 1, order: 1, desc: '전 세계의 다양한 위스키' },
    { id: 2, name: '와인', depth: 1, order: 2, desc: '포도주 및 과실주' },
    { id: 3, name: '브랜디', depth: 1, order: 3, desc: '꼬냑, 아르마냑 등 증류주' },
    { id: 4, name: '기타 주류', depth: 1, order: 4, desc: '진, 보드카, 테킬라 등' },

    // 위스키 하위 (parentId: 1)
    { id: 101, name: '싱글몰트', parent: 1, depth: 2, order: 1, desc: '단일 증류소 몰트 위스키' },
    { id: 102, name: '블렌디드', parent: 1, depth: 2, order: 2, desc: '몰트와 그레인의 조화' },
    { id: 103, name: '버번/아메리칸', parent: 1, depth: 2, order: 3, desc: '미국 옥수수 기반 위스키' },

    // 와인 하위 (parentId: 2)
    { id: 201, name: '레드 와인', parent: 2, depth: 2, order: 1, desc: '적포도주' },
    { id: 202, name: '화이트 와인', parent: 2, depth: 2, order: 2, desc: '백포도주' }
  ];

  for (const cat of categories) {
    await prisma.drinkCategory.upsert({
      where: { categoryId: cat.id },
      update: {
        name: cat.name,
        parentId: cat.parent || 0,
        depth: cat.depth,
        listOrder: cat.order,
        description: cat.desc
      },
      create: {
        categoryId: cat.id,
        name: cat.name,
        parentId: cat.parent || 0,
        depth: cat.depth,
        listOrder: cat.order,
        description: cat.desc,
        status: 'active',
      },
    });
  }
  

  console.log('✅ Seed completed successfully with Bcrypt.');
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });