async function fetchProfile(){
    const username=document.getElementById("searchInput").value;
    const profileDetails=document.getElementById("profileDetails");

    if(!username){
        profileDetails.innerHTML="<p>Please enter a username!</p>";
        return;
    }
    profileDetails.innerHTML="<p>Loading...</p>";

    try{
        const response = await fetch(`https://api.github.com/users/${username}`);

        if(!response.ok){
            throw new Error("User not found");
        }
        const data=await response.json();

        profileDetails.innerHTML=`
        <div class="profile-card">
            <img src="${data.avatar_url}" alt="Profile Picture">
            <h3>${data.name || data.login}</h3>
            <p>${data.bio || "No bio available."}</p>
            <p><strong>Public Repos:</strong> ${data.public_repos}</p>
            <p><strong>Followers:</strong> ${data.followers}</p>
            <a href="${data.html_url}" target="_blank">View Profile on Github</a>
        </div>
        `;
    }catch(error){
        profileDetails.innerHTML=`<p style="color: #ff7b72;">User not found. Try another username.</p>`;
    }
}