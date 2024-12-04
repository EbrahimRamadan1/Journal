const searchSelector = document.querySelector("#search");
const newsContainer = document.querySelector(".news");
const date = new Date();
const today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
  2,
  "0"
)}-${String(date.getDate() - 1).padStart(2, "0")}`;

function displayNews(data) {
  let news = "";
  data.forEach((el) => {
    if (el.title != "[Removed]") {
      news += `
        <div class="newSection col-12 col-md-3 col-lg-2" onclick="newClicked('${el.url.replace(
          /'/g,
          "\\'"
        )}')">
          <img src=${
            el.urlToImage ||
            "./assets/images/f469d711-bc75-435b-815a-78b50e5e18af.webp"
          } class="mainImage" width="100%" alt="img" />
          <div class="newContent">
            <h5 class="text-primary">${el.title
              .split(" ")
              .slice(0, 10)
              .join(" ")}</h5>
            <p class="text-black">${
              el.description?.split(" ").slice(0, 15).join(" ") ||
              "No description available"
            }</p>
          </div>
        </div>
      `;
    }
  });

  newsContainer.innerHTML = news;
}

async function searchNews() {
  let search = searchSelector.value.toLowerCase();
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?qInTitle=${
        search ? search : "*"
      }&from=${today}&language=en&sortBy=publishedAt&apiKey=0c082f3cb6b74e818099cad402330f79`
    );
    if (!response.ok) throw new Error("Failed to fetch news.");
    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
    newsContainer.innerHTML = `<p class="text-danger">Unable to fetch news. Please try again later.</p>`;
  }
}

searchSelector.addEventListener("input", searchNews);
searchNews();

function newClicked(url) {
  window.open(url, "_blank");
}
