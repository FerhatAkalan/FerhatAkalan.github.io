document.addEventListener("DOMContentLoaded", function () {
    const itemsPerPage = 6; 
    let currentPage = 1; 

    fetch("https://api.github.com/users/FerhatAkalan/repos")
        .then(response => response.json())
        .then(data => {
            const filteredRepos = data.filter(repo => 
                !repo.name.includes("FerhatAkalan") && !repo.name.includes("FerhatAkalan.github.io")
            );
            const promises = filteredRepos.map(repo => {
                return fetch(`https://api.github.com/repos/FerhatAkalan/${repo.name}/commits?per_page=1`)
                        .then(response => response.json())
                        .then(commits => {
                            if (commits.length > 0) {
                                repo.last_commit_date = commits[0].commit.author.date;
                            } else {
                                repo.last_commit_date = repo.created_at; 
                            }
                            return repo;
                        });
            });
            Promise.all(promises).then(repos => {
                repos.sort((a, b) => new Date(b.last_commit_date) - new Date(a.last_commit_date));
                const portfolioGrid = document.querySelector(".portfolio-grid");
                function paginate(page) {
                    portfolioGrid.innerHTML = '';
                    const startIndex = (page - 1) * itemsPerPage;
                    const endIndex = startIndex + itemsPerPage;
                    const currentRepos = repos.slice(startIndex, endIndex);

                    currentRepos.forEach(repo => {
                        const portfolioItem = document.createElement("div");
                        portfolioItem.classList.add("portfolio-item", "col-md-3");
                        portfolioItem.style.cursor = "pointer"; 
                        const img = document.createElement("img");
                        img.src = getImageForRepo(repo.name);
                        img.alt = repo.name;
                        const h3 = document.createElement("h3");
                        h3.textContent = repo.name;
                        const p = document.createElement("p");
                        p.textContent = repo.description || "No description provided.";
                        portfolioItem.addEventListener("click", function() {
                            window.open(repo.html_url, "_blank");
                        });
                        portfolioItem.appendChild(img);
                        portfolioItem.appendChild(h3);
                        portfolioItem.appendChild(p);
                        portfolioGrid.appendChild(portfolioItem);
                    });
                    updatePagination(page);
                }
                paginate(currentPage);
                function updatePagination(currentPage) {
                    const paginationContainer = document.querySelector(".pagination-container");
                    paginationContainer.innerHTML = '';
                    const pageCount = Math.ceil(repos.length / itemsPerPage);
                    for (let i = 1; i <= pageCount; i++) {
                        const button = document.createElement("button");
                        button.textContent = i;
                        button.classList.add("btn", "btn-sm", "btn-outline-primary", "mx-1");
                        if (i === currentPage) {
                            button.classList.add("active");
                        }
                        button.addEventListener("click", function() {
                            currentPage = i;
                            paginate(currentPage);
                        });
                        paginationContainer.appendChild(button);
                    }
                }
            });
        })
        .catch(error => console.error("Error fetching GitHub repos:", error));
});
function getImageForRepo(repoName) {
    const imageMap = {
        "GulgezginGame": "./images/blue/GameApp.jpg",
        "Social-Media-App-Project": "./images/blue/SocialApp.jpg",
        "School-Management-Project": "./images/blue/SchoolApp.jpg",
        "BlogProject": "./images/blue/BlogApp.jpg",
        "TensorflowCarAnalysis": "./images/blue/MachineLearning.jpg",
        "SpringAppProject": "./images/blue/SpringApp.jpg",
    };
    return imageMap.hasOwnProperty(repoName) ? imageMap[repoName] : "./images/default.jpg";
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("backToTopBtn").style.display = "block";
  } else {
    document.getElementById("backToTopBtn").style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Navbar toggle işlevselliği için yeni kod ekleyelim
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarNav = document.querySelector('#navbarNav');
    let isNavOpen = false;

    // Navbar toggle tıklama olayı
    navbarToggler.addEventListener('click', function() {
        isNavOpen = !isNavOpen;
        if (isNavOpen) {
            navbarNav.classList.add('show');
        } else {
            navbarNav.classList.remove('show');
        }
    });

    // Navbar linklerine tıklandığında menüyü kapat
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                isNavOpen = false;
                navbarNav.classList.remove('show');
            }
        });
    });

    // Sayfa dışına tıklandığında menüyü kapat
    document.addEventListener('click', function(event) {
        const isClickInsideNavbar = navbarNav.contains(event.target) || navbarToggler.contains(event.target);
        if (!isClickInsideNavbar && isNavOpen) {
            isNavOpen = false;
            navbarNav.classList.remove('show');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Temel güvenlik önlemleri
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('selectstart', e => e.preventDefault());
    document.addEventListener('dragstart', e => e.preventDefault());
    
    // Gelişmiş DevTools tespiti ve engelleme
    (function() {
        // Console.log tespiti
        const checkConsole = () => {
            const startTime = new Date();
            debugger;
            const endTime = new Date();
            if (endTime - startTime > 100) {
                window.location.href = 'about:blank';
            }
        };

        // Periyodik kontroller
        setInterval(() => {
            // Console.clear bypass engelleyici
            const before = new Date().getTime();
            debugger;
            const after = new Date().getTime();
            if (after - before > 200) {
                window.location.href = 'about:blank';
            }

            // Ek kontroller
            checkConsole();
        }, 1000);

        // Klavye kısayolları engelleme
        document.addEventListener('keydown', function(e) {
            // F12, Ctrl+Shift+I/J/C, Ctrl+U
            if (
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && ['I','i','J','j','C','c'].includes(e.key)) ||
                (e.ctrlKey && ['U','u','S','s'].includes(e.key)) ||
                (e.key === 'Escape' && e.keyCode === 27)
            ) {
                e.preventDefault();
                return false;
            }
        });

        // Source görüntüleme engelleme
        document.addEventListener('keypress', function(e) {
            if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
                e.preventDefault();
                return false;
            }
        });

        // Console uyarıları
        console.clear();

        // Ek güvenlik: debugger tespiti
        setInterval(() => {
            Function.prototype.toString = function() {
                window.location.href = 'about:blank';
            };
        }, 100);
    })();
});

// Dil değiştirme fonksiyonları
const translations = {
    en: {
        // Navigation
        about: "About me",
        projects: "Projects",
        technologies: "Skills",
        achievements: "Achievements",
        experience: "Experiences",
        education: "Education",
        blog: "Blog",
        developerTitle: "Computer Engineer & Software Developer",

        // About Section
        aboutContent: `
            <p>Hello, my name is <strong>Ferhat Akalan</strong>. I graduated from Giresun University Computer Engineering Department as the second in my department and I am currently doing my master of science in Computer Engineering at Bursa Technical University.</p>
            
            <p>My passion for computer science and technology drives me to stay up to date with the latest developments in the industry and pursue a career in this field. My internship and project experiences have allowed me to specialize in software programming. I would like to work in the future to improve these skills and gain more experience in this field.</p>
            
            <p>I am interested in coding and software development and I develop personal projects to gain experience in this field. I am proficient in programming languages such as Python, Java, and C#, and I share the projects I develop in these languages on GitHub. I also have a deep interest in artificial intelligence and machine learning and want to improve myself in these technologies.</p>
            
            <p>If you would like to learn more about my experience, projects, and skills, please feel free to connect with me on mail. Additionally, I am open to job opportunities. I am eager to be a part of the evolving technologies. Thank you!</p>
            
            <p>🌱 I'm currently learning <strong>Machine Learning</strong></p>
            
            <p>📫 How to reach me <strong>ferhatakalann@outlook.com</strong></p>`,

        // Projects Section
        projectsTitle: "My Github Public Projects",
        noDescription: "No description provided.",

        // Technologies Section
        technologiesTitle: "Languages, Frameworks, and Tools",

        // Achievements Section
        achievementsTitle: "Achievements",
        teknofestTitle: "TEKNOFEST 2024 Winner",
        teknofestDesc: "University Students Research Projects \"Smart Cities and Transportation\" Category 🥇",
        teknofestSubDesc: "Turkey's Biggest Technology Competition",
        certificateTitle: "Certificate of Success",

        // Experience Section
        experienceTitle: "Professional Experience",
        experienceDesc: "You can visit my LinkedIn profile for my experiences and more information.",
        viewProfile: "View LinkedIn Profile",

        // Education Section
        educationTitle: "Education",
        bachelorsDegree: "Bachelor's Degree Computer Engineering",
        erasmusDegree: "Bachelor's Degree Computer Science",
        mastersDegree: "Master of Science in Computer Engineering with Thesis",
        erasmusDesc: "Erasmus+ Student Mobility",
        graduatedRank: "Graduated 2nd in Department",

        // Footer
        copyright: "© 2024 Coded by",
        allRights: "All rights reserved.",

        // Eğitim kartları için detaylı çeviriler
        giresunUniversity: "Giresun University",
        kazimierzUniversity: "Kazimierz Wielki University",
        bursaTechnicalUniversity: "Bursa Technical University",
        duration1: "October 2020 - July 2024",
        duration2: "October 2023 - February 2024",
        duration3: "September 2024"
    },
    tr: {
        // Navigasyon
        about: "Hakkımda",
        projects: "Projeler",
        technologies: "Yetenekler",
        achievements: "Başarılar",
        experience: "Deneyimler",
        education: "Eğitim",
        blog: "Blog",
        developerTitle: "Bilgisayar Mühendisi & Yazılım Geliştirici",

        // Hakkımda Bölümü
        aboutContent: `
            <p>Merhaba, ben <strong>Ferhat Akalan</strong>. Giresun Üniversitesi Bilgisayar Mühendisliği Bölümü'nden bölüm ikincisi olarak mezun oldum ve şu anda Bursa Teknik Üniversitesi'nde Bilgisayar Mühendisliği yüksek lisans eğitimime devam ediyorum.</p>
            
            <p>Bilgisayar bilimine ve teknolojiye olan tutkum, sektördeki en son gelişmeleri takip etmeme ve bu alanda kariyer yapmama motivasyon sağlıyor. Staj ve proje deneyimlerim, yazılım programlama konusunda uzmanlaşmama olanak tanıdı. Gelecekte bu becerileri geliştirmek ve bu alanda daha fazla deneyim kazanmak için çalışmak istiyorum.</p>
            
            <p>Kodlama ve yazılım geliştirmeyle ilgileniyorum ve bu alanda deneyim kazanmak için kişisel projeler geliştiriyorum. Python, Java ve C# gibi programlama dillerinde yetkinim ve bu dillerde geliştirdiğim projeleri GitHub'da paylaşıyorum. Ayrıca yapay zeka ve makine öğrenimine de derin bir ilgim var ve bu teknolojilerde kendimi geliştirmek istiyorum.</p>
            
            <p>Deneyimim, projelerim ve yeteneklerim hakkında daha fazla bilgi edinmek isterseniz, lütfen benimle mail üzerinden iletişime geçmekten çekinmeyin. Ayrıca iş fırsatlarına da açığım. Gelişen teknolojilerin bir parçası olmak için sabırsızlanıyorum. Teşekkürler!</p>
            
            <p>🌱 Şu anda <strong>Makine Öğrenimi</strong> üzerine çalışıyorum</p>
            
            <p>📫 Bana ulaşmak için <strong>ferhatakalann@outlook.com</strong></p>`,

        // Projeler Bölümü
        projectsTitle: "Github Projelerim",
        noDescription: "Açıklama bulunmuyor.",

        // Teknolojiler Bölümü
        technologiesTitle: "Diller, Framework'ler ve Araçlar",

        // Başarılar Bölümü
        achievementsTitle: "Başarılar",
        teknofestTitle: "TEKNOFEST 2024 Birincisi",
        teknofestDesc: "Üniversite Öğrencileri Araştırma Projeleri \"Akıllı Şehirler ve Ulaşım\" Kategorisi 🥇",
        teknofestSubDesc: "Türkiye'nin En Büyük Teknoloji Yarışması",
        certificateTitle: "Başarı Sertifikası",

        // Deneyim Bölümü
        experienceTitle: "Profesyonel Deneyim",
        experienceDesc: "Deneyimlerim ve daha fazla bilgi için LinkedIn profilimi ziyaret edebilirsiniz.",
        viewProfile: "LinkedIn Profilini Görüntüle",

        // Education Section
        educationTitle: "Eğitim",
        bachelorsDegree: "Bilgisayar Mühendisliği Lisans",
        erasmusDegree: "Bilgisayar Bilimleri Lisans",
        mastersDegree: "Bilgisayar Mühendisliği Tezli Yüksek Lisans",
        erasmusDesc: "Erasmus+ Öğrenci Değişimi",
        graduatedRank: "Bölüm İkincisi Olarak Mezun Oldu",

        // Footer
        copyright: "© 2024",
        allRights: "tarafından kodlandı. Tüm hakları saklıdır.",

        // Eğitim kartları için detaylı çeviriler
        giresunUniversity: "Giresun Üniversitesi",
        kazimierzUniversity: "Kazimierz Wielki Üniversitesi",
        bursaTechnicalUniversity: "Bursa Teknik Üniversitesi",
        duration1: "Ekim 2020 - Temmuz 2024",
        duration2: "Ekim 2023 - Şubat 2024",
        duration3: "Eylül 2024"
    }
};

let currentLang = 'en';

document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('languageToggle');
    
    // About içeriğini başlangıç için ekle
    const aboutSection = document.querySelector('#about .col-md-8');
    aboutSection.innerHTML = translations.en.aboutContent;
    
    languageToggle.addEventListener('click', function() {
        currentLang = currentLang === 'en' ? 'tr' : 'en';
        updateContent();
        
        // Dil tercihini localStorage'a kaydet
        localStorage.setItem('preferredLanguage', currentLang);
    });
    
    // Sayfa yüklendiğinde kaydedilmiş dil tercihini kontrol et
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        currentLang = savedLang;
    }
    
    // İçeriği güncellemeden önce sayfanın tamamen yüklenmesini bekle
    setTimeout(() => {
        updateContent();
    }, 100);
});

function updateContent() {
    // Başlıkları güncelle
    document.querySelector('#about h2').textContent = translations[currentLang].about;
    document.querySelector('#projects h2').textContent = translations[currentLang].projectsTitle;
    document.querySelector('#technologies h2').textContent = translations[currentLang].technologiesTitle;
    document.querySelector('#achievements h2').textContent = translations[currentLang].achievementsTitle;
    document.querySelector('#experience h2').textContent = translations[currentLang].experienceTitle;
    document.querySelector('#education h2').textContent = translations[currentLang].educationTitle;
    
    // Developer title güncelle
    document.querySelector('.developer-title span').textContent = translations[currentLang].developerTitle;
    
    // Navigation linklerini güncelle
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const section = href.substring(1);
            if (translations[currentLang][section]) {
                link.textContent = translations[currentLang][section];
            }
        }
    });

    // About içeriğini güncelle
    document.querySelector('#about .col-md-8').innerHTML = translations[currentLang].aboutContent;
    
    // Achievements içeriğini güncelle
    const achievementCards = document.querySelectorAll('.achievement-card');
    if (achievementCards.length > 0) {
        // Teknofest kartı
        const teknofestCard = achievementCards[0];
        teknofestCard.querySelector('h3').textContent = translations[currentLang].teknofestTitle;
        const teknofestParagraphs = teknofestCard.querySelectorAll('p');
        teknofestParagraphs[0].textContent = translations[currentLang].teknofestDesc;
        teknofestParagraphs[1].textContent = translations[currentLang].teknofestSubDesc;
        
        // Sertifika kartı
        if (achievementCards.length > 1) {
            const certificateCard = document.querySelectorAll('.certificate-card')[0];
            if (certificateCard) {
                certificateCard.querySelector('h3').textContent = translations[currentLang].certificateTitle;
            }
        }
    }

    // Experience içeriğini güncelle
    const experienceSection = document.querySelector('.linkedin-card');
    if (experienceSection) {
        experienceSection.querySelector('h3').textContent = translations[currentLang].experienceTitle;
        experienceSection.querySelector('.experience-text').textContent = translations[currentLang].experienceDesc;
        experienceSection.querySelector('.view-profile-btn').textContent = translations[currentLang].viewProfile;
    }

    // Education içeriğini güncelle
    document.querySelectorAll('.degree-title').forEach((element, index) => {
        if (index === 0) element.textContent = translations[currentLang].bachelorsDegree;
        if (index === 1) element.textContent = translations[currentLang].erasmusDegree;
        if (index === 2) element.textContent = translations[currentLang].mastersDegree;
    });

    // Footer güncelle
    const footerText = document.querySelector('footer p');
    footerText.innerHTML = `${translations[currentLang].copyright} <a href="https://www.linkedin.com/in/ferhatakalan" target="_blank" class="text-white text-decoration-none">Ferhat Akalan</a>${currentLang === 'en' ? '.' : ''} ${translations[currentLang].allRights}`;

    // Dil butonunu güncelle
    const langElements = document.querySelectorAll(`.lang-${currentLang}`);
    langElements.forEach(el => el.style.display = 'inline');
    const otherLang = currentLang === 'en' ? 'tr' : 'en';
    const otherLangElements = document.querySelectorAll(`.lang-${otherLang}`);
    otherLangElements.forEach(el => el.style.display = 'none');

    // Education kartlarını güncelle
    const educationCards = document.querySelectorAll('.education-item');
    
    // İlk kart - Giresun Üniversitesi
    if (educationCards[0]) {
        educationCards[0].querySelector('.degree-title').textContent = translations[currentLang].bachelorsDegree;
        educationCards[0].querySelector('.institution').textContent = translations[currentLang].giresunUniversity;
        educationCards[0].querySelector('.ranked').textContent = translations[currentLang].graduatedRank;
        educationCards[0].querySelector('.duration').textContent = translations[currentLang].duration1;
    }

    // İkinci kart - Kazimierz Wielki Üniversitesi
    if (educationCards[1]) {
        educationCards[1].querySelector('.degree-title').textContent = translations[currentLang].erasmusDegree;
        const institutions = educationCards[1].querySelectorAll('.institution');
        institutions[0].textContent = translations[currentLang].erasmusDesc;
        institutions[1].textContent = translations[currentLang].kazimierzUniversity;
        educationCards[1].querySelector('.duration').textContent = translations[currentLang].duration2;
    }

    // Üçüncü kart - Bursa Teknik Üniversitesi
    if (educationCards[2]) {
        educationCards[2].querySelector('.degree-title').textContent = translations[currentLang].mastersDegree;
        educationCards[2].querySelector('.institution').textContent = translations[currentLang].bursaTechnicalUniversity;
        educationCards[2].querySelector('.duration').textContent = translations[currentLang].duration3;
    }
}