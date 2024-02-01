import * as crypto from "crypto";

export function encryptPassword(str: string): string {
  return crypto.createHash("sha256").update(str).digest("hex");
}
