import fs from "fs";
import path from "path";

export class DataReader {
  static getParagraphs(): string[] {
    const filePath = path.resolve("resources/data.txt");
    const content = fs.readFileSync(filePath, "utf-8");
    return content.split(/\r?\n\s*\r?\n/);
  }
}
