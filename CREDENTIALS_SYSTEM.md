# Credentials System Documentation

## Overview
The login credentials are now centrally managed and can be dynamically updated. The system uses localStorage to persist any changes.

## Where Credentials Are Stored

### Primary Storage: `client/src/config/credentials.js`
This is the single source of truth for all credentials. Contains:
- **Default credentials** (hardcoded)
- **Functions to manage credentials**:
  - `getCredentials()` - Fetches current credentials from localStorage or defaults
  - `setCredentials(newCredentials)` - Updates credentials in localStorage
  - `resetCredentials()` - Clears localStorage and reverts to defaults

### Runtime Storage: `localStorage`
- Key: `training_credentials`
- Stores JSON object with: `{ email, password, devEmail }`
- Automatically initialized on first load with default values

## How Components Use Credentials

### 1. **StickyNote.jsx** (Displays credentials)
- Receives credentials object from MainScene event
- Displays whatever is passed in the event detail
- Updates in real-time as event is fired

### 2. **MainScene.js** (Dispatches credentials to sticky note)
```javascript
const credentials = getCredentials();
window.dispatchEvent(new CustomEvent('showStickyNote', {
  detail: {
    loginEmail: credentials.email,
    loginPassword: credentials.password,
    devEmail: credentials.devEmail
  }
}));
```

### 3. **EmailClient.jsx** (Validates login)
```javascript
const credentials = getCredentials();
if (email === credentials.email && password === credentials.password) {
  // Login successful
}
```

## How to Dynamically Update Credentials

From any component or console, you can update credentials:

```javascript
// Import the function
import { setCredentials } from './config/credentials';

// Update credentials
setCredentials({
  email: 'newemail@example.com',
  password: 'newpassword123',
  devEmail: 'dev@example.com'
});
```

The sticky note will display the new credentials immediately on next interaction.

## Dynamic Updates Flow

1. **Change credentials** in storage: `setCredentials(newCreds)`
2. **User clicks note** on desk in game
3. **MainScene** calls `getCredentials()` → retrieves updated values from localStorage
4. **MainScene** dispatches `showStickyNote` event with new values
5. **StickyNote component** receives event and displays new credentials
6. **User logs in** with new credentials
7. **EmailClient** validates using `getCredentials()` → uses updated values

## Default Credentials
- **Email**: `xyz@gmail.com`
- **Password**: `123`
- **Dev Email**: `david.tan@company.com`

## Benefits
✅ Single source of truth for all credentials
✅ Can be updated dynamically without restarting
✅ Persists across page reloads (stored in localStorage)
✅ Easy to manage and debug
✅ Error handling if localStorage data is corrupted
