import mitt from 'mitt';

const passcodeEvents = mitt();

export default passcodeEvents;

export const PASSCODE_EVENTS_PASSCODE_VERIFIED = 'passcodeVerified';
