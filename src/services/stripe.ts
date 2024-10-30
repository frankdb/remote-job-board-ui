import api from "./api";

interface CreateCheckoutSessionResponse {
  url: string;
}

export async function createCheckoutSession(
  jobId: number,
  userId: string
): Promise<string> {
  try {
    const response = await api.post<CreateCheckoutSessionResponse>(
      "/api/create-checkout-session/",
      {
        jobId,
        priceId: "price_1PINapCnL450E3VPJknvpzXP",
        userId,
      }
    );
    return response.data.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw new Error("Failed to create checkout session");
  }
}
