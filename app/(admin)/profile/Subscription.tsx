"use client";

import createStripeCheckout from "@/lib/createStripeCheckout";
import { useAppSelector } from "@/lib/redux/hooks";
import { FC, JSX, useState } from "react";

const Subscription = (): JSX.Element => {
    const subscriptionType = useAppSelector(
        (state) => state.user.user.subscription.type
    );

    // Creating subscription button with loading state.
    const SubscriptionButton: FC<{
        type: "basic" | "pro" | "advance";
    }> = ({ type }) => {
        const [isClicked, setIsClicked] = useState(false); // Check is button clicked or not.

        // handle subscriiton with stripe checkout.
        const handleSubscription = async () => {
            try {
                setIsClicked(true);
                const url = await createStripeCheckout(type);
                if (url) {
                    window.location.href = url;
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsClicked(false);
            }
        };

        return (
            <button
                className="bg-[#B20710] text-white px-4 py-2 rounded text-sm active:opacity-95 flex items-center justify-center"
                onClick={handleSubscription}
            >
                {isClicked ? "Loading..." : "Subscription"}
            </button>
        );
    };

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold">Choose Plan</h2>
            <p className="text-xs text-gray-200">
                In order to watch your favourite movies or shows choose one plan
                which best for you.
            </p>
            <br />
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <p className="text-sm">Basic Plan for $4.99</p>
                    <p className="text-xs text-gray-200">
                        Watch film or movies with Ads.
                    </p>
                    {subscriptionType == "basic" && (
                        <p className="text-xs text-gray-400">Current Plan</p>
                    )}
                </div>
                <SubscriptionButton type="basic" />
            </div>
            <br />
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <p className="text-sm">Pro Plan for $9.99</p>
                    <p className="text-xs text-gray-200">
                        Watch film or movies with Fewer Ads.
                    </p>
                    {subscriptionType == "pro" && (
                        <p className="text-xs text-gray-400">Current Plan</p>
                    )}
                </div>
                <SubscriptionButton type="pro" />
            </div>
            <br />
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <p className="text-sm">Advance Plan for $14.99</p>
                    <p className="text-xs text-gray-200">
                        Watch film or movies with no Ads.
                    </p>
                    {subscriptionType == "advance" && (
                        <p className="text-xs text-gray-400">Current Plan</p>
                    )}
                </div>
                <SubscriptionButton type="advance" />
            </div>
        </div>
    );
};

export default Subscription;
