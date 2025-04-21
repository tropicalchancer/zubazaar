import { useZupassPopupSetup } from "@pcd/passport-interface";

/**
 * This popup sends requests and receives PCDs from the passport.
 * It handles the communication between the main app and Zupass.
 */
export default function Popup() {
  return <div>{useZupassPopupSetup()}</div>;
} 