import * as SecureStore from 'expo-secure-store';

interface VerificationToken {
  email: string;
  token: string;
  expiresAt: number;
  verified: boolean;
}

const VERIFICATION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

// Mock sendEmail - integrate with SendGrid in production
const sendEmail = async (options: { to: string; subject: string; html: string }) => {
  console.log('Email would be sent:', options);
  // In production, call SendGrid API here
};

export class EmailVerificationService {
  /**
   * Generate a verification token for email confirmation
   */
  static async generateVerificationToken(email: string): Promise<string> {
    // Generate random token
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const expiresAt = Date.now() + VERIFICATION_EXPIRY;

    const verificationData: VerificationToken = {
      email,
      token,
      expiresAt,
      verified: false,
    };

    // Store in secure storage (in production, also store in database)
    await SecureStore.setItemAsync(
      `verification_${email}`,
      JSON.stringify(verificationData)
    );

    return token;
  }

  /**
   * Send verification email to user
   */
  static async sendVerificationEmail(email: string, userName: string): Promise<void> {
    const token = await this.generateVerificationToken(email);
    const verificationLink = `https://kingdomexecutor.com/verify?token=${token}&email=${encodeURIComponent(email)}`;

    const emailContent = `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #0a1a2e 0%, #16213e 100%); padding: 40px; border-radius: 12px; color: #fff;">
          <h1 style="margin: 0 0 10px 0; font-size: 28px;">Welcome to Kingdom Executor Studio</h1>
          <p style="margin: 0; color: #d4af37; font-size: 14px;">Verify Your Email Address</p>
        </div>

        <div style="padding: 30px; background: #f5f5f5; margin-top: 0;">
          <p style="margin: 0 0 20px 0; font-size: 16px; color: #333;">
            Hi ${userName},
          </p>

          <p style="margin: 0 0 20px 0; font-size: 14px; color: #666; line-height: 1.6;">
            Thank you for joining Kingdom Executor Studio! To complete your registration and unlock all premium features, please verify your email address by clicking the button below.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" style="
              display: inline-block;
              padding: 14px 40px;
              background: linear-gradient(135deg, #0a7ea4 0%, #00d4ff 100%);
              color: white;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              font-size: 16px;
              transition: transform 0.2s;
            ">
              Verify Email Address
            </a>
          </div>

          <p style="margin: 20px 0; font-size: 12px; color: #999;">
            Or copy and paste this link in your browser:
          </p>
          <p style="margin: 0 0 20px 0; font-size: 12px; color: #0a7ea4; word-break: break-all;">
            ${verificationLink}
          </p>

          <p style="margin: 20px 0 0 0; font-size: 12px; color: #999;">
            This link expires in 24 hours.
          </p>
        </div>

        <div style="padding: 20px; background: #fff; border-top: 1px solid #eee; text-align: center; font-size: 12px; color: #999;">
          <p style="margin: 0;">
            Kingdom Executor Studio | Align Your Brand with Divine Purpose
          </p>
          <p style="margin: 5px 0 0 0;">
            © 2026 Kingdom Executor Studio. All rights reserved.
          </p>
        </div>
      </div>
    `;

    await sendEmail({
      to: email,
      subject: 'Verify Your Email - Kingdom Executor Studio',
      html: emailContent,
    });
  }

  /**
   * Verify email token
   */
  static async verifyEmailToken(email: string, token: string): Promise<boolean> {
    try {
      const stored = await SecureStore.getItemAsync(`verification_${email}`);

      if (!stored) {
        return false;
      }

      const verificationData: VerificationToken = JSON.parse(stored);

      // Check if token matches
      if (verificationData.token !== token) {
        return false;
      }

      // Check if token expired
      if (Date.now() > verificationData.expiresAt) {
        await SecureStore.deleteItemAsync(`verification_${email}`);
        return false;
      }

      // Mark as verified
      verificationData.verified = true;
      await SecureStore.setItemAsync(
        `verification_${email}`,
        JSON.stringify(verificationData)
      );

      return true;
    } catch (error) {
      console.error('Email verification error:', error);
      return false;
    }
  }

  /**
   * Check if email is verified
   */
  static async isEmailVerified(email: string): Promise<boolean> {
    try {
      const stored = await SecureStore.getItemAsync(`verification_${email}`);

      if (!stored) {
        return false;
      }

      const verificationData: VerificationToken = JSON.parse(stored);
      return verificationData.verified === true;
    } catch (error) {
      console.error('Email verification check error:', error);
      return false;
    }
  }

  /**
   * Resend verification email
   */
  static async resendVerificationEmail(email: string, userName: string): Promise<void> {
    // Clear old token
    await SecureStore.deleteItemAsync(`verification_${email}`);

    // Send new verification email
    await this.sendVerificationEmail(email, userName);
  }

  /**
   * Clear verification data
   */
  static async clearVerificationData(email: string): Promise<void> {
    await SecureStore.deleteItemAsync(`verification_${email}`);
  }
}
