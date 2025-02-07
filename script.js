"use strict";
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const section1 = document.querySelector("#section--1");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const allSections = document.querySelectorAll(".section");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const sideBar = document.querySelector(".side-bar");
const menuBtn = document.querySelector(".menu-btn");
const sideClose = document.querySelector(".side-close--btn");
const sideLinks = document.querySelectorAll(".side__link");
const hireBtns = document.querySelectorAll(".hire-btn");
///////////////////////////////////////

/////////////////////////////////
// Button Scroll
btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});

/////////////////////////////////
// Page Navigation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  //Matching Strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

///////////////////////////////////////
// Sticky navigation: Intersection Observer API
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entires) {
  const [entry] = entires;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections
const revealSections = function (entires, observer) {
  const [entry] = entires;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////////////////////////////////
// Side Bar

menuBtn.addEventListener("click", function (showSideBar) {
  sideBar.style.display = "flex";
});

sideClose.addEventListener("click", function (hideSideBar) {
  sideBar.style.display = "none";
});

sideLinks.forEach((link) => {
  link.addEventListener("click", function () {
    sideBar.style.display = "none";
  });
});
///////////////////////////////////////

hireBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("Hire button clicked!");
  });
});
