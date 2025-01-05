import { auth, db } from "@/lib/firebase/firebase.config";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Subscription type
type Subscription = "none" | "basic" | "pro" | "advance";

type UserType = {
    _id: string; // user id should be unique Uid.
    email: string; // user g-mail
    subscription: { type: Subscription }; // subscription type must have this.
};

// Creating the interface of initialState
interface InitialState {
    isPending: boolean;
    session: boolean; // session should be true or fals.
    user: UserType;
}

// Initialize the state for user slice or reducer.
const initialState: InitialState = {
    session: false, // default false no user logged in.
    isPending: true, // default pending state set to false.
    user: {
        _id: "", // empyt _id
        email: "", // empty email
        subscription: { type: "none" }, // subscription is none.
    },
};

// call when ever auth needed of the user.
export const handleAuthStateChanged = () => (dispatch: Dispatch) => {
    // Checking the auth state of the user with google.
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            dispatch(
                setUser({
                    session: false, // default false no user logged in.
                    isPending: false, // default pending state set to false.
                    user: {
                        _id: "", // empyt _id
                        email: "", // empty email
                        subscription: { type: "none" }, // subscription is none.
                    },
                })
            );
            return;
        }

        try {
            const getDocRef = await getDoc(doc(db, "users", user?.uid));
            const userData = getDocRef.data() as UserType;
            if (!userData) return;

            dispatch(
                setUser({
                    session: true,
                    user: userData,
                    isPending: false,
                })
            );
        } catch (error: unknown) {
            console.error(error);
        }
    });
};

// Creating user slice.
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<InitialState>) => {
            state.isPending = action.payload.isPending;
            state.session = action.payload.session;
            state.user = action.payload.user;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
