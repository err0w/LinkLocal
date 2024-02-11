export const truncateTitle = (title, maxLines, avgCharsPerLine) => {
    const maxLength = maxLines * avgCharsPerLine;
    if (title.length > maxLength) {
        title = title.substring(0, maxLength) + '…';
      return title;
    }
    
    return title;
    
}

export function formatFirestoreTimestamp(firebaseTimestamp) {
    console.log(firebaseTimestamp)
    console.log(typeof firebaseTimestamp)
    const dateObject = firebaseTimestamp.toDate(); // Convert to JavaScript Date object
  
    const dateOptions = { day: '2-digit', month: 'short' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
  
    const formattedDate = new Intl.DateTimeFormat('en-IN', dateOptions).format(dateObject);
    const formattedTime = new Intl.DateTimeFormat('en-IN', timeOptions).format(dateObject);
  
    return `${formattedDate}, ${formattedTime}`;
  }