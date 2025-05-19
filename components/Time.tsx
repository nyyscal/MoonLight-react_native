export function formatDistanceToNow(timestamp: number, options?: { addSuffix?: boolean }) {
  const now = Date.now();
  const diffMs = now - timestamp;
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let result = '';

  if (seconds < 60) {
    result = `${seconds} second${seconds !== 1 ? 's' : ''}`;
  } else if (minutes < 60) {
    result = `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  } else if (hours < 24) {
    result = `${hours} hour${hours !== 1 ? 's' : ''}`;
  } else {
    result = `${days} day${days !== 1 ? 's' : ''}`;
  }

  if (options?.addSuffix) {
    result += ' ago';
  }

  return result;
}
