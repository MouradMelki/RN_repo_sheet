<h1>Changing a react app's name</h1>

<h2>For Android<h2>

Modify displayName in app.json file

Modify app_name in android/app/src/main/res/values/strings.xml

then Run these commands one by one

cd android

./gradlew clean

cd ..

react-native run-android

<h2>For iOS<h2>

Modify Display Name in Project target (General Tab)

Select your application project as Host Application in Project target for testing (General Tab)enter image description here

<img src="https://i.stack.imgur.com/PYp4A.png" alt="enter image description here">
