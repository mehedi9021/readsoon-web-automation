import { BasePage } from "./BasePage";
import { Locator } from "@playwright/test";
import { ConfigReader } from "../utils/ConfigReader";

const articleUrl = ConfigReader.getProperty("ARTICLE_URL");
const videoUrl = ConfigReader.getProperty("VIDEO_URL");

export class QueuePage extends BasePage {
  private insertUrlIcon = "div.relative.transition-all button";
  private urlInput = "input.w-full.bg-transparent.text-sm";
  private addButton = ".gap-2.whitespace-nowrap.justify-center";
  private articleCard = ".p-4.relative.flex-grow";
  private paragraphSelector = "div.jsx-59ab90e03a25dfa7.prose";
  private createCollectionButton = "button:has-text('Create Collection')";
  private collectionNameField = ".flex.w-full.h-11";
  private descriptionField = ".flex.w-full.h-11";
  private collectionCreateModalButton = ".inline-flex.items-center.px-4.py-2";
  private collectionMenu = "Collections";
  private archiveMenu = "Archive";
  private favoritesMenu = "Favorites";
  private tagsMenu = "Tags";
  private highlightsMenu = "Highlights";
  private collectionNameText = ".flex.flex-col.shadow-md.p-4";
  private articleMenuIcon = "button.ring-0.grid.text-foreground";
  private chooseCollectionDropdown = ".flex.w-full.items-center.justify-between.ring-0";
  private addCollectionButton = ".inline-flex.items-center.h-12";
  private bulkEditIcon = ".rounded-md.p-2.text-foreground";
  private bulkActionIcon = ".p-1";
  private tagField = ".flex.flex-wrap.rounded-md.p-2";
  private saveTagsButton = ".inline-flex.items-center.justify-center.text-white";
  private tagButton = ".inline-flex.cursor-pointer";
  private highlightButton = "text='Highlight'";
  private backIcon = "button.inline-flex.hover\\:bg-accent.text-foreground";

  getArticleDivOne(): Locator {
    return this.page.locator(this.articleCard).first();
  }

  getArticleDivTwo(): Locator {
    return this.page.locator(this.articleCard).nth(1);
  }

  async clickSaveTagsButton() {
    await this.page.locator(this.saveTagsButton).click();
  }

  async clickBulkCollectionIcon() {
    await this.page.locator(this.bulkActionIcon).last().click();
    return this;
  }

  async clickBulkArchiveIcon() {
    await this.page.locator(this.bulkActionIcon).nth(2).click();
    return this;
  }

  async clickBulkFavoriteIcon() {
    await this.page.locator(this.bulkActionIcon).nth(1).click();
    return this;
  }

  async clickBulkTagIcon() {
    await this.page.locator(this.bulkActionIcon).nth(0).click();
    return this;
  }

  async selectMultipleArticle() {
    await this.page.locator(this.articleCard).nth(0).click();
    await this.page.locator(this.articleCard).nth(1).click();
    return this;
  }

  async clickBulkEditIcon() {
    await this.page.locator(this.bulkEditIcon).first().click();
    return this;
  }

  async clickAddCollectionButton() {
    await this.page.locator(this.addCollectionButton).last().click();
    return this;
  }

  async chooseCollection() {
    await this.page.locator(this.chooseCollectionDropdown).click();
    await this.page.waitForTimeout(3000);
    await this.page.keyboard.press('Enter');
    return this;
  }

  async fillTags(tags: string) {
    await this.page.locator(this.tagField).click();
    await this.page.keyboard.type(tags);
    await this.page.keyboard.press('Enter');
  }

  async clickAddToArchiveIcon() {
    const archiveIcon = this.page.getByRole('menuitem', { name: 'Archive' });
    archiveIcon.click();
  }

  async clickAddToFavoriteIcon() {
    const favoriteIcon = this.page.getByRole('menuitem', { name: 'Favorite' });
    favoriteIcon.click();
  }

  async clickAddTagIcon() {
    const tagIcon = this.page.getByRole('menuitem', { name: 'Tag' });
    tagIcon.click();
  }

  async clickAddToCollectionIcon() {
    const archiveButton = this.page.getByRole('menuitem', { name: 'Add to Collection' });
    archiveButton.click();
  }

  async clickArticleMenuIcon() {
    await this.page.locator(this.articleMenuIcon).first().click();
    return this;
  }

  async clickHighlightsMenu() {
    await this.page.getByText(this.highlightsMenu).first().click();
    return this;
  }

  async clickBackIcon() {
    await this.page.locator(this.backIcon).last().click();
    return this;
  }

  async getCollectionName() {
    const element = this.page.locator(this.collectionNameText).first();
    const text = await element.textContent();
    return text;
  }

  async clickCollectionMenu() {
    await this.page.getByText(this.collectionMenu).first().click();
    return this;
  }

  async clickArchiveMenu() {
    await this.page.getByText(this.archiveMenu).first().click();
    return this;
  }

  async clickFavoritesMenu() {
    await this.page.getByText(this.favoritesMenu).first().click();
    return this;
  }

  async clickTagsMenu() {
    await this.page.getByText(this.tagsMenu).first().click();
    return this;
  }

  async selectParagraph(nth: number) {
    const paragraph = this.page.locator("p").nth(nth);
    await paragraph.waitFor({ state: "visible" });
    await paragraph.click({ clickCount: 3 });
  }

  async clickHightlightButton() {
    await this.page.locator(this.highlightButton).first().click();
    return this;
  }

  async clickTagButton() {
    await this.page.locator(this.tagButton).nth(0).click();
    return this;
  }

  async clickCreateCollectionButton() {
    await this.page.locator(this.createCollectionButton).click();
    return this;
  }

  async fillCollectionName(collectionName: string) {
    await this.page.locator(this.collectionNameField).first().fill(collectionName)
    return this;
  }

  async clickCollectionCreateModalButton() {
    await this.page.locator(this.collectionCreateModalButton).last().click();
    return this;
  }

  async fillCollectionDescriptionField(collectionDescription: string) {
    await this.page.locator(this.descriptionField).last().fill(collectionDescription)
    return this;
  }

  async clickInsertUrlIcon() {
    await this.page.locator(this.insertUrlIcon).first().click();
    return this;
  }

  async fillArticleUrl() {
    await this.page.locator(this.urlInput).fill(articleUrl);
    return this;
  }

  async fillVideoUrl() {
    await this.page.locator(this.urlInput).fill(videoUrl);
    return this;
  }

  async clickAddButton() {
    await this.page.locator(this.addButton).click();
  }

  async clickArticle() {
    await this.page.locator(this.articleCard).first().click();
  }

  async getPageParagraphText(): Promise<string> {
    await this.scrollToEnd();
    return await this.page.locator(this.paragraphSelector).last().innerText();
  }

  normalizeText(text: string): string {
    return text.replace(/\s+/g, " ").trim();
  }

  async assertParagraphsPresent(expectedParagraphs: string[]) {
    const pageText = await this.getPageParagraphText();

    const missing: string[] = [];
    for (const p of expectedParagraphs) {
      if (!this.normalizeText(pageText).includes(this.normalizeText(p))) {
        missing.push(p);
      }
    }

    if (missing.length > 0) {
      console.log("Missing paragraphs:");
      missing.forEach(m => console.log(m + "\n"));
      throw new Error("Some paragraphs are missing from the page!");
    } else {
      console.log("All paragraphs are present!");
    }
  }

  async scrollToEnd() {
    let previousHeight = 0;
    while (true) {
      await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await this.page.waitForTimeout(1000);

      const currentHeight = await this.page.evaluate(() => document.body.scrollHeight);
      if (currentHeight === previousHeight) break;
      previousHeight = currentHeight;
    }
  }
}
