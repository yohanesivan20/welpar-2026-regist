import jwt from "jsonwebtoken";

export interface TokenPayload {
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export function verifyToken(
  token: string
): TokenPayload | null {
  try {
    const secret =
      process.env.JWT_SECRET || "";

    if (!secret) {
      throw new Error(
        "JWT_SECRET not configured"
      );
    }

    const decoded = jwt.verify(
      token,
      secret
    ) as TokenPayload;

    return decoded;
  } catch (err) {
    return null;
  }
}

export function createToken(
  email: string,
  role: string
): string {
  const secret =
    process.env.JWT_SECRET || "";

  if (!secret) {
    throw new Error(
      "JWT_SECRET not configured"
    );
  }

  return jwt.sign(
    {
      email,
      role,
    },
    secret,
    {
      expiresIn: "1d",
    }
  );
}
