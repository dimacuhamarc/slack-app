export function FormatName(name) {
  name = name.split('@')[0];
  name = name.split('.')[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function FormatTimestamp(date) {
  date = new Date(date);
  const options = { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true
  };
  return date.toLocaleString('en-US', options);
}