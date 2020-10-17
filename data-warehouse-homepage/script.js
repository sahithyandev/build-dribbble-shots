const $ = str => document.querySelector(str);
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

function scrollToTestimonial(id) {
    let oldBubble = $('i.bubble.selected');
    if (oldBubble) {
        oldBubble.classList.remove('selected');
    }
    document.getElementById(id).scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
    let bubble = $(`i.bubble[data-for=${id}]`);
    bubble.classList.add('selected');
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
    scrollToTestimonial(testimonialToSelect);
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
    addTestimonials();
    // scrollToTestimonial('testimonial-1');
}