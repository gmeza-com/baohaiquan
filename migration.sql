
ALTER TABLE `baohaiquanvietnam.vn`.`posts`
ADD COLUMN `hits` INT UNSIGNED NULL DEFAULT 1 AFTER `status`;

ALTER TABLE `baohaiquanvietnam.vn`.`post_category_languages`
ADD COLUMN `description` TEXT NULL DEFAULT '' AFTER `post_category_id`;

ALTER TABLE `baohaiquanvietnam.vn`.`menu_items`
ADD COLUMN `active` INT UNSIGNED NULL DEFAULT 1 AFTER `level`;
UPDATE `baohaiquanvietnam.vn`.`menu_items` SET `active` = 0 WHERE id IN (109, 111, 138);

ALTER TABLE `baohaiquanvietnam.vn`.`post_languages`
ADD FULLTEXT INDEX `post_languages_fulltext_index` (`name`, `content`) VISIBLE;
OPTIMIZE TABLE `baohaiquanvietnam.vn`.`post_languages`;