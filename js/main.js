/* -------------------------------------------

Name: 		my-portfolio
Version:    1.0
Developer: 	Wejdan

------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const swup = new Swup({
        containers: ['#swup', '#swupMenu', '#swup-opm'],
        animateHistoryBrowsing: true,
    });

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

    ScrollSmoother.create({
        smooth: 1,
        effects: true,
        smoothTouch: false,
    });

    /* -------------------------------------------
    preloader
    ------------------------------------------- */
    var timeline = gsap.timeline();
    timeline
        .to(".mil-preloader-animation", { opacity: 1, ease: 'sine' })
        .fromTo(".mil-animation-1 p", { y: "30px", opacity: 0, scale: .8, ease: 'sine' }, {
            y: "0px", opacity: 1, scale: 1, stagger: 0.3, webkitFilter: "blur(0px)"
        })
        .to(".mil-animation-1 p", { opacity: 0, y: '-30' }, "+=0.3")
        .fromTo(".mil-reveal-box", 0.1, { x: 0 }, { x: '-30' })
        .to(".mil-reveal-box", 0.45, { width: "100%", x: 0 }, "+=0.1")
        .to(".mil-reveal-box", { right: "0" })
        .to(".mil-reveal-box", 0.3, { width: "0%" })
        .fromTo(".mil-animation-2 p", { opacity: 0 }, { opacity: 1 }, "-=0.5")
        .to(".mil-animation-2 p", 0.6, { opacity: 0, y: '-30' }, "+=0.5")
        .to(".mil-preloader", 0.8, { opacity: 0, ease: 'sine' }, "+=0.2")
        .add(() => { ScrollTrigger.refresh(); }, "-=1")
        .add(() => { document.querySelector('.mil-preloader').classList.add('mil-hidden'); });

    /* -------------------------------------------
    cursor
    ------------------------------------------- */
    var follower = document.querySelector(".mil-cursor-follower");
    var posX = 0, posY = 0;
    var mouseX = 0, mouseY = 0;

    gsap.ticker.add(function () {
        posX += (mouseX - posX) / 29;
        posY += (mouseY - posY) / 29;
        gsap.set(follower, { css: { left: posX, top: posY } });
    });

    function addHoverEffect(selector, className) {
        document.querySelectorAll(selector).forEach(function (link) {
            link.addEventListener("mouseenter", function () { follower.classList.add(className); });
            link.addEventListener("mouseleave", function () { follower.classList.remove(className); });
        });
    }
    addHoverEffect(".mil-c-light", "mil-light-active");
    addHoverEffect(".mil-c-dark", "mil-dark-active");
    addHoverEffect(".mil-c-gone", "mil-gone-active");
    addHoverEffect(".mil-c-view", "mil-view-active");
    addHoverEffect(".mil-c-next", "mil-next-active");
    addHoverEffect(".mil-c-read", "mil-read-active");
    addHoverEffect(".mil-c-swipe", "mil-swipe-active");

    document.addEventListener("mousemove", function (e) { mouseX = e.clientX; mouseY = e.clientY; });

    /* -------------------------------------------
    Helper: detect mobile
    ------------------------------------------- */
    function isMobileDevice() {
        return window.innerWidth < 992; // أقل من 992px اعتبره موبايل
    }


        // -------------------------------------------
    // simple fade-up for mobile
    // -------------------------------------------
    if (isMobileDevice()) {
        const elements = document.querySelectorAll(".mil-up");
        elements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add("show");
            }, i * 150); // يظهر كل عنصر بتأخير بسيط
        });
    }

    
    /* -------------------------------------------
    scroll + parallax animations (Desktop only)
    ------------------------------------------- */
    if (!isMobileDevice()) {
        const appearance = document.querySelectorAll(".mil-up");
        appearance.forEach((section) => {
            gsap.fromTo(section, { opacity: 0, y: 30, scale: 1.04, ease: 'sine' }, {
                y: 0, opacity: 1, scale: 1,
                scrollTrigger: { trigger: section, toggleActions: 'play none none reverse' }
            });
        });

        const parallaxImages = document.querySelectorAll(".mil-parallax-img");
        parallaxImages.forEach((section) => {
            var value1 = section.getAttribute("data-value-1");
            var value2 = section.getAttribute("data-value-2");
            gsap.fromTo(section, { y: value1, ease: 'sine' }, {
                y: value2,
                scrollTrigger: { trigger: section, scrub: true, toggleActions: 'play none none reverse' }
            });
        });

        const parallaxXImages = document.querySelectorAll(".mil-parallax-x-img");
        parallaxXImages.forEach((section) => {
            var value1 = section.getAttribute("data-value-1");
            var value2 = section.getAttribute("data-value-2");
            gsap.fromTo(section, { x: value1, ease: 'sine' }, {
                x: value2,
                scrollTrigger: { trigger: section, scrub: true, toggleActions: 'play none none reverse' }
            });
        });

        const scaleImage = document.querySelectorAll(".mil-scale-img");
        scaleImage.forEach((section) => {
            var value1 = section.getAttribute("data-value-1");
            var value2 = section.getAttribute("data-value-2");
            if (window.innerWidth < 1200) value1 = Math.max(.95, value1);
            gsap.fromTo(section, { scale: value1, ease: 'sine' }, {
                scale: value2,
                scrollTrigger: { trigger: section, scrub: true, toggleActions: 'play none none reverse' }
            });
        });

        const rotate = document.querySelectorAll(".mil-rotate");
        rotate.forEach((section) => {
            var value = section.getAttribute("data-value");
            gsap.fromTo(section, { rotate: 0, ease: 'sine' }, {
                rotate: value,
                scrollTrigger: { trigger: section, scrub: true, toggleActions: 'play none none reverse' }
            });
        });
    }

    /* -------------------------------------------
    sliders (kept for all devices)
    ------------------------------------------- */
    var swiper = new Swiper('.mil-blog-slider', { parallax: true, autoHeight: true, spaceBetween: 30, slidesPerView: 1, speed: 800, navigation: { prevEl: '.mil-nl-prev', nextEl: '.mil-nl-next', }, breakpoints: { 992: { slidesPerView: 2, }, }, on: { slideChangeTransitionEnd: function () { ScrollTrigger.refresh(); } } });

    var swiper = new Swiper('.mil-blog-slider-sm', { parallax: true, autoHeight: true, spaceBetween: 30, slidesPerView: 1, speed: 800, navigation: { prevEl: '.mil-sb-prev', nextEl: '.mil-sb-next', }, breakpoints: { 992: { slidesPerView: 2, }, }, on: { slideChangeTransitionEnd: function () { ScrollTrigger.refresh(); } } });

    var swiper = new Swiper('.mil-reviews-slider', { parallax: true, autoHeight: true, spaceBetween: 120, slidesPerView: 1, initialSlide: 1, speed: 800, pagination: { el: ".mil-sr-pagination", clickable: true, }, navigation: { prevEl: '.mil-sr-prev', nextEl: '.mil-sr-next', }, on: { slideChangeTransitionEnd: function () { ScrollTrigger.refresh(); } } });

    var swiper = new Swiper('.mil-project-slider', { parallax: true, autoHeight: true, spaceBetween: 30, slidesPerView: 1, speed: 800, breakpoints: { 992: { slidesPerView: 2, }, }, on: { slideChangeTransitionEnd: function () { ScrollTrigger.refresh(); } } });

});

// github<script>
const username = "wmalotaibii";
const repoName = "report-maker";

fetch(`https://api.github.com/repos/${username}/${repoName}`)
  .then(response => response.json())
  .then(repo => {
    const repoCard = document.getElementById("repo-card");
    repoCard.innerHTML = `
      <h3><i class="fab fa-github"></i> ${repo.name}</h3>
      <p>${repo.description ? repo.description : "No description provided."}</p>
      <a href="${repo.html_url}" target="_blank">View on GitHub</a>
    `;
  })
  .catch(error => console.error("Error fetching repo:", error));

function isMobile() { return /Mobi|Android/i.test(navigator.userAgent); }
function closePopup() { document.getElementById("mobilePopup").style.display = "none"; }
window.onload = function() { if(isMobile()) { document.getElementById("mobilePopup").style.display = "flex"; } }







/* -------------------------------------------
    ruber letters
------------------------------------------- */
const headings = document.querySelectorAll('.mil-rubber');

headings.forEach(heading => {
    const textNodes = [];

    heading.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent.split(' ').forEach((word, index, array) => {
                const wordSpan = document.createElement('span');
                wordSpan.classList.add('mil-word-span');
                word.split('').forEach(letter => {
                    const letterSpan = document.createElement('span');
                    letterSpan.classList.add('mil-letter-span');
                    letterSpan.textContent = letter;
                    wordSpan.appendChild(letterSpan);
                });
                textNodes.push(wordSpan);
                if (index < array.length - 1) {
                    textNodes.push(document.createTextNode(' '));
                }
            });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            textNodes.push(node.cloneNode(true));
        }
    });

    heading.innerHTML = '';
    textNodes.forEach(node => heading.appendChild(node));

    const letters = heading.querySelectorAll('.mil-letter-span');
    letters.forEach(letter => {
        letter.addEventListener('mouseenter', () => {
            gsap.to(letter, {
                scaleY: 1.1,
                y: '-5%',
                duration: 0.2,
                ease: 'sine'
            });
        });

        letter.addEventListener('mouseleave', () => {
            gsap.to(letter, {
                scaleY: 1,
                y: '0%',
                duration: 0.2,
                ease: 'sine'
            });
        });
    });
});











// ---------- AI Chat Integration ----------
document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("send-btn");
  const userInput = document.getElementById("user-input");
  const messages = document.getElementById("messages");

  async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    messages.innerHTML += `<div class="user">You: ${userMessage}</div>`;
    userInput.value = "";

    try {
      const res = await fetch("/api/chat", {   // ⚡️ بدون .js
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      console.log("AI Response:", data); // 🐞 Debug

      if (data.reply) {
        messages.innerHTML += `<div class="ai">AI: ${data.reply}</div>`;
      } else {
        messages.innerHTML += `<div class="ai">⚠️ No reply from AI</div>`;
      }

      messages.scrollTop = messages.scrollHeight;
    } catch (err) {
      messages.innerHTML += `<div class="ai">❌ Error: Unable to connect to AI</div>`;
    }
  }

  if (sendBtn) {
    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  }
});
