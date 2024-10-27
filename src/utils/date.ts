export const formatPostedDate = (posted_date: string) => {
  const date = new Date(posted_date);
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const now = new Date();
  const diffTime = now.getTime() - date.getTime();

  if (diffTime < 0) {
    return "Posted just now";
  }

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays >= 1) {
    const dayWord = diffDays === 1 ? "day" : "days";
    return `Posted ${diffDays} ${dayWord} ago`;
  }

  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  if (diffHours >= 1) {
    const hourWord = diffHours === 1 ? "hour" : "hours";
    return `Posted ${diffHours} ${hourWord} ago`;
  }

  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  if (diffMinutes >= 1) {
    const minuteWord = diffMinutes === 1 ? "minute" : "minutes";
    return `Posted ${diffMinutes} ${minuteWord} ago`;
  }

  return "Posted just now";
};

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
