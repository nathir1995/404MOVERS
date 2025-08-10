import type { NextApiRequest, NextApiResponse } from "next";
import { adminAuth, adminDb } from "../../firebase/admin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") return res.status(405).end("Method Not Allowed");

    const token = (req.query.token as string) || "";
    if (!token) return res.status(400).json({ error: "Missing token" });

    const snap = await adminDb.collection("emailTokens").doc(token).get();
    if (!snap.exists) return res.status(400).json({ error: "Invalid token" });

    const data = snap.data() as { uid: string; type: string; expiresAt: number };
    if (data.type !== "verify") return res.status(400).json({ error: "Invalid token type" });
    if (Date.now() > data.expiresAt) return res.status(400).json({ error: "Token expired" });

    await adminAuth.updateUser(data.uid, { emailVerified: true });
    await adminDb.collection("emailTokens").doc(token).delete();

    const base = process.env.NEXT_PUBLIC_BASE_URL!;
    res.writeHead(302, { Location: `${base}/verified` });
    return res.end();
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
