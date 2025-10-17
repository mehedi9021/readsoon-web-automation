import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { QueuePage } from "../pages/QueuePage";
import { DataReader } from "../utils/DataReader";

test("Add an article should succeed", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const queuePage = new QueuePage(page);

  await loginPage.userLogin();
  await page.waitForTimeout(3000);

  await queuePage
    .clickInsertUrlIcon()
    .then(() => queuePage.fillArticleUrl())
    .then(() => queuePage.clickAddButton());

  await page.waitForTimeout(5000);
  await page.reload();

  await queuePage.clickArticle();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(3000);

  const expectedParagraphs = DataReader.getParagraphs();
  await queuePage.assertParagraphsPresent(expectedParagraphs);
});

test("Creating a collection should succeed", async ({ page }) => {
  const collectionName = "test collection-1";
  const collectionDescription = "test description";
  const loginPage = new LoginPage(page);
  const queuePage = new QueuePage(page);

  await loginPage.userLogin();
  await page.waitForTimeout(3000);

  await queuePage.clickCreateCollectionButton()
    .then(() => queuePage.fillCollectionName(collectionName))
    .then(() => queuePage.fillCollectionDescriptionField(collectionDescription))
    .then(() => queuePage.clickCollectionCreateModalButton());

  await page.waitForTimeout(3000);
  await queuePage.clickCollectionMenu();

  await page.reload();
  await page.waitForTimeout(3000);

  const text = await queuePage.getCollectionName();
  expect(text).toContain(collectionName);
});

test("Adding a single article to a collection should succeed", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const queuePage = new QueuePage(page);

  await loginPage.userLogin();
  await page.waitForTimeout(3000);

  await queuePage
    .clickArticleMenuIcon()
    .then(() => queuePage.clickAddToCollectionIcon())
    .then(() => queuePage.chooseCollection())
    .then(() => queuePage.clickAddCollectionButton());
});

test("Adding multiple articles to a collection using bulk edit should succeed", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const queuePage = new QueuePage(page);

  await loginPage.userLogin();
  await page.waitForTimeout(3000);

  await queuePage
    .clickBulkEditIcon()
    .then(() => queuePage.selectMultipleArticle())
    .then(() => queuePage.clickBulkCollectionIcon())
    .then(() => queuePage.chooseCollection())
    .then(() => queuePage.clickAddCollectionButton());
});

test("Adding a single article to archive should succeed", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const queuePage = new QueuePage(page);

  await loginPage.userLogin();
  await page.waitForTimeout(3000);

  await queuePage
    .clickArticleMenuIcon()
    .then(() => queuePage.clickAddToArchiveIcon());

  await page.waitForTimeout(3000);
  await queuePage.clickArchiveMenu();

  await page.reload();
  await page.waitForTimeout(3000);

  const articleDiv = queuePage.getArticleDivOne();
  await expect(articleDiv).toBeVisible();
});

test("Adding multiple article to archive should succeed", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const queuePage = new QueuePage(page);

  await loginPage.userLogin();
  await page.waitForTimeout(3000);

  await queuePage
    .clickBulkEditIcon()
    .then(() => queuePage.selectMultipleArticle())
    .then(() => queuePage.clickBulkArchiveIcon());

  await page.waitForTimeout(3000);
  await queuePage.clickArchiveMenu();

  await page.reload();
  await page.waitForTimeout(3000);

  const articleDivOne = queuePage.getArticleDivOne();
  await expect(articleDivOne).toBeVisible();

  const articleDivTwo = queuePage.getArticleDivTwo();
  await expect(articleDivTwo).toBeVisible();
});

test("Add a single article to favorites should succeed", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const queuePage = new QueuePage(page);

  await loginPage.userLogin();
  await page.waitForTimeout(3000);

  await queuePage
    .clickArticleMenuIcon()
    .then(() => queuePage.clickAddToFavoriteIcon());

  await page.waitForTimeout(3000);
  await queuePage.clickFavoritesMenu();

  await page.reload();
  await page.waitForTimeout(3000);

  const articleDiv = queuePage.getArticleDivOne();
  await expect(articleDiv).toBeVisible();
});

test("Add multiple articles to favorites using bulk edit should succeed", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const queuePage = new QueuePage(page);

  await loginPage.userLogin();
  await page.waitForTimeout(3000);

  await queuePage
    .clickBulkEditIcon()
    .then(() => queuePage.selectMultipleArticle())
    .then(() => queuePage.clickBulkFavoriteIcon());

  await page.waitForTimeout(3000);
  await queuePage.clickFavoritesMenu();

  await page.reload();
  await page.waitForTimeout(3000);

  const articleDivOne = queuePage.getArticleDivOne();
  await expect(articleDivOne).toBeVisible();

  const articleDivTwo = queuePage.getArticleDivTwo();
  await expect(articleDivTwo).toBeVisible();
});

test("Adding highlights to an article should succeed", async ({ page }) => {
  const tags = "test";
  const loginPage = new LoginPage(page);
  const queuePage = new QueuePage(page);

  await loginPage.userLogin();
  await page.waitForTimeout(3000);

  await queuePage.clickArticle();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(3000);

  await queuePage.selectParagraph(0);
  await page.waitForTimeout(3000);

  await queuePage.clickHightlightButton();
  await page.waitForTimeout(3000);

  await queuePage.clickBackIcon()
    .then(() => queuePage.clickHighlightsMenu());

  await page.reload();
  await page.waitForTimeout(3000);

  const articleDiv = queuePage.getArticleDivOne();
  await expect(articleDiv).toBeVisible();
});

test("Adding tags to a single article should succeed", async ({ page }) => {
  const tags = "test";
  const loginPage = new LoginPage(page);
  const queuePage = new QueuePage(page);

  await loginPage.userLogin();
  await page.waitForTimeout(3000);

  await queuePage
    .clickArticleMenuIcon()
    .then(() => queuePage.clickAddTagIcon())
    .then(() => queuePage.fillTags(tags))
    .then(() => queuePage.clickSaveTagsButton());

  await page.waitForTimeout(3000);

  await queuePage
    .clickTagsMenu()
    .then(() => queuePage.clickTagButton());

  const articleDiv = queuePage.getArticleDivOne();
  await expect(articleDiv).toBeVisible();
});

test("Add tags to multiple articles using bulk edit should succeed", async ({ page }) => {
  const tags = "test";
  const loginPage = new LoginPage(page);
  const queuePage = new QueuePage(page);

  await loginPage.userLogin();
  await page.waitForTimeout(3000);

  await queuePage
    .clickBulkEditIcon()
    .then(() => queuePage.selectMultipleArticle())
    .then(() => queuePage.clickBulkTagIcon())
    .then(() => queuePage.fillTags(tags))
    .then(() => queuePage.clickSaveTagsButton());

  await page.waitForTimeout(3000);

  await queuePage
    .clickTagsMenu()
    .then(() => queuePage.clickTagButton());

  const articleDivOne = queuePage.getArticleDivOne();
  await expect(articleDivOne).toBeVisible();

  const articleDivTwo = queuePage.getArticleDivTwo();
  await expect(articleDivTwo).toBeVisible();
});

test("Add a video should succeed", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const queuePage = new QueuePage(page);

  await loginPage.userLogin();
  await page.waitForTimeout(3000);

  await queuePage
    .clickInsertUrlIcon()
    .then(() => queuePage.fillVideoUrl())
    .then(() => queuePage.clickAddButton());

  await page.waitForTimeout(5000);
  await page.reload();
});
