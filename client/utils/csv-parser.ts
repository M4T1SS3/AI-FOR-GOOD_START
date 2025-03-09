export function parseCSV(csvText: string, delimiter: string = ';'): Record<string, string>[] {
  // Split the text into lines
  const lines = csvText.trim().split('\n');
  
  // Get the headers from the first line
  const headers = lines[0].split(delimiter);
  
  // Parse each line
  return lines.slice(1).map(line => {
    const values = line.split(delimiter);
    const entry: Record<string, string> = {};
    
    headers.forEach((header, index) => {
      entry[header] = values[index];
    });
    
    return entry;
  });
}
