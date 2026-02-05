-- CreateEnum
CREATE TYPE "PermissionSubject" AS ENUM ('guest', 'member', 'admin', 'group');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "isAdmin" BOOLEAN,
    "isManagers" BOOLEAN,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "profileImage" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGroup" (
    "id" SERIAL NOT NULL,
    "groupName" TEXT NOT NULL,
    "groupTitle" VARCHAR(45) NOT NULL,
    "groupDesc" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGroupUser" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserGroupUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT,
    "categoryId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "published" BOOLEAN DEFAULT false,
    "userId" INTEGER,
    "authorName" VARCHAR(45),
    "authorPassword" TEXT,
    "title" VARCHAR(255),
    "content" TEXT,
    "isNotice" BOOLEAN DEFAULT false,
    "isSecrets" BOOLEAN DEFAULT false,
    "readCount" INTEGER DEFAULT 0,
    "commentCount" INTEGER DEFAULT 0,
    "voteCount" INTEGER DEFAULT 0,
    "resourceId" INTEGER NOT NULL,
    "resourceType" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(45) NOT NULL,
    "desc" TEXT,
    "color" VARCHAR(45),
    "order" INTEGER NOT NULL DEFAULT 0,
    "parentId" INTEGER,
    "resourceId" INTEGER,
    "resourceType" TEXT NOT NULL DEFAULT 'posts',

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" SERIAL NOT NULL,
    "pid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postName" TEXT NOT NULL,
    "postDesc" TEXT,
    "grant" JSON,
    "config" JSON,
    "status" VARCHAR(45),

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "subjectType" "PermissionSubject" NOT NULL,
    "subjectId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resourceId" INTEGER NOT NULL DEFAULT 0,
    "resourceType" TEXT NOT NULL DEFAULT 'unknown',

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "documentId" INTEGER NOT NULL,
    "userId" INTEGER,
    "authorName" VARCHAR(45),
    "authorPassword" VARCHAR(255),
    "parentId" INTEGER,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "isSecret" BOOLEAN NOT NULL DEFAULT false,
    "voteCount" INTEGER NOT NULL DEFAULT 0,
    "depth" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentViewLog" (
    "id" SERIAL NOT NULL,
    "documentId" INTEGER NOT NULL,
    "userId" INTEGER,
    "ipAddress" TEXT,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentViewLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "resourceId" INTEGER NOT NULL,
    "documentId" INTEGER,
    "resourceType" TEXT NOT NULL,
    "tempId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_accountId_key" ON "User"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_address_key" ON "User"("email_address");

-- CreateIndex
CREATE UNIQUE INDEX "User_nickName_key" ON "User"("nickName");

-- CreateIndex
CREATE INDEX "idx_user_email" ON "User"("email_address");

-- CreateIndex
CREATE INDEX "idx_user_isAdmin" ON "User"("isAdmin");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_phone_key" ON "Profile"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGroup_groupName_key" ON "UserGroup"("groupName");

-- CreateIndex
CREATE INDEX "idx_ugu_user" ON "UserGroupUser"("userId");

-- CreateIndex
CREATE INDEX "idx_ugu_group" ON "UserGroupUser"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGroupUser_userId_groupId_key" ON "UserGroupUser"("userId", "groupId");

-- CreateIndex
CREATE UNIQUE INDEX "Document_uuid_key" ON "Document"("uuid");

-- CreateIndex
CREATE INDEX "idx_document_resource" ON "Document"("resourceType", "resourceId");

-- CreateIndex
CREATE INDEX "idx_document_category" ON "Document"("categoryId");

-- CreateIndex
CREATE INDEX "idx_document_user" ON "Document"("userId");

-- CreateIndex
CREATE INDEX "idx_category_parent" ON "Category"("parentId");

-- CreateIndex
CREATE INDEX "idx_category_resource" ON "Category"("resourceType", "resourceId");

-- CreateIndex
CREATE UNIQUE INDEX "Posts_pid_key" ON "Posts"("pid");

-- CreateIndex
CREATE UNIQUE INDEX "Posts_postName_key" ON "Posts"("postName");

-- CreateIndex
CREATE INDEX "idx_posts_status" ON "Posts"("status");

-- CreateIndex
CREATE INDEX "idx_permission_resource" ON "Permission"("resourceType", "resourceId");

-- CreateIndex
CREATE INDEX "idx_permission_subject" ON "Permission"("subjectType", "subjectId");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_uuid_key" ON "Comment"("uuid");

-- CreateIndex
CREATE INDEX "idx_comment_document" ON "Comment"("documentId");

-- CreateIndex
CREATE INDEX "idx_comment_user" ON "Comment"("userId");

-- CreateIndex
CREATE INDEX "idx_comment_parent" ON "Comment"("parentId");

-- CreateIndex
CREATE INDEX "DocumentViewLog_documentId_userId_idx" ON "DocumentViewLog"("documentId", "userId");

-- CreateIndex
CREATE INDEX "DocumentViewLog_documentId_ipAddress_idx" ON "DocumentViewLog"("documentId", "ipAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Attachment_uuid_key" ON "Attachment"("uuid");

-- CreateIndex
CREATE INDEX "idx_attachment_resource" ON "Attachment"("resourceType", "resourceId");

-- CreateIndex
CREATE INDEX "idx_attachment_user" ON "Attachment"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroupUser" ADD CONSTRAINT "UserGroupUser_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "UserGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGroupUser" ADD CONSTRAINT "UserGroupUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;
