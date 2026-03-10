import type { FileHash } from "../../app/ports/file-hash.js";

/**
 * TODO: implement SHA-256 hashing for files.
 */
export class Sha256FileHash implements FileHash {
	public async hashFile(_path: string): Promise<string> {
		throw new Error("Not implemented: Sha256FileHash.hashFile");
	}
}
