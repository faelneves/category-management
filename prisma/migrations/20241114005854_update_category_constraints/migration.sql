-- DropIndex
DROP INDEX "unique_name_per_parent";

-- RenameForeignKey
ALTER TABLE "Category" RENAME CONSTRAINT "Category_parentId_fkey" TO "fk_category_parent";
