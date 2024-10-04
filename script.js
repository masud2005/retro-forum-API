

// All Post Data Loaded
const loadAllPosts = async (category) =>{

    // Use If Else Condition
    // if(category){
    //      console.log(`https://openapi.programming-hero.com/api/retro-forum/posts?${category}`)
    // }
    // else{
    //     console.log(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    // }

    // Use Ternary Condition
    // console.log(`https://openapi.programming-hero.com/api/retro-forum/posts${category ? `?category=${category}` : ''}`);
    document.getElementById('post-container').innerHTML = '';
    document.getElementById('searchPosts').value = ''
    const url = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${category ? `?category=${category}` : ''}`)
    const data = await url.json();
    displayAllPosts(data.posts);
    // console.log(category);
}

// Latest Post Data Loaded
const latestPosts = async() => {
    const url = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await url.json();
    displayLatestPosts(data);
}
latestPosts();


// Display all posts
const displayAllPosts = (posts) => {
    // console.log(posts);
    const postContainer = document.getElementById('post-container');
    posts.forEach( post => {
        // console.log(post);
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="md:flex bg-[#F3F3F5] rounded-3xl p-5 md:p-10 items-center gap-7 mb-7">
              <div class="w-full md:w-[300px] relative">
                <img class="w-full h-[220px] md:h-auto rounded-2xl" src="${post.image}" alt="">
                <div class="badge badge-primary badge-lg absolute -top-2 -right-2 ${post.isActive ? 'bg-green-500' : 'bg-red-500'}"></div>
              </div>
              <div class="w-full">
                <div class="text-gray-500">
                  <span class="mr-5"># ${post.category}</span>
                  <span>Author: ${post.author.name}</span>
                </div>
                <div class="border-b-2 border-dashed border-gray-300">
                  <h2 class="text-2xl text-gray-500 font-bold py-3">${post.title}</h2>
                  <p class="text-gray-400 mb-4">${post.description}</p>
                </div>
                <div class="flex justify-between mt-5">
                  <div class="flex gap-7">
                    <div class="flex text-gray-500 items-center gap-2">
                      <i class="fa-regular fa-comment-dots"></i>
                      <p class="text-lg font-bold">${post.comment_count}</p>
                    </div>
                    <div class="flex text-gray-500 items-center gap-2">
                      <i class="fa-regular fa-eye"></i>
                      <p class="text-lg font-bold">${post.view_count}</p>
                    </div>
                    <div class="flex text-gray-500 items-center gap-2">
                      <i class="fa-regular fa-clock"></i>
                      <p class="text-lg font-bold">${post.posted_time}</p>
                    </div>
                  </div>
                  <button onclick="markAsRead('${post.description}', '${post.view_count}')" class="bg-green-400 rounded-full p-2 hover:bg-gray-200 transition duration-300">
                    <img src="https://img.icons8.com/?size=24&id=83326&format=png" alt="">
                  </button>
                </div>
              </div>
            </div>
        `;
        postContainer.append(div);
    })
}

// Display Latest posts
const displayLatestPosts = (latestPosts) => {
    console.log(latestPosts);
    const latestPostContainer = document.getElementById('latest-post-container');
    latestPosts.forEach( latestPost => {
        // console.log(latestPost);
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card lg:h-[550px] xl:h-[600px] 2xl:h-[650px] pb-5 bg-base-100 shadow-2xl">
              <figure class="lg:px-6 px-4 pt-4 lg:pt-8">
                <img
                    src=${latestPost.cover_image}
                    alt="Shoes"
                    class="rounded-xl"
                />
              </figure>
              <div class="p-5 lg:p-10 space-y-4 lg:space-y-5">
                <p class="opacity-50 text-start">
                    <i class="fa-solid fa-calendar-days me-2"></i>${latestPost.author.posted_date ? `${latestPost.author.posted_date}` : 'No Published Date'}
                </p>
                <h2 class="card-title text-start">${latestPost.title}</h2>
                <p class="text-start">
                    ${latestPost.description}
                </p>
                <div class="card-actions flex gap-5 items-center">
                    <div class="avatar">
                        <div
                            class="lg:w-12 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                        >
                            <img
                            src=${latestPost.profile_image}
                            />
                        </div>
                    </div>
                <div>
                <h3 class="text-start font-extrabold">${latestPost.author.name}</h3>
                <p class="text-start opacity-60">${latestPost.author.designation ? `${latestPost.author.designation}` : 'Unknown'}</p>
              </div>
            </div>
        `;
        latestPostContainer.append(div);
    })
}

// Mark as Read Functionality
const markAsRead = (description, view_count) => {
    // console.log(description, view_count);
    const markAsReadContainer = document.getElementById('markAsReadContainer');
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="flex justify-between bg-white rounded-xl p-3 gap-10">
            <p>${description}</p>
            <p>${view_count}</p>
        </div>       
    `;
    markAsReadContainer.append(div);

    handleCount();
}

// Counter Update
const handleCount = () => {
    const prevCount = document.getElementById('markAsReadCounter').innerText;
    const convertedCounter = parseInt(prevCount);
    const sum = convertedCounter + 1;
    document.getElementById('markAsReadCounter').innerText = sum;
}
 
loadAllPosts();


const handleSearchByCategory = () => {
    const searchText = document.getElementById('searchPosts').value;
    loadAllPosts(searchText);
}