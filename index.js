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

// Navbar toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarNav = document.querySelector('#navbarNav');
    
    navbarToggler.addEventListener('click', function(e) {
        e.stopPropagation(); // Event bubbling'i durdur
        navbarNav.classList.toggle('show');
    });

    // Menü dışına tıklandığında menüyü kapat
    document.addEventListener('click', function(event) {
        const isClickInside = navbarNav.contains(event.target) || navbarToggler.contains(event.target);
        if (!isClickInside && navbarNav.classList.contains('show')) {
            navbarNav.classList.remove('show');
        }
    });

    // Link tıklamalarında menüyü kapat
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) { // Sadece mobil görünümde
                navbarNav.classList.remove('show');
            }
        });
    });

    // Scroll event listener ekle
    window.addEventListener('scroll', function() {
        if (window.innerWidth <= 992 && navbarNav.classList.contains('show')) {
            navbarNav.classList.remove('show');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Sağ tık menüsünü devre dışı bırak
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });

    // Klavye kısayollarını devre dışı bırak
    document.addEventListener('keydown', function(e) {
        // F12 tuşunu engelle
        if (e.key === 'F12') {
            e.preventDefault();
            window.location.href = 'about:blank';
            return false;
        }
        
        // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C kombinasyonlarını engelle
        if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
            e.preventDefault();
            window.location.href = 'about:blank';
            return false;
        }

        // Ctrl+U kombinasyonunu engelle
        if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
            e.preventDefault();
            window.location.href = 'about:blank';
            return false;
        }
    });

    // Geliştirici araçları açıldığında tespit et ve yönlendir
    function detectDevTools() {
        const threshold = 160;
        const widthThreshold = Math.abs(window.outerWidth - window.innerWidth) > threshold;
        const heightThreshold = Math.abs(window.outerHeight - window.innerHeight) > threshold;
        
        // Mobil cihazlar için ek kontrol
        const mobileThreshold = 50;
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const mobileWidthThreshold = isMobile && Math.abs(window.outerWidth - window.innerWidth) > mobileThreshold;
        const mobileHeightThreshold = isMobile && Math.abs(window.outerHeight - window.innerHeight) > mobileThreshold;

        if (widthThreshold || heightThreshold || mobileWidthThreshold || mobileHeightThreshold) {
            window.location.href = 'about:blank';
        }
    }

    // Geliştirici araçları kontrolü
    setInterval(detectDevTools, 1000);

    // Seçim ve sürüklemeyi devre dışı bırak
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
    });

    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
    });
});