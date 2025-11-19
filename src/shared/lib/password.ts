import bcrypt from "bcryptjs";

/**
 * Хеширует пароль
 */
export async function hashPassword(password: string): Promise<string> {
	return await bcrypt.hash(password, 12);
}

/**
 * Проверяет пароль
 */
export async function verifyPassword(
	password: string,
	hashedPassword: string,
): Promise<boolean> {
	return await bcrypt.compare(password, hashedPassword);
}

