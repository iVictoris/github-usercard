/* Step 1: using axios, send a GET request to the following URL 
          (replacing the palceholder with your Github name):
          https://api.github.com/users/<your name>
*/
axios
  .get("https://api.github.com/users/iVictoris")
  .then(console.log)
  .catch(console.log);

/**
 *  data = {
 *  avatar_url
 *  name
 *  followers_url
 *  login
 *  location
 *  html_url
 *  followers
 *  following
 *  bio
 * }
 */

/*  Step 2: Inspect and study the data coming back, this is YOUR 
    github info! You will need to understand the structure of this 
    data in order to use it to build your component function 

    Skip to Step 3.
*/

/*  Step 4: Pass the data received from Github into your function, 
          create a new component and add it to the DOM as a child of .cards
*/

/*  Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

const getData = async username => {
  try {
    const data = await axios.get(`https://api.github.com/users/${username}`);
    return data;
  } catch (e) {
    console.log(`Error getting ${username} please try again. Error: ${e}`);
  }
};

const createElements = elements => {
  const createElement = type => {
    return document.createElement(type);
  };
  const htmlElements = elements.map(elementProperties => {
    const { element, ...attributes } = elementProperties;

    let htmlElement = createElement(element);

    Object.entries(attributes).reduce((cleanElement, [attr, value]) => {
      let attrName = attr === "className" ? "classList" : attr;
      cleanElement[attrName] = value;
      return cleanElement;
    }, htmlElement);

    return htmlElement;
  });

  return htmlElements;
};

const createCard = async username => {
  try {
    const {
      data: {
        avatar_url,
        name,
        login,
        location: loc,
        html_url,
        followers,
        following,
        bio
      }
    } = await getData(username);

    const elements = [
      { element: "div", className: "card" },
      { element: "img", className: "", src: avatar_url },
      { element: "div", className: "card-info" },
      { element: "h3", className: "name", textContent: name },
      { element: "p", className: "username", textContent: login },
      { element: "p", className: "profile" },
      { element: "p", textContent: loc },
      { element: "a", href: html_url, textContent: html_url },
      { element: "p", textContent: `Followers: ${followers}` },
      { element: "p", textContent: `Following: ${following}` },
      { element: "p", textContent: bio }
    ];

    const [
      cardDiv,
      avatarImg,
      cardInfo,
      cardName,
      user,
      profile,
      locationParagraph,
      githubLink,
      followerInfo,
      followingInfo,
      bioInfo
    ] = createElements(elements);

    cardDiv.appendChild(avatarImg);
    cardDiv.appendChild(cardInfo);
    cardInfo.appendChild(cardName);
    cardInfo.appendChild(user);
    cardInfo.appendChild(locationParagraph);
    cardInfo.appendChild(profile);
    const profileText = document.createTextNode("Profile: ");
    profile.appendChild(githubLink);
    githubLink.parentNode.insertBefore(profileText, githubLink);
    cardInfo.appendChild(followerInfo);
    cardInfo.appendChild(followingInfo);
    cardInfo.appendChild(bioInfo);

    return cardDiv;
  } catch (e) {
    console.log(e);
    console.log(`Something went wrong getting data`);
  }
};
const main = async () => {
  const users = ["tetondan", "dustinmyers", "justsml", "luishrd", "bigknell"];
  const cards = document.querySelector('.cards');

  try {
    users.forEach(async (user) => {
      const element = await createCard(user);
      cards.appendChild(element);
    })
  } catch {
    console.log("Something went wrong while creating card");
  }
};

main();
