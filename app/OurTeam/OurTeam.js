import Application from "../Application.js";
const teamData = {
  member1: {
    name: "Ibrahim",
    profession: "Web Developer",
    image: "../../pictures/ibrahim.jpg",
    socialMedia: {
      facebook: "https://www.facebook.com/johndoe",
      twitter: "https://www.twitter.com/johndoe",
      github: "https://www.github.com/johndoe"
    },
    rating: 5
  },
  member2: {
    name: "Chaimae",
    profession: "Graphic Designer",
    image: "../../pictures/chaimae.jpeg",
    socialMedia: {
      facebook: "https://www.facebook.com/janesmith",
      twitter: "https://www.twitter.com/janesmith",
      github: "https://www.github.com/janesmith"
    },
    rating: 5
  },
  member: {
    name: "Dita",
    profession: "Web Developer",
    image: "../../pictures/dita.jpg",
    socialMedia: {
      facebook: "https://www.facebook.com/janesmith",
      twitter: "https://www.twitter.com/janesmith",
      github: "https://www.github.com/janesmith"
    },
    rating: 5
  },
  member4: {
    name: "Ussayed",
    profession: "Web Developer",
    image: "../../pictures/brad.jpg",
    socialMedia: {
      facebook: "https://www.facebook.com/johndoe",
      twitter: "https://www.twitter.com/johndoe",
      github: "https://www.github.com/johndoe"
    },
    rating: 5
  },
  member5: {
    name: "Victor",
    profession: "Web Developer",
    image: "../../pictures/viktor.jpeg",
    socialMedia: {
      facebook: "https://www.facebook.com/janesmith",
      twitter: "https://www.twitter.com/janesmith",
      github: "https://www.github.com/janesmith"
    },
    rating: 5
  },

};

export default class OurTeam extends Application {
  init() {
    super.init();

    const section = document.createElement('section');

    const swiperContainer = document.createElement('div');
    swiperContainer.classList.add('swiper', 'mySwiper', 'container');

    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper', 'content');

    // Iterate over the team members
    for (const memberKey in teamData) {
      if (teamData.hasOwnProperty(memberKey)) {
        const member = teamData[memberKey];
        
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide', 'card');
  
        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
  
        const image = document.createElement('div');
        image.classList.add('image');
        const img = document.createElement('img');
        img.src = member.image;
        img.alt = '';
        image.appendChild(img);
  
        const mediaIcons = document.createElement('div');
        mediaIcons.classList.add('media-icons');
        const facebookIcon = document.createElement('i');
        facebookIcon.classList.add('fab', 'fa-facebook');
        const twitterIcon = document.createElement('i');
        twitterIcon.classList.add('fab', 'fa-twitter');
        const githubIcon = document.createElement('i');
        githubIcon.classList.add('fab', 'fa-github');
        mediaIcons.appendChild(facebookIcon);
        mediaIcons.appendChild(twitterIcon);
        mediaIcons.appendChild(githubIcon);
  
        const nameProfession = document.createElement('div');
        nameProfession.classList.add('name-profession');
        const name = document.createElement('span');
        name.classList.add('name');
        name.textContent = member.name;
        const profession = document.createElement('span');
        profession.classList.add('profession');
        profession.textContent = member.profession;
        nameProfession.appendChild(name);
        nameProfession.appendChild(profession);
  
        const rating = document.createElement('div');
        rating.classList.add('rating');
        for (let i = 0; i < member.rating; i++) {
          const star = document.createElement('i');
          star.classList.add('fas', 'fa-star');
          rating.appendChild(star);
        }
        for (let i = member.rating; i < 5; i++) {
          const star = document.createElement('i');
          star.classList.add('far', 'fa-star');
          rating.appendChild(star);
        }
  
        const button = document.createElement('div');
        button.classList.add('button');
        const aboutMeButton = document.createElement('button');
        aboutMeButton.classList.add('aboutMe');
        aboutMeButton.textContent = 'About Me';
        const hireMeButton = document.createElement('button');
        hireMeButton.classList.add('hireMe');
        hireMeButton.textContent = 'Hire Me';
        button.appendChild(aboutMeButton);
        button.appendChild(hireMeButton);
  
        cardContent.appendChild(image);
        cardContent.appendChild(mediaIcons);
        cardContent.appendChild(nameProfession);
        cardContent.appendChild(rating);
        cardContent.appendChild(button);
  
        swiperSlide.appendChild(cardContent);
  
        swiperWrapper.appendChild(swiperSlide);
      }
    }

    swiperContainer.appendChild(swiperWrapper);

const nextButton = document.createElement('div');
nextButton.classList.add('swiper-button-next');

const prevButton = document.createElement('div');
prevButton.classList.add('swiper-button-prev');

const pagination = document.createElement('div');
pagination.classList.add('swiper-pagination');

section.appendChild(swiperContainer);
section.appendChild(nextButton);
section.appendChild(prevButton);
section.appendChild(pagination);

    this.target.appendChild(section);
 const swiper = new Swiper(".mySwiper", {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 30,
      loop: true,
      loopFillGroupWithBlank: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        576: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
      },
    });
  }
}
