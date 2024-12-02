export const pageTitles = {
  windows: "Browser Windows",
  alerts: "Alerts",
};

//Windows Page
export const newWindowsContent = {
  title: "This is a sample page",
  message:
    "Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.",
};

//Alerts page
export const alertMessages = {
  alert: "You clicked a button",
  delayedAlert: "This alert appeared after 5 seconds",
  confirmAlert: "Do you confirm action?",
  prompt: "Please enter your name",
};

export const resultMessage = {
  confirm: (response: "Cancel" | "OK"): string => `You selected ${response}`,
  prompt: "You entered something",
};
