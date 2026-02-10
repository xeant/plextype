const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt"); // bcrypt로 교체

const prisma = new PrismaClient();

// 환경변수 로드
const adminIdFromEnv = process.env.ADMIN_ACCOUNT_ID || "admin";
const adminPwFromEnv = process.env.ADMIN_PASSWORD || "admin1234";
const adminEmailFromEnv = process.env.ADMIN_EMAIL || "admin@test.com";
const adminNicknameFromEnv = process.env.ADMIN_NICKNAME || "운영자";
const saltRounds = 10; // bcrypt 보안 강도

async function main() {
  console.log("🌱 Seeding database (Bcrypt version)...");

  // 1. bcrypt를 이용한 비밀번호 해싱
  const hashedAdminPassword = await bcrypt.hash(adminPwFromEnv, saltRounds);

  // 2. 기본 사용자 그룹 생성
  await prisma.userGroup.upsert({
    where: { groupName: "regular" },
    update: {},
    create: {
      groupName: "regular",
      groupTitle: "정회원",
      groupDesc: "정회원입니다.",
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
    where: { postName: "notice" },
    update: {},
    create: {
      pid: "notice",
      postName: "notice",
      postDesc: "공지사항 게시판입니다.",
      status: "active",
    },
  });

  // 5. 주류 카테고리 데이터 생성
  const categories = [
    {
      id: 1,
      name: "위스키",
      parent: 0,
      depth: 1,
      order: 1,
      desc: "곡물을 발효시킨 후 증류하여 오크통에서 숙성시킨 술의 대명사로 전 세계적으로 사랑받는 증류주입니다.",
    },
    {
      id: 101,
      name: "싱글몰트",
      parent: 1,
      depth: 2,
      order: 1,
      desc: "한 곳의 증류소에서 100% 맥아(몰트)만을 사용하여 만든 위스키로 각 증류소의 개성이 뚜렷하게 나타납니다.",
    },
    {
      id: 102,
      name: "블렌디드",
      parent: 1,
      depth: 2,
      order: 2,
      desc: "다양한 몰트 위스키와 그레인 위스키를 최적의 비율로 섞어 조화롭고 부드러운 맛을 구현한 위스키입니다.",
    },
    {
      id: 103,
      name: "버번/아메리칸",
      parent: 1,
      depth: 2,
      order: 3,
      desc: "미국 법에 따라 옥수수를 51% 이상 사용하고 새 오크통에서 숙성하여 바닐라와 캐러멜 풍미가 강한 위스키입니다.",
    },
    {
      id: 104,
      name: "라이 위스키",
      parent: 1,
      depth: 2,
      order: 4,
      desc: "호밀(Rye)을 주원료로 사용하여 일반 위스키보다 스파이시하고 알싸한 풍미가 특징인 미국 전통 위스키입니다.",
    },
    {
      id: 105,
      name: "아이리시",
      parent: 1,
      depth: 2,
      order: 5,
      desc: "아일랜드에서 생산되며 주로 3번 증류하여 다른 위스키들에 비해 맛이 매우 가볍고 부드러운 것이 특징입니다.",
    },
    {
      id: 2,
      name: "와인",
      parent: 0,
      depth: 1,
      order: 2,
      desc: "포도를 발효시켜 만든 양조주로 기후와 토양(테루아)에 따라 무궁무진한 맛과 향을 가진 술입니다.",
    },
    {
      id: 201,
      name: "레드 와인",
      parent: 2,
      depth: 2,
      order: 1,
      desc: "포도 껍질의 색소와 탄닌 성분을 함께 추출하여 붉은 빛과 떫은 맛, 깊은 풍미를 가진 와인입니다.",
    },
    {
      id: 202,
      name: "화이트 와인",
      parent: 2,
      depth: 2,
      order: 2,
      desc: "주로 청포도로 만들며 껍질을 제거하고 과즙만 발효시켜 산뜻하고 청량한 산미가 돋보이는 와인입니다.",
    },
    {
      id: 203,
      name: "스파클링/샴페인",
      parent: 2,
      depth: 2,
      order: 3,
      desc: "와인 안에 탄산 가스가 포함되어 있어 톡 쏘는 식감을 주며 주로 축하 행사나 식전주로 인기가 높습니다.",
    },
    {
      id: 204,
      name: "주정강화",
      parent: 2,
      depth: 2,
      order: 4,
      desc: "발효 중 브랜디를 첨가해 도수를 18~20도 정도로 높인 와인으로 독특한 단맛과 견과류 향이 특징입니다.",
    },
    {
      id: 3,
      name: "브랜디",
      parent: 0,
      depth: 1,
      order: 3,
      desc: "와인이나 과일 발효액을 증류하여 만든 술로 주로 식후주로 즐기며 깊은 과일 향과 우아한 풍미를 자랑합니다.",
    },
    {
      id: 301,
      name: "꼬냑",
      parent: 3,
      depth: 2,
      order: 1,
      desc: "프랑스 코냑 지역에서 엄격한 AOC 규정에 따라 생산된 최상급 브랜디의 대명사입니다.",
    },
    {
      id: 302,
      name: "아르마냑",
      parent: 3,
      depth: 2,
      order: 2,
      desc: "코냑보다 역사가 오래된 프랑스 가스코뉴 지역의 브랜디로 거칠고 남성적인 풍미가 매력입니다.",
    },
    {
      id: 303,
      name: "칼바도스",
      parent: 3,
      depth: 2,
      order: 3,
      desc: "프랑스 노르망디 지역의 사과나 배를 원료로 한 증류주로 입안 가득 퍼지는 사과 향이 일품입니다.",
    },
    {
      id: 4,
      name: "진/보드카/기타",
      parent: 0,
      depth: 1,
      order: 4,
      desc: "곡물이나 식물을 원료로 한 다양한 증류주들로 칵테일 베이스나 스트레이트로 즐기는 강렬한 술입니다.",
    },
    {
      id: 401,
      name: "진",
      parent: 4,
      depth: 2,
      order: 1,
      desc: "쥬니퍼 베리와 각종 허브를 넣어 증류한 술로 특유의 상쾌한 솔향 덕분에 칵테일의 기주로 널리 쓰입니다.",
    },
    {
      id: 402,
      name: "보드카",
      parent: 4,
      depth: 2,
      order: 2,
      desc: "자작나무 숯으로 여과하여 잡미를 없앤 무색, 무취, 무미의 순수한 스피릿으로 어떤 음료와도 잘 어울립니다.",
    },
    {
      id: 403,
      name: "데킬라/메즈칼",
      parent: 4,
      depth: 2,
      order: 3,
      desc: "멕시코의 선인장 일종인 아가베 수액을 증류하여 만든 술로 특유의 흙 내음과 식물성 풍미가 특징입니다.",
    },
    {
      id: 404,
      name: "럼",
      parent: 4,
      depth: 2,
      order: 4,
      desc: "사탕수수나 당밀을 원료로 한 증류주로 과거 해적의 술로 불렸으며 달콤하고 이국적인 향을 지녔습니다.",
    },
    {
      id: 405,
      name: "리큐르",
      parent: 4,
      depth: 2,
      order: 5,
      desc: "증류주에 과일, 허브, 크림 등을 넣고 설탕을 첨가한 혼합주로 다채로운 색과 맛을 가진 술입니다.",
    },
  ];

  for (const cat of categories) {
    await prisma.drinkCategory.upsert({
      where: { categoryId: cat.id },
      update: {
        name: cat.name,
        parentId: cat.parent || 0,
        depth: cat.depth,
        listOrder: cat.order,
        description: cat.desc,
      },
      create: {
        categoryId: cat.id,
        name: cat.name,
        parentId: cat.parent || 0,
        depth: cat.depth,
        listOrder: cat.order,
        description: cat.desc,
        status: "active",
      },
    });
  }

  console.log("✅ Seed completed successfully with Bcrypt.");
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
