"use client";

import { useCallback, useState } from 'react';
import { zuAuthPopup } from '@pcd/zuauth';

interface ZupassAuthProps {
  onVerified: () => void;
}

export function ZupassAuth({ onVerified }: ZupassAuthProps) {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerification = useCallback(async () => {
    try {
      setIsVerifying(true);
      
      // Request verification through zuauth popup
      const result = await zuAuthPopup({
        fieldsToReveal: {
          revealAttendeeEmail: true,
          revealAttendeeName: true,
          revealEventId: true,
          revealProductId: true
        },
        watermark: BigInt(Date.now()), // Use timestamp as watermark
        config: [
          {
            pcdType: "eddsa-ticket-pcd",
            publicKey: [
              "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
              "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204"
            ],
            productId: "f4cbd4c9-819e-55eb-8c68-90a660bacf49",
            eventId: "3cf75131-6631-5096-b2e8-03c25d00f4de",
            eventName: "Product Hunt Clone",
            productName: "EdDSA"
          }
        ]
      });

      if (result.type === 'pcd') {
        onVerified();
      } else {
        throw new Error('Verification failed or cancelled');
      }
    } catch (error) {
      console.error('Zupass verification failed:', error);
    } finally {
      setIsVerifying(false);
    }
  }, [onVerified]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center">Verify with Zupass</h1>
        <p className="mb-6 text-gray-600 text-center">
          Please verify your identity using Zupass to access the application.
        </p>
        <div className="flex justify-center">
          <button
            disabled={isVerifying}
            onClick={handleVerification}
            className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isVerifying ? 'Verifying...' : 'Verify with Zupass'}
          </button>
        </div>
      </div>
    </div>
  );
} 