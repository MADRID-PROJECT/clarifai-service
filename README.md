# Clarifai-service

This is an node-express-clarifai based service that provides reads and image and provides back with the concepts that is present in the image.

This app runs in a http server on port 6001.

Steps to run the application:

- Clone the repo
- npm install
- npm run start

You can POST an image to this service that has a Indian Dish. Supports only limited concepts. The body of the post request is as follows:

{"data":"\<Your URL to Image goes here\>"}

# Enhancements:

- Accepts only a URL to image currently. To enhance service to accept base64/svg formats as well so that users can upload an image which the front end service can convert to base64/svg format
