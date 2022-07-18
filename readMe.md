<h1>The engine "node" is incompatible with this module</h1>
<div class="s-prose js-post-body" itemprop="text">
  <p>You need to upgrade your version of <strong>node</strong>.</p>
  <p>I ran into this same issue.</p>
  <p>If you used <strong>Homebrew</strong> run:</p>
  <pre
    class="lang-sh s-code-block"
  ><code class="hljs language-bash">brew update  <span class="hljs-comment"># This updates Homebrew to latest version</span>
brew upgrade node
</code></pre>
  <p>If you use <strong>nvm</strong> run:</p>
  <pre
    class="lang-sh s-code-block"
  ><code class="hljs language-bash">nvm current node -v  <span class="hljs-comment"># Checks your current version</span>
nvm install &lt;version&gt;  <span class="hljs-comment"># Example: nvm install 12.14.1</span>
</code></pre>
  <p>
    For the above step go to
    <a href="https://nodejs.org/en/download/" rel="noreferrer"
      >https://nodejs.org/en/download/</a
    >
  </p>
  <p>
    Grab a version which satisfies the conditionals in your error, the latest
    version should work.
  </p>
  <p>
    More Detailed Walkthrough:
    <a href="https://flaviocopes.com/how-to-update-node/" rel="noreferrer"
      >https://flaviocopes.com/how-to-update-node/</a
    >
  </p>
</div>

<h1>Changing a react app's name</h1>

<h2>For Android</h2>
  <p>
    Modify displayName in app.json file 
    Modify app_name in android/app/src/main/res/values/strings.xml 
    then Run these commands one by one 
  </p>
    
    cd android
    ./gradlew clean
    cd ..
    react-native run-android

<h2>For iOS</h2>

Modify Display Name in Project target (General Tab)

Select your application project as Host Application in Project target for testing (General Tab)enter image description here

<img src="https://i.stack.imgur.com/PYp4A.png" alt="enter image description here">
