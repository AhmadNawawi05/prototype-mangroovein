<template>
    <div class="navbar scroll-smooth fixed w-screen top-0" id="navbar">
      <div class="navbar-start">
        
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost btn-circle text-[#FAF1E4]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </label>
          <ul tabindex="0" class="bg-[#435334] uppercase text-semibold menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow text-[#FAF1E4] rounded-box w-52">
            <li>
              <router-link :to="{ name: 'home' }">Home</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'map' }">Maps</router-link>
            </li>

            <li v-if="showAdminBoard" class="nav-item">
          <router-link :to="{name: 'admin' }" class="nav-link">Admin Board</router-link>
        </li>
        <li v-if="showModeratorBoard" class="nav-item">
          <router-link :to="{name: 'moderator'}" class="nav-link">Moderator Board</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" :to="{ name: 'user' }" class="nav-link">User</router-link>
        </li>

          </ul>
        </div>
      </div>
  
      <div class="navbar-center relative w-max text-[#FAF1E4]">
        <a class="logo cursor-pointer normal-case text-xl" id="logo">MangrooveIn</a>
      </div>

  
      <div class="navbar-end text-[#FAF1E4]">
        <form action="" class="relative w-max">
          <input
            id="searchInput"
            type="text"
            autocomplete="off"
            v-model="input"
            @focus="toggleSearchContent(true)"
            @blur="toggleSearchContent(false)"
            placeholder="Search For Area"
            class="peer cursor-pointer ease-in-out duration-300 relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-64 focus:cursor-text focus:border-[#FAF1E4] focus:pl-16 focus:pr-4"
          />

  
          <div v-if="showSearchContent">
            <div
              class="area location"
              v-for="area in filteredList"
              :key="area"
            >
              <p>{{ area }}</p>
            </div>
            <div class="area error" v-if="input && filteredList.length === 0">
              <p>Area not found</p>
            </div>
          </div>
  
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-[#FAF1E4] px-3.5 peer-focus:border-[#FAF1E4] peer-focus:stroke-[#FAF1E4]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </form>
  
        <div v-if="!currentUser" class="navbar-nav ml-auto">
        
          
          <router-link to="/register" class="nav-link">
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Register
            </button>
          </router-link>

          <router-link to="/login" class="nav-link">
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Login
            </button>
          </router-link>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">

          <router-link to="/profile" class="nav-link">
          <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            {{ currentUser.username }}
          </button>
          </router-link>

          <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </button>

      </div>

      
      </div>
    </div>
  </template>
  
  <script>
 export default {
  data() {
    return {
      showSearchContent: false,
      input: "",
      areas: [
        "Sundarbans, India",
        "Everglades, Amerika Serika",
        "Great Barrier Reef, Australia",
        "Bali, Indonesia",
        "Mangroves of Kenya"
      ],
    };
  },
  methods: {
    scrollValue() {
      var navbar = document.getElementById('navbar');
      var scroll = window.scrollY;
      if (scroll < 50) {
          navbar.classList.remove('BgColour');
      } else {
          navbar.classList.add('BgColour');
      }
    },
    toggleLogo(show) {
      var logo = document.getElementById('logo');
      var isMobile = window.innerWidth <= 768;
      if (isMobile) {
          logo.classList.toggle('hidden', !show);
      } else {
          logo.classList.toggle('hidden', false);
      }
    },
    toggleSearchContent(show) {
      this.showSearchContent = show;
    },

    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
  },
  mounted() {
    document.addEventListener('DOMContentLoaded', () => {
      // Add a click event listener to the search input
      var searchInput = document.getElementById('searchInput');
      searchInput.addEventListener('click', () => {
          this.toggleLogo(false); // Show the logo when search input is clicked
      });

      // Add a blur event listener to the search input
      searchInput.addEventListener('blur', () => {
          this.toggleLogo(true); // Hide the logo when search input loses focus
      });

      window.addEventListener('scroll', this.scrollValue);
      window.addEventListener('resize', () => {
        this.toggleLogo(true); // Hide the logo on resize
      });
    });
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_MODERATOR');
      }

      return false;
    },


    filteredList() {
      return this.areas.filter((area) =>
        area.toLowerCase().includes(this.input.toLowerCase())
      );
    },
  },
};

  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Merienda:wght@600&display=swap');
  
  .logo {
      font-family: 'Merienda', cursive;
  }
  
  .navbar {
      color: #FAF1E4;
      background-color: transparent;
      z-index: 1000;
  }
  
  .BgColour {
      color: #435334;
      transition: all 1s;
      background-color: #435334;
      border-bottom: 1px solid #435334;
  }
  
  .hidden {
      display: none;
  }
  
  @media (max-width: 768px) {
      .logo.hidden {
          display: none;
      }
  }

  /* Search bar */
  
  </style>
  