document.addEventListener("DOMContentLoaded", function () {
    fetch("https://api.github.com/users/FerhatAkalan/repos")
        .then(response => response.json())
        .then(data => {
            const portfolioGrid = document.querySelector(".portfolio-grid");
            data.forEach(repo => {
                const portfolioItem = document.createElement("div");
                portfolioItem.classList.add("portfolio-item", "col-md-3");
                portfolioItem.style.cursor = "pointer"; // Cursor'ı işaretçi yap

                const img = document.createElement("img");
                img.src = `./images/19198663.jpg`;
                img.alt = repo.name;
                
                const h3 = document.createElement("h3");
                h3.textContent = repo.name;

                const p = document.createElement("p");
                p.textContent = repo.description || "No description provided.";

                // Her portfolioItem'a bir tıklama olayı ekle
                portfolioItem.addEventListener("click", function() {
                    window.open(repo.html_url, "_blank"); // Projeye tıklandığında GitHub proje sayfasını yeni sekmede aç
                });

                portfolioItem.appendChild(img);
                portfolioItem.appendChild(h3);
                portfolioItem.appendChild(p);

                portfolioGrid.appendChild(portfolioItem);
            });
        })
        .catch(error => console.error("Error fetching GitHub repos:", error));
});
