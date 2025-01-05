import { JSX } from "react";
import SignOut from "./SignOut";
import Subscription from "./Subscription";

const Profile = (): JSX.Element => {
    return (
        <main className="h-screen pt-24">
            <div className="text-white max-w-2xl p-6 m-auto">
                <SignOut />
                <Subscription />
            </div>
        </main>
    );
};

export default Profile;
