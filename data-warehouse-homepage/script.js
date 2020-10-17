const $ = str => document.querySelector(str);
const $_ = str => document.querySelectorAll(str);
const testimonials = [{
    testimonialId: "testimonial-1",
    userImage: "user-1.png",
    userName: "John Fang",
    userDetail: "wordfaang.com",
    content: "Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla."
},
{
    testimonialId: "testimonial-2",
    userImage: "user-2.png",
    userName: "Jeny Doe",
    userDetail: "UX Designer",
    content: "Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla."
}, {
    testimonialId: "testimonial-3",
    userImage: "user-3.png",
    userName: "William",
    userDetail: "Web Designer",
    content: "Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla."
}]

function selectTestimonial(id, scroll = true) {
    let oldBubble = $('i.bubble.selected');
    if (oldBubble) {
        oldBubble.classList.remove('selected');
    }
    if (scroll == true) {
        document.getElementById(id).scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    } else {
        document.getElementById(id).parentElement.scroll(-100, 0);
    }
    let bubble = $(`i.bubble[data-for=${id}]`);
    bubble.classList.add('selected');
    $('#left-button').classList.remove('disabled');
    $('#right-button').classList.remove('disabled');
    let n = +(id.split('-')[1])
    if (n == 1) {
        $('#right-button').classList.add('disabled');
    }
    if (n == testimonials.length) {
        $('#left-button').classList.add('disabled');
    }
}

function createTestimonialCardContent(testimonial) {
    const TEMPLATE = `
        <img src="./assets/%userImage%" alt="user-image" class="testimonial-card__user-image">
        <div class="break">
        <span class="testimonial-card__user-name">%userName%</span>
        <span class="testimonial-card__user-details">%userDetail%</span>
        <p class="testimonial-card__content">%content%</p>
        </div>
        `

    return Object.entries(testimonial).reduce((previous, current) => {
        let y = previous.replace(`%${current[0]}%`, current[1]);
        return y;
    }, TEMPLATE);
}

function bubblePressed(event) {
    let testimonialToSelect = event.target.getAttribute('data-for');
    selectTestimonial(testimonialToSelect);
}
function controlButtonClicked(event) {
    if (event.target.classList.contains('disabled')) return;
    let selectedBubble = $(".bubble.selected");
    let direction = event.target.id == 'left-button' ? 1 : -1; // add this to the id;
    let selectedTestimonial;
    if (selectedBubble) {
        selectedTestimonial = selectedBubble.getAttribute('data-for');
    }
    selectTestimonial(`testimonial-${+(selectedTestimonial.split('-')[1]) + direction}`);
}

function addTestimonials() {
    let container = $('#testimonials-container');
    let bubbleContainer = $('#testimonial-scroll__bubbles');

    let testimonialElements = testimonials.map((testimonial, i) => {
        let testimonialContainer = document.createElement('div');
        testimonialContainer.classList.add('testimonial-card');
        testimonialContainer.innerHTML = createTestimonialCardContent(testimonial);
        testimonialContainer.id = testimonial.testimonialId;

        // add the bubble
        let bubble = document.createElement('i');
        bubble.classList.add('fas', 'fa-circle', 'bubble');
        if (i == 0) {
            bubble.classList.add('selected');
        }
        bubble.onclick = bubblePressed;
        bubble.setAttribute('data-for', testimonial.testimonialId);
        bubbleContainer.append(bubble);

        return testimonialContainer;
    })

    container.append(...testimonialElements);
}


document.body.onload = () => {
    if (window.innerWidth <= 700) {
        // alert("This website is not fully optimized for devices with small screens (like you are using now). Some elements of the website may not be visible");
    }
    addTestimonials();
    $_('#testimonial-scroll__move-control i.fas').forEach(controlButton => {
        controlButton.onclick = controlButtonClicked;
    })
    selectTestimonial('testimonial-1', false);
}