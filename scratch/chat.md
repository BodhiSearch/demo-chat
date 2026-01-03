now we need to: \
  - create a simple chat application \
  - integrate the app with bodhi-js-sdk react
  `@bodhiapp/bodhi-js-react` \
  - the layout is a simple 3 horizontal layer chat application, header with information and controls, center with chat conversations, bottom with chat input and submit
  - on header, left aligned we can say Demo Chat Application powered by
  Bodhi Browser Extension \
  - on header, on right aligned we can show the Client Status (Green=ready,
  Red=!ready), Server Status (Green=ready, Red=!ready), Connection Mode: direct/extension, and Setup
  Button (Cog, opens setup modal) as icon, with hover showing detailed
  text, as well as Login button/User Information + Logout \
  - on header center, we have model dropdown and refresh button to
  fetch models and populate dropdown \
  - submit button is disabled if Client is Not Ready, User is not logged In, we allow if server is not ready, as we can then display error message that we receive from client, showing the input greyed with hint showing the
  reason, and suggestion to click Settings or Login \
  - on enter, we submit with streaming via bodhi-js-sdk and display the
  message received \
  - we also have a + button at start to start a new chat \
  - we have error boundary that shows the error as popup \
   \
  we will do the above phasewise \

  we cannot have e2e test as we required chrome extension+backend server, which setup is out of scope for above task
  we can have basic component testing for critical/crucial logic
 