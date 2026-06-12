import AppError from "../../errors/appError";
import { HTTP_STATUS } from "../../errors/httpStatus";
import { config } from "../../config/config";
import BkashRepository from "./bkash.repository";
import { OrderModel } from "../order/order.model";

class BkashService {
  constructor(private bkashRepo: BkashRepository) {}

  /**
   * Retrieves a valid cached bKash token from the database,
   * or requests a new token from the sandbox if expired/missing.
   */
  async getBkashToken(): Promise<string> {
    const cached = await this.bkashRepo.findValidToken();
    if (cached) {
      // Reuse active token
      return cached.token;
    }

    // Call bKash Token Grant Endpoint
    try {
      const response = await fetch(
        `${config.bkash_base_url}/tokenized/checkout/token/grant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            username: config.bkash_username as string,
            password: config.bkash_password as string,
          },
          body: JSON.stringify({
            app_key: config.bkash_app_key,
            app_secret: config.bkash_app_secret,
          }),
        },
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Token Grant failed: ${errText}`);
      }

      const data = (await response.json()) as { id_token?: string };
      if (!data.id_token) {
        throw new Error("No id_token returned from bKash");
      }

      // Save token to database with a 55-minute expiration limit (safe window under 1 hour)
      const expiresAt = new Date(Date.now() + 55 * 60 * 1000);
      await this.bkashRepo.saveToken(data.id_token, expiresAt);

      return data.id_token;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new AppError(
        `Failed to grant bKash token: ${msg}`,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Request bKash payment portal creation link.
   */
  async createPayment(amount: number, orderId: string) {
    const idToken = await this.getBkashToken();
    const callbackURL = `${config.backend_url}/api/v1/bkash/callback`;

    try {
      const response = await fetch(
        `${config.bkash_base_url}/tokenized/checkout/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: idToken,
            "X-App-Key": config.bkash_app_key as string,
          },
          body: JSON.stringify({
            mode: "0011",
            payerReference: "FutureShopCustomer",
            callbackURL,
            amount: String(amount),
            currency: "BDT",
            intent: "sale",
            merchantInvoiceNumber: orderId,
          }),
        },
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Create Payment failed: ${errText}`);
      }

      const data = (await response.json()) as {
        paymentID?: string;
        bkashURL?: string;
        errorMessage?: string;
      };

      if (!data.paymentID || !data.bkashURL) {
        throw new Error(
          data.errorMessage || "Failed to create bKash checkout session",
        );
      }

      return {
        paymentID: data.paymentID,
        bkashURL: data.bkashURL,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new AppError(msg, HTTP_STATUS.BAD_REQUEST);
    }
  }

  /**
   * Execute bKash payment verification, and update database order status.
   */
  async executePayment(paymentID: string) {
    const idToken = await this.getBkashToken();

    try {
      const response = await fetch(
        `${config.bkash_base_url}/tokenized/checkout/execute`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: idToken,
            "X-App-Key": config.bkash_app_key as string,
          },
          body: JSON.stringify({ paymentID }),
        },
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Execute Payment failed: ${errText}`);
      }

      const data = (await response.json()) as {
        transactionStatus?: string;
        merchantInvoiceNumber?: string;
        trxID?: string;
        statusMessage?: string;
      };

      if (data.transactionStatus === "Completed") {
        const orderId = data.merchantInvoiceNumber;
        const trxId = data.trxID;

        if (orderId) {
          // Update order status directly in database
          await OrderModel.updateOne(
            { _id: orderId },
            { paymentStatus: "paid" },
          );
        }

        return {
          success: true,
          orderId,
          trxId,
        };
      } else {
        throw new Error(data.statusMessage || "bKash Execution Incomplete");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new AppError(msg, HTTP_STATUS.BAD_REQUEST);
    }
  }
}

export default BkashService;
