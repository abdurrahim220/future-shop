interface OtpEmailParams {
  otp: string;
  expiresInMinutes: number;
}

export const otpEmailTemplate = ({
  otp,
  expiresInMinutes,
}: OtpEmailParams): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your OTP Code</title>
        <style>
          body {
            font-family: Arial, Helvetica, sans-serif;
            background-color: #f4f6f8;
            padding: 20px;
          }
          .container {
            max-width: 480px;
            margin: auto;
            background: #ffffff;
            border-radius: 8px;
            padding: 24px;
          }
          .header {
            text-align: center;
            font-size: 22px;
            font-weight: bold;
            margin-bottom: 20px;
          }
          .otp {
            text-align: center;
            font-size: 32px;
            letter-spacing: 6px;
            font-weight: bold;
            margin: 24px 0;
            color: #2563eb;
          }
          .text {
            font-size: 14px;
            color: #555;
            line-height: 1.6;
          }
          .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #888;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">Future Shop Verification</div>

          <p class="text">
            Use the following One-Time Password (OTP) to complete your verification.
          </p>

          <div class="otp">${otp}</div>

          <p class="text">
            This code will expire in <strong>${expiresInMinutes} minutes</strong>.
            Please do not share this code with anyone.
          </p>

          <div class="footer">
            If you didn’t request this, you can safely ignore this email.
          </div>
        </div>
      </body>
    </html>
  `;
};
