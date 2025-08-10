import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { adminAuth, adminDb } from "../../../firebase/admin";
import { sendEmail } from "../../../services/notification/mail";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

    const { email, password, displayName, role } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ ok: false, error: "Missing email/password" });
    }

    // Create Firebase Auth user (or skip if you already do this elsewhere)
    const user = await adminAuth.createUser({
      email,
      password,
      displayName,
      emailVerified: false,
    });

    if (role === "mover") {
      await adminAuth.setCustomUserClaims(user.uid, { role: "mover" });
    }

    // One-time token (24h)
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = Date.now() + 1000 * 60 * 60 * 24;

    await adminDb.collection("emailTokens").doc(token).set({
      uid: user.uid,
      email,
      type: "verify",
      expiresAt,
      createdAt: Date.now(),
    });

    const base = process.env.NEXT_PUBLIC_BASE_URL!;
    const verifyUrl = `${base}/api/verify?token=${token}`;

    await sendEmail(
      email,
      "Verify your 404Movers account",
      `
      <div style="font-family:system-ui,Segoe UI,Roboto">
        <h2>Verify your email</h2>
        <p>Thanks for signing up as a mover. Click the button below to verify your email.</p>
        <p><a href="${verifyUrl}" style="display:inline-block;padding:10px 16px;text-decoration:none;border:1px solid #ddd;border-radius:8px">Verify Email</a></p>
        <p>Or paste this link in your browser:<br>${verifyUrl}</p>
        <p>This link expires in 24 hours.</p>
      </div>`
    );

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return res.status(400).json({ ok: false, error: err.message });
  }
}
