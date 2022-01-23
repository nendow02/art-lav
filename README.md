# art lav

Share your (queer) art to your local LGBTQ+ community :3

## The Problem

Despite growing media representations of the LGBTQ+ community, the vast majority of queer represntation stems from urbanized populations. Those living in rural areas or countries with a smaller LGBTQ+ presence may have a hard time finding a queer community in their local sphere and feel comparatively isolated as a result. We need a safe platform for people to connect with other queer people in their area no matter where in the world they live in.

## Our Solution

With full anonymity, *art lav* provides artists a platform to connect with other artists within a 20 mile radius. Any form of artisitc self expression, including queer art and art made by queer artists, is highly encouraged! *art lav* will help you find and connect with your local LGBTQ+ community through art.

## How it works

*art lav* is a React web app that allows users to select their location and then view and post artwork anonymously to a 20 mile radius. The posts, locations, and individual user data is stored in Firebase authentication and storage.

Here is a detailed list of features:

- user signup, login, signout, and forgot password functionality
- allow user to select and change their location coordinates through an interactive map
- filter user feed to show posts from a 20 mile radius
- allow user to post their own art
- allow user to access the art they posted in their profile page
- allow user to like posts in their feed
- order local posts based on number of total likes (top liked posts appear on the top of the feed)

### Design + Final Result

![image](https://user-images.githubusercontent.com/50722281/150670055-fda6e5f9-9068-497e-a715-b4255e3d09c1.png)

#### Main Feed
![image](https://user-images.githubusercontent.com/50722281/150670272-ca39f233-862c-402e-87e6-971708b56cde.png)

#### Login/Signup
![image](https://user-images.githubusercontent.com/50722281/150670293-34a461e5-fb40-4234-b9a7-1529c0052ad9.png)

#### Location Selection
![image](https://user-images.githubusercontent.com/50722281/150670317-b57d4172-c460-405a-8a14-644586b86a38.png)

#### Your Posts/Profile
![image](https://user-images.githubusercontent.com/50722281/150670379-64726bd4-fd52-4d52-bc11-371663f1a85f.png)

## Challenges

- having little prior experience in backend, specifically Firebase caused some delays in implementing features such as photo uploads
- there were some issues in determining the math needed to decide which photos were the user radius
- implementing the useContext hook for the first time
- css bugs, such as when applying a filter causes child elements to change position from absolute to relative

## Future Opportunities

Given more time, we would expand this project to contain more features such as:
- a report button, to moderate content and provide a safe online space
- allowing the user to alter their location radius (as opposed to the default 20 miles)
- providing users an option to link their socials to their art
- enhanced security
