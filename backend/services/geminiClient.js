require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

class GeminiClient {
  constructor(apiKeys, modelName = 'gemini-2.0-flash') {
    this.apiKeys = apiKeys;
    this.modelName = modelName;
    this.currentKeyIndex = 0;
    this.failedKeys = {}; 
    this.cooldown = 60000; 
    this.client = this._createClient(this.apiKeys[this.currentKeyIndex]);
  }

  _createClient(apiKey) {
    return new GoogleGenerativeAI(apiKey);
  }

  _isKeyInCooldown(index) {
    const failedAt = this.failedKeys[index];
    if (!failedAt) return false;
    return Date.now() - failedAt < this.cooldown;
  }

  async _switchKey() {
    const totalKeys = this.apiKeys.length;
    const startingIndex = this.currentKeyIndex;

    let attempts = 0;
    while (attempts < totalKeys) {
      this.currentKeyIndex = (this.currentKeyIndex + 1) % totalKeys;
      if (!this._isKeyInCooldown(this.currentKeyIndex)) {
        console.log(`🔁 Switching to key #${this.currentKeyIndex + 1}`);
        this.client = this._createClient(this.apiKeys[this.currentKeyIndex]);
        return;
      }
      attempts++;
    }

    console.warn("⚠️ All keys are in cooldown. Waiting 60 seconds...");
    await new Promise(res => setTimeout(res, this.cooldown));
    this.failedKeys = {}; // Reset all keys
    this.client = this._createClient(this.apiKeys[this.currentKeyIndex]);
  }

  async getStream(prompt) {
    const totalKeys = this.apiKeys.length;
    let retries = 0;

    while (retries < totalKeys) {
      try {
        const model = this.client.getGenerativeModel({ model: this.modelName });
        const result = await model.generateContentStream({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        });
        return result.stream;
      } catch (err) {
        console.error(`🚫 GeminiClient Error on key #${this.currentKeyIndex + 1}:`, err.message);

        if (err.message.includes("quota") || err.message.includes("429")) {
          this.failedKeys[this.currentKeyIndex] = Date.now();
          await this._switchKey();
          retries++;
        } else {
          throw err;
        }
      }
    }

    throw new Error("❌ All API keys failed or are in cooldown.");
  }
}

module.exports = GeminiClient;
