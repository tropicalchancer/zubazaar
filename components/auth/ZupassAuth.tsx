"use client";

import { useState } from "react";
import { zuAuthPopup } from "@pcd/zuauth";
import { whitelistedTickets, TicketTypeName } from "@/lib/zupassConfig";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ZupassAuthProps {
  onVerified: () => void;
}

export function ZupassAuth({ onVerified }: ZupassAuthProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  // Create a flat array of all tickets with their full info
  const allTickets = Object.entries(whitelistedTickets).flatMap(([eventType, tickets]) =>
    tickets.map(ticket => ({
      ...ticket,
      eventType,
      displayName: `${ticket.eventName || eventType} (${ticket.productName || 'Unknown'})`
    }))
  );

  const handleVerification = async () => {
    if (!selectedTicket) {
      setError("Please select a ticket type");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Find the selected ticket configuration
      const selectedTicketConfig = allTickets.find(t => 
        `${t.eventName}:${t.productName}` === selectedTicket
      );

      if (!selectedTicketConfig) {
        throw new Error("Selected ticket configuration not found");
      }

      const config = [{
        pcdType: "eddsa-ticket-pcd" as const,
        publicKey: selectedTicketConfig.publicKey,
        eventId: selectedTicketConfig.eventId,
        eventName: selectedTicketConfig.eventName || "Unknown Event",
        productId: selectedTicketConfig.productId,
        productName: selectedTicketConfig.productName || "Unknown Product"
      }];

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
          Please select your ticket type and verify your identity using Zupass.
        </p>
        
        <div className="space-y-4">
          <Select
            value={selectedTicket || ""}
            onValueChange={setSelectedTicket}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your ticket" />
            </SelectTrigger>
            <SelectContent>
              {allTickets.map((ticket) => (
                <SelectItem 
                  key={`${ticket.eventName}:${ticket.productName}`}
                  value={`${ticket.eventName}:${ticket.productName}`}
                >
                  {ticket.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {error && (
            <div className="p-4 text-red-600 bg-red-50 rounded-md">
              {error}
            </div>
          )}
          
          <button
            onClick={handleVerification}
            disabled={isLoading || !selectedTicket}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : "Verify with Zupass"}
          </button>
        </div>
      </div>
    </div>
  );
} 