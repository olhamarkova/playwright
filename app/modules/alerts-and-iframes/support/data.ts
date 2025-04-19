//Windows Page
export const newWindowsContent = {
  title: "This is a sample page",
  message:
    "Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.",
};

//Alerts page
export const alertMessage = {
  alert: "You clicked a button",
  delayedAlert: "This alert appeared after 5 seconds",
  confirmAlert: "Do you confirm action?",
  prompt: "Please enter your name",
};

export const resultMessage = {
  confirm: (response: "Cancel" | "OK"): string => `You selected ${response}`,
  prompt: (prompt: string): string => `You entered ${prompt}`,
};

export const modalText = {
  small: "This is a small modal. It has very less content",
  large:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
};
