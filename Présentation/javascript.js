/*// Select all the elements that use a specified distinguisher.
const menuTriggers = document.querySelectorAll("[data-menu-toggle]");
// For each element, add a listener for the "click" event.
Array.prototype.forEach.apply(menuTriggers, [
  function(trigger) {
    trigger.addEventListener("click", function(e) {
      e.preventDefault(); // prevent default link behaviour
      // Toggle the sidebar when a click is detected.
      toggleSidebar(); // this function will be defined in a later step
    });
  }
]);*/

const menuIcon = document.querySelector("hamburger-menu");
const navbar = document.querySelector("navbar");

document.querySelector("hamburger-menu").addEventListener("click", function(){navbar.classList.toggle("change");})

/*
menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("change");
});
*/

    