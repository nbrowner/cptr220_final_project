document.addEventListener('DOMContentLoaded', function () {
  const elements = document.querySelectorAll('.animate-on-scroll')
  const parallaxElements = document.querySelectorAll('.parallax')

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.3 })

  elements.forEach(el => observer.observe(el))

  window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY
    parallaxElements.forEach(el => {
      const speed = el.getAttribute('data-speed')
      el.style.transform = `translateY(${scrollTop * speed}px)`
    })
  })

  // Slide-in effects
  const slideElements = document.querySelectorAll('.slide-in')
  slideElements.forEach(el => observer.observe(el))
})

document.addEventListener('DOMContentLoaded', function () {
  const hamburgerMenu = document.getElementById('hamburger-menu')
  const mainNav = document.querySelector('.main-nav')

  hamburgerMenu.addEventListener('click', function () {
    mainNav.classList.toggle('active')
  })
})
