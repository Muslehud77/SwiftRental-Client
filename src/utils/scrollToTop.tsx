

export default function scrollToTop() {
  if (window.innerHeight + window.scrollY <= document.body.offsetHeight) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
