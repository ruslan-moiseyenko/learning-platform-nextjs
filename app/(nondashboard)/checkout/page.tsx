"use client";

import CheckoutDetailsPage from "@/app/(nondashboard)/checkout/details";
import { Loading } from "@/components/ui/Loading";
import { WizardStepper } from "@/components/WizardStepper";
import { useCheckoutNavigation } from "@/hooks/useCheckoutNavigation";
import { useUser } from "@clerk/nextjs";
import React, { Suspense } from "react";

const CheckoutWizard = () => {
  const { isLoaded } = useUser();
  const { checkoutStep } = useCheckoutNavigation();

  if (!isLoaded) return <Loading />;

  const renderStep = () => {
    switch (checkoutStep) {
      case 1:
        return <CheckoutDetailsPage />;
      // case 2:
      //   return <PaymentPage />;
      // case 3:
      //   return <CompletionPage />;
      default:
        return <CheckoutDetailsPage />;
    }
  };

  return (
    <div className="checkout">
      <WizardStepper currentStep={checkoutStep} />
      <div className="checkout__content">{renderStep()}</div>
    </div>
  );
};

export default function CheckoutWizardPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CheckoutWizard />;
    </Suspense>
  );
}
