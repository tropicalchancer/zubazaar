"use client";

import { useState } from "react";
import { zuAuthPopup } from "@pcd/zuauth";
import { whitelistedTickets } from "@/lib/zupassConfig";

interface ZupassAuthProps {
  onVerified: () => void;
}

export function ZupassAuth({ onVerified }: ZupassAuthProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerification = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Create configuration array from whitelisted tickets
      const config = Object.values(whitelistedTickets)
        .flat()
        .map(ticket => ({
          pcdType: "eddsa-ticket-pcd" as const,
          publicKey: ticket.publicKey,
          eventId: ticket.eventId,
          eventName: ticket.eventName || "Unknown Event",
          productId: ticket.productId,
          productName: ticket.productName || "Unknown Product"
        }));

      const result = await zuAuthPopup({
        fieldsToReveal: {
          revealAttendeeEmail: true,
          revealAttendeeName: true,
          revealEventId: true,
          revealProductId: true
        },
        watermark: BigInt(12345),
        config
      });

      if (result.type === "pcd") {
        onVerified();
      } else {
        setError("Verification failed. Please try again.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during verification");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold text-center">Verify Your Identity</h1>
        <p className="text-center text-gray-600">
          Please verify your identity using Zupass to access this application.
        </p>
        {error && (
          <div className="p-4 text-red-600 bg-red-50 rounded-md">
            {error}
          </div>
        )}
        <button
          onClick={handleVerification}
          disabled={isLoading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Verifying..." : "Verify with Zupass"}
        </button>
      </div>
    </div>
  );
} 