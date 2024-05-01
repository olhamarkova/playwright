export async function generateItemLeftText(itemCount: number): Promise<string> {
  if (itemCount === 1) {
    return "1 item left!";
  } else {
    return `${itemCount} items left!`;
  }
}
