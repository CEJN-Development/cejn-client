<script lang="ts">
  import { aud, ip, os, browser } from "$lib/stores/UserAgentStore";
  import * as ApiService from "$lib/services/ApiService";
  import { user } from "$lib/stores/UserStore";
  import { goto } from "$app/navigation"

  let email:string,
      password:string,
      submitting:boolean = false,
      errors = [];

  const attemptLogin = async () => {
    submitting = true;

    try {
      const jsResponse = await fetch('https://jsonip.com/');
      const jsip = await jsResponse.json();
      ip.set(jsip.ip);
    } catch (error) {
      console.error(error);
    };

    const { response, json } = await ApiService.post(
      String(import.meta.env.VITE_API_URL),
      "/login", 
      {
        user: { email, password },
        browser: $browser,
        ip: $ip,
        os: $os,
        creds: true
      },
      { aud: $aud }
    );

    if (response.status === 200) {
      user.set(json);
      goto("/");
    } else if (response.status === 401) {
      json.error ?
        errors = [...errors, json.error] :
        errors = [...errors, "Error."];
    } else if (response.status === 500) {
      errors = ["Oops, something went wrong! How embarrassing, try again soon."];
    }

    submitting = false;
  }
</script>

<form class="flex-row">
  <label for="email">Email</label>
  <input
    type="email"
    name="email"
    bind:value={email}
  />
  <label for="password">Password</label>
  <input
    type="password"
    name="password"
    bind:value={password}
  />
  <button
    on:click|preventDefault={attemptLogin}
    disabled={submitting}
  >
    Login
  </button>
</form>

<style>
  label,
  input {
    width: 100%;
    margin: 0;
    padding: 0;
    border: 0;
  }
  input {
    box-shadow: inset 1px 1px 2px -1px black;
  }
  form {
    max-width: 500px;
    grid-gap: 5px;
  }
</style>