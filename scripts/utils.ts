import { execa } from "execa";

export async function run(bin: string, args: string[], opts = {}): Promise<void> {
  await execa(bin, args, { stdio: 'inherit', ...opts })
}