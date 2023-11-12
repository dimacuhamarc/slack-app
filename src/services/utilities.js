export function FormatName(name) {
  name = name.split('@')[0];
  name = name.split('.')[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
}