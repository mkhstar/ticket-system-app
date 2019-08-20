export default (showToast, message, type) =>
  showToast(message, {
    theme: "toasted-primary",
    position: "bottom-right",
    duration: 5000,
    type,
    action: {
      text: "Close",
      onClick: (e, toastObject) => {
        toastObject.goAway(0);
      }
    }
  });
