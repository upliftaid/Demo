const BACKEND_URL = "https://strapi-backend-qanu.onrender.com/api"; // Update with your Strapi backend URL

const fetchPost = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  try {
    // Increase view count for the post (if needed)
    await fetch(`${BACKEND_URL}/posts/${postId}/view`, {
      method: "POST",
    });

    // Fetch the blog post from Strapi
    const response = await fetch(`${BACKEND_URL}/posts/${postId}?populate=author`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching post: ${response.statusText}`);
    }

    const data = await response.json();
    const post = data.data.attributes; // Strapi stores content under "attributes"
    displayPost(post);

    // Fetch top 5 most viewed posts for the sidebar
    fetchMostViewedPosts();
  } catch (error) {
    console.error(error);
  }
};

const displayPost = (post) => {
  const blockContainer = document.getElementById("blockContainer");
  const postContainer = document.getElementById("blog");
  const imageUrl = post.images?.url || "images/default.jpg"; // Use a default image if missing

  postContainer.innerHTML = `
    <div class="container">
      <div class="row">
        <div class="col-md-8">
        <h2 class="mb-3 mt-5">${post.title}</h2>
        <p class="mb-4">
        <img src="${imageUrl}" alt="${post.title}" class="img-fluid" />
        </p>
       <span class="date mb-4 d-block text-muted">${new Date(post.publishedAt).toLocaleDateString()}</span>
          <p>${post.content}</p>
          <div class="author-info mt-5">
            <h4>About the Author</h4>
            <h5><strong>${post.author?.name || "Unknown"}</strong></h5>
            <p><i>"${post.author?.about || "No bio available"}"</i></p>
          </div>
        </div>
        <div class="col-md-4 sidebar side-block">
          <h3>Trending Posts</h3>
          <div class="sidebar-box" id="most-viewed-posts"></div>
        </div>
      </div>
    </div>
  `;

  blockContainer.innerHTML = `
     <div class="block-30 block-30-sm item" style="background-image: url(${imageUrl})" data-stellar-background-ratio="0.5">
        <div class="container">
          <div class="row align-items-center justify-content-center text-center">
            <div class="col-md-12">
              <span class="text-white text-uppercase">${post.publishedAt}</span>
              <h2 class="heading mb-5">${post.title}</h2>
            </div>
          </div>
        </div>
      </div>
    `;
};

const fetchMostViewedPosts = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/posts?sort=views:desc&pagination[limit]=5`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch most viewed posts: ${response.statusText}`);
    }

    const data = await response.json();
    displayMostViewedPosts(data.data);
  } catch (error) {
    console.error(error.message);
  }
};

const displayMostViewedPosts = (posts) => {
  const mostViewedContainer = document.getElementById("most-viewed-posts");
  mostViewedContainer.innerHTML = "";

  posts.forEach((post) => {
    const attributes = post.attributes;
    const imageUrl = attributes.images?.url || "images/default.jpg";
    const postElement = document.createElement("div");
    postElement.className = "most-viewed-post";
    postElement.innerHTML = `
      <div class="post-entry">
        <a href="blog-single.html?id=${post.id}" class="mb-3 img-wrap">
          <img src="${imageUrl}" alt="blog_image" class="img-fluid" />
        </a>
        <h4 class='mb-5'><a href="blog-single.html?id=${post.id}">${attributes.title}</a></h4>
      </div>
    `;

    mostViewedContainer.appendChild(postElement);
  });
};

fetchPost();
