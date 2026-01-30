# 💎 PlexType
**Modular, Type-Safe Development Kit for Modern Web Applications.**

`PlexType`은 **"복합적인 구조(Plex)"**와 **"엄격한 타입 안정성(Type)"**을 결합한 차세대 개발 프레임워크입니다. Next.js App Router 환경에서 반복되는 UI 패턴과 비즈니스 로직을 모듈화하여 개발 생산성을 극대화합니다.



---

## 🚀 Core Philosophy

* **Plexibility (Plex + Flexibility):** 파편화된 UI와 로직을 계층적으로 조립하여 복합적인 기능을 손쉽게 구현합니다.
* **Type-Safety First:** 모든 데이터 흐름과 인터페이스에 TypeScript를 적용하여 런타임 에러를 최소화합니다.
* **Ready-to-Use:** shadcn/ui 스타일의 컴포넌트, 전역 상태 관리를 위한 커스텀 훅, 인증 시스템이 이미 통합되어 있습니다.

---

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 15+ (App Router), TypeScript |
| **Styling** | Tailwind CSS, Framer Motion |
| **Data Handling** | TanStack Query (React Query), Prisma ORM |
| **Authentication** | JWT, CryptoJS (AES Encryption), HttpOnly Cookies |
| **Database** | MySQL, PostgreSQL |

---

## 📦 Package Structure

`@plextype`은 논리적으로 분리된 여러 모듈로 구성되어 있습니다.

* **`@plextype/components`**: `Avatar`, `Dropdown`, `Nav` 등 고도로 재사용 가능한 원자적 UI 요소.
* **`@plextype/hooks`**: `useUser`, `useAuth` 등 비즈니스 로직과 상태 관리를 캡슐화한 커스텀 훅.
* **`@plextype/utils`**: JWT 인증, 날짜 변환, CryptoJS 기반의 보안 라이브러리.

---

## ✨ Key Features

### 1. Unified Auth System
`Next.js Route Handlers`와 `HttpOnly Cookie`를 이용한 안전한 세션 관리 및 **Silent Refresh** 패턴이 내장되어 있습니다. 토큰 만료 시 자동으로 갱신 프로세스를 수행합니다.

### 2. Smart UI Components
유저 상태에 따라 동적으로 변하는 스마트 컴포넌트를 제공하며, 데이터 로딩 시 레이아웃 시프트를 방지하는 Skeleton UI 대응이 되어 있습니다.

### 3. Database Seeding & Schema
Prisma를 활용한 체계적인 DB 설계와 관리자 계정, 기본 그룹 정보, 공지사항(`notice`) 게시판 등을 자동으로 구성하는 시드 스크립트를 포함합니다.

---

## 🏁 Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/Gjworks/plextype.git](https://github.com/Gjworks/plextype.git)
cd plextype
