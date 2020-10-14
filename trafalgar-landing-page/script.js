const $ = selector => document.querySelector(selector);
const $_ = selector => document.querySelectorAll(selector);

$_('.service-card').forEach(serviceCard => {
    let id = serviceCard.id;

    serviceCard.querySelector('img').src = `./assets/${id}.png`;
})

$('.nav-icon').addEventListener('click', function () {
    let isToggled = document.body.dataset.navToggled;
    $('nav').classList.toggle('toggled-nav');
    document.body.dataset.navToggled = isToggled != "true"
})