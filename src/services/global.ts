const {
  VITE_APP_PROTOCOL,
  VITE_APP_HOSTNAME,
  VITE_APP_VERSION,
  VITE_APP_API_KEY,
} = import.meta.env

const PROTOCOL = VITE_APP_PROTOCOL
const HOSTNAME = VITE_APP_HOSTNAME
const VERSION = VITE_APP_VERSION
const API_KEY = VITE_APP_API_KEY

const LABELS = {
  error: {
    networkError: 'Network Error',
    timeOut: 'Timeout Error',
    default: 'Server is not available. Try later!',
  },
}

export { PROTOCOL, HOSTNAME, VERSION, LABELS, API_KEY }
