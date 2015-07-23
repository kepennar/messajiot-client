
export default {

  navigateTo(path, options) {
    this.loadPage(path, () => {
      if (options && options.replace) {
        window.history.replaceState({}, document.title, path);
      } else {
        window.history.pushState({}, document.title, path);
      }
    });
  }
};