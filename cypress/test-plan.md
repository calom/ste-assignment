# Test Plan

## Navbar and footer
- Elements are shown on each page and referencing endpoints they redirect to based on authentication of user:
  - Signed in:
    - conduit, Home, Settings, New Post, User page with username placeholder
  - Signed out:
    - conduit, Home, Sign in, Sign Up,
- 'Sign in' and 'Sign up' are not visible after log in
- 'Sign in' and 'Sign up' are not visible after log out
- 'conduit' referencing and redirecting to home page
- Footer displays expected text with highlighted words:
  - 'Real world app' referencing to 'https://github.com/mutoe/vue3-realworld-example-app'
  - 'conduit' referencing and redirecting to home page '#/'
  - 'Thinkster' referencing and redirecting to home page 'https://thinkster.io/'

## Sign in page (#/login)
- 'Sign in' heading is shown on top of the page
- 'Sing in' button is present on the page in 2 states
  - Disabled without username and password
  - Enabled when both entered
- 'Need an account?' is shown referencing and redirecting to sign up page
- Successfully login with valid username and password
- trying with 'click sign in button' and 'enter' key
- Successfully log out when logout button is clicked
- Login button is disabled when no username and password
- PopUp indicator with tutorial when signing in with incomplete email (missing @ and rest of the email)
- "email or password is invalid" is shown when wrong password or username on sign in
- Test characters on Username field
  - max characters
  - special characters entered

## Settings (#/settings) - own spec/suite
- Upon opening 'Settings' page:
  - 'Your Settings' heading is shown on top of the
  - 'URL of profile picture' form is filled with link to user image
  - 'Your name' form is filled in with username
  - 'Short bio about you' form is empty
  - 'Email' form is filled in with user email
  - 'New password' form is empty
  - 'Update Settings' button is visible and disabled
  - ' Or click here to logout. ' button is visible and enabled
- 'Update Settings' interaction:
  - Editing any form field is enabling 'Update Settings' button
  - Reverting all the changes is disabling button back ($Bug, not working for bio)
  - Updating form fields with edit and 'Update Settings' clicked
    - All forms update - redirection to User page
    - Name update:
      - New name is displayed under user image
      - New name is displayed in Header tap
      - New name is displayed under existing comments (precondition: comment created)
    - Image update:
      - New image is visible
    - Bio update
      - New bio is shown under username
    - Email update
      - just redirection to User page,
      - Email is updated when entering settings page again
    - New Password update
      - just redirect
      - should not allow less than 8 chars (like sign up ($bug, allowed)
      - New password is working after signing out and signing in
- ' Or click here to logout.' button interaction:
  - When clicked
    - User is signed out
    - Header is updated
    - Clears session
    - Redirection to Home

## User page - own spec/suite (#/article/$article-title)
- User image is shown based on settings
- Username is visible under user image
- Bio is shown under username
- 'Edit profile settings' button with icon is visible on right side and enabled
- 'My Articles' and 'Favorite articles' are visible
- 'My Articles' displays Articles added by user ordered by date
- 'Favorite articles' displays Articles favored by user ordered by date
- Pagination is displayed works when many Articles are present

## Sign up (#/register)
- 'Sign up' heading is shown on top of the page
- 'Have an account?' link with href to #/login
- Test characters on Username, Password field
  - max characters
  - special characters entered
  - Tutorial is shown for less than 8 chars for password
  - Tutorial is shown for incompleted mail
- Successful sign up when entering username, email and password
  - User is redirected to home page
  - User is signed in
- Unsuccessful sign up with existing user (mail, username)
  - email has already been taken
  - username has already been taken

## Article new
- Forms are shown with guidance on what to enter:
  - Article title
  - Article subtitle
  - Article
  - Tags for article
- 'Publish Article' button is visible on the page disabled
- 'Publish Article' button is visible on the page enabled after all forms are filled in
- Successful save of article after entering
  - redirect to article page

## Article
- When logged in
  - Article heading
    - Article title is shown on top of the page
    - User image with username and date of submission is under the title
    - Favor, Edit and Delete buttons are visible and enabled
  - Article body
    - Article text is visible
    - Tags are present under article's text
    - User image with username and date of submission is under the title is again provided ($Looks like bug)
  - Comments section
    - with Auth
      - 'Post Comment' button is visible and disabled
      - Typing in comment enabled 'Post Comment' button
    - Comment is added upon clicking the button
    - There is delete icon present
    - After clicking Delete, comment is deleted (@Bug not working)
- Not logged in
  - Article heading
    - Article title is shown on top of the page
    - User image with username and date of submission is under the title
    - Follow and Favorite buttons are visible and enabled
  - Article body
    - Article text is visible
    - Tags are present under article's text
    - User image with username and date of submission is under the title is again provided ($Looks like bug)
  - Comments section
    - Adding comments is disabled
- Clicking username is redirecting to User page
- Clicking Favorite button changes text and adds count
- Clicking Delete article deletes article
- Edit article opens edit page

## Home page
- Displays 'conduit' heading with 'A place to share your knowledge.' subtitle
- 'Global feed' is present with Articles added by users
- 'Your feed'
  - Needs logged in user
  - Shows added article by user ( or similar, when I run app locally, it showed only other user Articles, which looks like bug)
- Pagination is displayed works when many comments are present
- 'Popular Tags'
  - There are all tags listed and visible
  - Clicking on tag
    - will underline the tag
    - filter Articles with the such tag
      - opens article on new subpage which is headed '# <tag_name>'
- Clicking article's Title, Subtitle, 'Read more...' or tag on the Article($ looks like bug maybe) text redirects to Article page

