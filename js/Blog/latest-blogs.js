async function latestBlogs() {
    try {
        const response = await fetch("https://strapi-backend-qanu.onrender.com/posts");
        const data = await response.json();
        const posts = data.data;

        // Sort posts by publish date in descending order
        const sortedPosts = posts.sort(
            (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
        );

        // Get the three most recent posts
        const recentPosts = sortedPosts.slice(0, 3);

        const blogPostsContainer = document.getElementById("blog-posts-container");
        blogPostsContainer.innerHTML = ""; // Clear existing content

        recentPosts.forEach((post) => {
            const imageUrl = post.images || "images/default.jpg"; // Default image fallback
            const postElement = document.createElement("div");
            postElement.classList.add(
                "col-12", "col-sm-6", "col-md-6", "col-lg-4", "mb-4", "mb-lg-0"
            );
            postElement.innerHTML = `
                <div class="post-entry">
                    <a href="blog-single.html?id=${post.documentId}" class="mb-3 img-wrap">
                        <img src="${imageUrl}" alt="Image placeholder" class="img-fluid" />
                    </a>
                    <h3><a href="blog-single.html?id=${post.documentId}">${post.title}</a></h3>
                    <span class="date mb-4 d-block text-muted">${new Date(post.publishDate).toLocaleDateString()}</span>
                    <p>${post.descriptionHtml.substring(0, 98)}...</p>
                    <p><a href="blog-single.html?id=${post.documentId}" class="link-underline">Read More</a></p>
                </div>
            `;
            blogPostsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error("Error fetching blog posts:", error);
    }
}

// Fetch blog posts when the page loads
document.addEventListener("DOMContentLoaded", latestBlogs);
