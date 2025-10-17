import * as fs from "fs";
import * as path from "path";

export class ConfigReader {
    private static properties: Record<string, string> = {};

    static loadConfig(): void {
        const configPath = path.join(__dirname, "../config/config.properties");
        const data = fs.readFileSync(configPath, "utf-8");
        data.split("\n").forEach((line) => {
            const [key, value] = line.split("=");
            if (key && value) {
                this.properties[key.trim()] = value.trim();
            }
        });
    }

    static getProperty(key: string): string {
        if (Object.keys(this.properties).length === 0) {
            this.loadConfig();
        }
        return this.properties[key];
    }
}
